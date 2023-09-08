use crate::{
    tray::init_tray_tooltip,
    utils::{get_current_active_window, notification},
    APP,
};
use tauri::{AppHandle, GlobalShortcutManager, Manager};

pub static mut GLOBAL_HOTKEY_SHORTCUT: &str = "F2";
pub static mut GLOBAL_HOTKEY_ACTIVE_WINDOW: &str = "Ctrl+F2";

pub fn init_hotkey() {
    register_hotkey_shortcut();
    register_hotkey_active_window();
}

pub fn register_hotkey_shortcut() {
    let app_handle = APP.get().unwrap();
    unsafe {
        app_handle
            .global_shortcut_manager()
            .register(GLOBAL_HOTKEY_SHORTCUT, move || {
                on_shortcut(&app_handle);
            })
            .unwrap();
    }
}

pub fn register_hotkey_active_window() {
    let app_handle = APP.get().unwrap();
    unsafe {
        app_handle
            .global_shortcut_manager()
            .register(GLOBAL_HOTKEY_ACTIVE_WINDOW, move || {
                on_active_window();
            })
            .unwrap();
    }
}

pub fn unregister_hotkey_shortcut() {
    let app_handle = APP.get().unwrap();
    unsafe {
        app_handle
            .global_shortcut_manager()
            .unregister(GLOBAL_HOTKEY_SHORTCUT)
            .unwrap();
    }
}

pub fn unregister_hotkey_active_window() {
    let app_handle = APP.get().unwrap();
    unsafe {
        app_handle
            .global_shortcut_manager()
            .unregister(GLOBAL_HOTKEY_ACTIVE_WINDOW)
            .unwrap();
    }
}

fn on_shortcut(app: &AppHandle) {
    let window = app.get_window("main").unwrap();

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

fn on_active_window() {
    notification("当前应用", get_current_active_window().as_str());
}

#[tauri::command]
pub fn register_hotkey_with_shortcut(kind: String, shortcut: String) {
    match kind.as_str() {
        "cheatsheet" => unsafe {
            unregister_hotkey_shortcut();
            GLOBAL_HOTKEY_SHORTCUT = Box::leak(shortcut.into_boxed_str());
            register_hotkey_shortcut();
            // 重新初始化 tray tooltip
            init_tray_tooltip();
        },
        "config" => unsafe {
            unregister_hotkey_active_window();
            GLOBAL_HOTKEY_ACTIVE_WINDOW = Box::leak(shortcut.into_boxed_str());
            register_hotkey_active_window();
            // 重新初始化 tray tooltip
            init_tray_tooltip();
        },
        _ => (),
    }
}

#[tauri::command]
pub fn register_hotkey(kind: String) {
    match kind.as_str() {
        "cheatsheet" => {
            register_hotkey_shortcut();
        }
        "active_window" => {
            register_hotkey_active_window();
        }
        _ => (),
    }
}

#[tauri::command]
pub fn unregister_hotkey(kind: String) {
    match kind.as_str() {
        "cheatsheet" => {
            unregister_hotkey_shortcut();
        }
        "active_window" => {
            unregister_hotkey_active_window();
        }
        _ => (),
    }
}
