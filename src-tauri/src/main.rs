// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

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
            println!("{event:?}");
            if event.id == hotkey.id() {
                if flag {
                    main_window.hide().unwrap();
                } else {
                    main_window.show().unwrap();
                }
                flag = !flag;
            }
            // TODO: 无法与前端通信
            // main_window.emit("longPress", event.id).unwrap();
        }
    })
}
