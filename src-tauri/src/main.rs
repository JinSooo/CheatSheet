// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use active_win_pos_rs::get_active_window;
use global_hotkey::{
    hotkey::{Code, HotKey},
    GlobalHotKeyEvent, GlobalHotKeyManager,
};
use tauri::Manager;

fn main() {
    tauri::Builder::default()
        // 失去焦点自动隐藏
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::Focused(focused) => {
                if !focused {
                    event.window().hide().unwrap();
                }
            }
            _ => {}
        })
        .setup(|app| {
            let main_window = app.get_window("main").unwrap();
            init_hotkey(main_window);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// 初始化全局热键
fn init_hotkey(window: tauri::Window) {
    // 热键
    let hotkey_manager = GlobalHotKeyManager::new().unwrap();
    let hotkey = HotKey::new(None, Code::F2);
    hotkey_manager.register(hotkey).unwrap();

    GlobalHotKeyEvent::set_event_handler(Some(move |e: GlobalHotKeyEvent| {
        if e.id == hotkey.id() {
            if window.is_visible().unwrap() {
                window.hide().unwrap();
            } else {
                let active_app_name = get_current_active_window();
                window.emit("active-window", active_app_name).unwrap();
                // 等100ms再显示，留时间给页面进行渲染
                std::thread::sleep(std::time::Duration::from_millis(100));
                window.show().unwrap();
            }
        }
    }))
}

// 获取当前聚焦程序
fn get_current_active_window() -> String {
    match get_active_window() {
        Ok(active_window) => active_window.app_name,
        Err(()) => "Default".to_string(),
    }
}
