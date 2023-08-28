// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use active_win_pos_rs::get_active_window;
use global_hotkey::{
    hotkey::{Code, HotKey},
    GlobalHotKeyEvent, GlobalHotKeyManager,
};
use tao::event_loop::{ControlFlow, EventLoop};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![init_listen])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn init_listen(_: tauri::AppHandle, window: tauri::Window) {
    init_hotkey(window);
}

// 初始化全局热键
fn init_hotkey(window: tauri::Window) {
    // 用于循环监听全局热键
    let event_loop = EventLoop::new();
    // 热键
    let hotkey_manager = GlobalHotKeyManager::new().unwrap();
    let global_hotkey_channel = GlobalHotKeyEvent::receiver();
    let hotkey = HotKey::new(None, Code::F2);
    hotkey_manager.register(hotkey).unwrap();

    // 当前窗口状态
    let mut flag = true;

    event_loop.run(move |_event, _, control_flow| {
        *control_flow = ControlFlow::Poll;

        if let Ok(event) = global_hotkey_channel.try_recv() {
            if event.id == hotkey.id() {
                if flag {
                    window.hide().unwrap();
                } else {
                    let active_app_name = get_current_active_window();
                    window.emit("active-window", active_app_name).unwrap();
                    // 等100ms再显示，留时间给页面进行渲染
                    std::thread::sleep(std::time::Duration::from_millis(100));
                    window.show().unwrap();
                }
                flag = !flag;
            }
            println!("event: {:?}", event);
        }
    })
}

// 获取当前聚焦程序
fn get_current_active_window() -> String {
    match get_active_window() {
        Ok(active_window) => active_window.app_name,
        Err(()) => "Default".to_string(),
    }
}
