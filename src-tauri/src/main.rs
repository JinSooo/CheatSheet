// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use active_win_pos_rs::get_active_window;
use tauri::{GlobalShortcutManager, GlobalWindowEvent, Manager};

static GLOBAL_HOTKEY_SHORTCUT: &str = "F2";

fn main() {
    tauri::Builder::default()
        // .on_window_event(|event| init_tauri_event(event))
        .setup(|app| {
            // app.
            init_hotkey(app.app_handle().clone());
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// 初始化Tauri事件
fn init_tauri_event(e: GlobalWindowEvent) {
    // 失去焦点自动隐藏
    match e.event() {
        tauri::WindowEvent::Focused(focused) => {
            if !focused {
                e.window().hide().unwrap();
            }
        }
        _ => (),
    }
}

// 初始化全局热键
fn init_hotkey(app: tauri::AppHandle) {
    let main_window = app.get_window("main").unwrap();
    app.global_shortcut_manager()
        .register(GLOBAL_HOTKEY_SHORTCUT, move || {
            hotkey_handler(main_window.clone());
        })
        .unwrap();
}

// 全局热键处理
fn hotkey_handler(window: tauri::Window) {
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

// 获取当前聚焦程序
fn get_current_active_window() -> String {
    match get_active_window() {
        Ok(active_window) => active_window.app_name,
        Err(()) => "Default".to_string(),
    }
}
