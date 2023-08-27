// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use active_win_pos_rs::get_active_window;
use global_hotkey::{
    hotkey::{Code, HotKey},
    GlobalHotKeyEvent, GlobalHotKeyManager,
};
use tauri::Manager;
use winit::event_loop::EventLoop;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let main_window = app.get_window("main").unwrap();
            // std::thread::spawn(move || {
            //     for i in 0..100 {
            //         std::thread::sleep(std::time::Duration::from_millis(1000));
            //         main_window.emit("init", i.to_string()).unwrap();
            //         println!("init1, {}", i);
            //     }
            // });
            init_hotkey(main_window);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// 初始化全局热键
fn init_hotkey(main_window: tauri::Window) {
    let event_loop = EventLoop::new();
    let hotkey_manager = GlobalHotKeyManager::new().unwrap();
    let hotkey = HotKey::new(None, Code::F2);
    hotkey_manager.register(hotkey).unwrap();

    let global_hotkey_channel = GlobalHotKeyEvent::receiver();
    let mut flag = true;

    event_loop.run(move |_event, _, control_flow| {
        control_flow.set_poll();

        if let Ok(event) = global_hotkey_channel.try_recv() {
            if event.id == hotkey.id() {
                if flag {
                    main_window.hide().unwrap();
                } else {
                    let app_name = get_current_active_window();
                    println!("currentWindow: {app_name}");
                    main_window.show().unwrap();
                    std::thread::sleep(std::time::Duration::from_millis(100));
                    // TODO: 无法与前端通信
                    main_window.emit("currentWindow", app_name).unwrap();
                    std::thread::sleep(std::time::Duration::from_millis(100));
                }
                flag = !flag;
            }
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
