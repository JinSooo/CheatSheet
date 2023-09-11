use crate::{
    config::get,
    tray::init_tray_tooltip,
    utils::{get_current_active_window, notification},
    APP,
};
use tauri::{AppHandle, GlobalShortcutManager, Manager};

pub fn init_hotkey() {
    let is_forbidden_cheatsheet = match get("forbidCheatSheetShortCut") {
        Some(val) => val.as_bool().unwrap(),
        None => false,
    };

    let is_forbidden_active_window = match get("forbidActiveWindowShortCut") {
        Some(val) => val.as_bool().unwrap(),
        None => false,
    };
    // 如果禁用就不注册了
    if !is_forbidden_cheatsheet {
        register_hotkey_shortcut();
    }
    if !is_forbidden_active_window {
        register_hotkey_active_window();
    }
}

pub fn register_hotkey_shortcut() {
    let cheatsheet_shortcut = match get("cheatSheetShortCut") {
        Some(val) => val.as_str().unwrap().to_string(),
        None => "F2".to_string(),
    };
    let app_handle = APP.get().unwrap();
    app_handle
        .global_shortcut_manager()
        .register(cheatsheet_shortcut.as_str(), move || {
            on_shortcut(&app_handle);
        })
        .unwrap();
}

pub fn register_hotkey_active_window() {
    let active_window_shortcut = match get("activeWindowShortCut") {
        Some(val) => val.as_str().unwrap().to_string(),
        None => "Ctrl+F2".to_string(),
    };
    let app_handle = APP.get().unwrap();
    app_handle
        .global_shortcut_manager()
        .register(active_window_shortcut.as_str(), move || {
            on_active_window();
        })
        .unwrap();
}

pub fn unregister_hotkey_shortcut() {
    let cheatsheet_shortcut = match get("cheatSheetShortCut") {
        Some(val) => val.as_str().unwrap().to_string(),
        None => "F2".to_string(),
    };
    let app_handle = APP.get().unwrap();
    app_handle
        .global_shortcut_manager()
        .unregister(cheatsheet_shortcut.as_str())
        .unwrap();
}

pub fn unregister_hotkey_active_window() {
    let active_window_shortcut = match get("activeWindowShortCut") {
        Some(val) => val.as_str().unwrap().to_string(),
        None => "Ctrl+F2".to_string(),
    };
    let app_handle = APP.get().unwrap();
    app_handle
        .global_shortcut_manager()
        .unregister(active_window_shortcut.as_str())
        .unwrap();
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
    println!("register_hotkey_with_shortcut: kind -> {kind}, shortcut: {shortcut}");
    match kind.as_str() {
        "cheatsheet" => {
            let is_forbidden = match get("forbidCheatSheetShortCut") {
                Some(val) => val.as_bool().unwrap(),
                None => false,
            };
            // 如果没用被禁用，则删除注册快捷键
            // 说明应用快捷键被禁用，则不需要去注册
            if !is_forbidden {
                unregister_hotkey_shortcut();
                register_hotkey_shortcut();
            }
            // 重新初始化 tray tooltip
            init_tray_tooltip();
        }
        "active_window" => {
            let is_forbidden = match get("forbidActiveWindowShortCut") {
                Some(val) => val.as_bool().unwrap(),
                None => false,
            };
            // 如果没用被禁用，则删除注册快捷键
            // 说明应用快捷键被禁用，则不需要去注册
            if !is_forbidden {
                unregister_hotkey_active_window();
                register_hotkey_active_window();
            }
            // 重新初始化 tray tooltip
            init_tray_tooltip();
        }
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
