// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use active_win_pos_rs::get_active_window;
use tauri::{
    AppHandle, CustomMenuItem, GlobalShortcutManager, GlobalWindowEvent, Manager, PhysicalSize,
    Size, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem,
};

static GLOBAL_HOTKEY_SHORTCUT: &str = "F2";
static WINDOW_SIZE_RATIO: f64 = 0.75;

fn main() {
    tauri::Builder::default()
        // .on_window_event(|event| init_tauri_event(event))
        .system_tray(init_tray())
        .on_system_tray_event(|app, event| tray_handler(app.app_handle().clone(), event))
        .setup(|app| {
            adjust_window_size(app.get_window("main").unwrap());
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

fn init_tray() -> SystemTray {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let hide = CustomMenuItem::new("hide".to_string(), "Hide");
    let tray_menu = SystemTrayMenu::new()
        .add_item(quit)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(hide);
    SystemTray::new().with_menu(tray_menu)
}

fn tray_handler(app: AppHandle, event: SystemTrayEvent) {
    match event {
        // 左键点击
        SystemTrayEvent::LeftClick {
            position: _,
            size: _,
            ..
        } => {
            println!("system tray received a left click");
        }
        // 右键点击
        SystemTrayEvent::RightClick {
            position: _,
            size: _,
            ..
        } => {
            println!("system tray received a right click");
        }
        _ => {}
    }
}

// 根据显示屏按比例适配窗口大小
fn adjust_window_size(window: tauri::Window) {
    if let Some(monitor) = window.current_monitor().unwrap() {
        let size = monitor.size();
        let width = size.width as f64 * WINDOW_SIZE_RATIO;
        let height = size.height as f64 * WINDOW_SIZE_RATIO;
        window
            .set_size(Size::Physical(PhysicalSize {
                width: width as u32,
                height: height as u32,
            }))
            .unwrap();
        window.center().unwrap();
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
