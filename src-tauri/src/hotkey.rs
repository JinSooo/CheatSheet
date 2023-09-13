use crate::window::get_main_window;
use crate::{
    config::{get, set},
    tray::init_tray_tooltip,
    utils::{get_current_active_window, notification},
    APP,
};
use tauri::{AppHandle, GlobalShortcutManager};

pub fn init_hotkey() {
    register_shortcut("all").unwrap();
}

fn register<F>(app_handle: &AppHandle, name: &str, handler: F, key: &str) -> Result<(), String>
where
    F: Fn() + Send + 'static,
{
    let shortcut = {
        if key.is_empty() {
            match get(name) {
                Some(v) => v.as_str().unwrap().to_string(),
                None => {
                    set(name, "");
                    String::new()
                }
            }
        } else {
            key.to_string()
        }
    };

    if !shortcut.is_empty() {
        app_handle
            .global_shortcut_manager()
            .register(shortcut.as_str(), handler)
            .unwrap();
        println!("Register Hotkey {name}: {shortcut}")
    }
    Ok(())
}

fn unregister(app_handle: &AppHandle, name: &str) {
    let shortcut = match get(name) {
        Some(v) => v.as_str().unwrap().to_string(),
        None => String::new(),
    };
    app_handle
        .global_shortcut_manager()
        .unregister(shortcut.as_str())
        .unwrap();
}

fn register_shortcut(app: &str) -> Result<(), String> {
    let app_handle = APP.get().unwrap();

    match app {
        "cheatsheet" => register(app_handle, "cheatSheetShortCut", on_shortcut, "")?,
        "active_window" => register(app_handle, "activeWindowShortCut", on_active_window, "")?,
        "all" => {
            register(app_handle, "cheatSheetShortCut", on_shortcut, "")?;
            register(app_handle, "activeWindowShortCut", on_active_window, "")?;
        }
        _ => {}
    }

    Ok(())
}

#[tauri::command]
pub fn register_shortcut_by_frontend(app: &str, shortcut: &str) -> Result<(), String> {
    println!("register_hotkey_with_shortcut: app -> {app}, shortcut: {shortcut}");
    let app_handle = APP.get().unwrap();

    match app {
        "cheatsheet" => {
            unregister(app_handle, "cheatSheetShortCut");
            register(app_handle, "cheatSheetShortCut", on_shortcut, shortcut)?;
            // 重新初始化 tray tooltip
            init_tray_tooltip(shortcut, "");
        }
        "active_window" => {
            unregister(app_handle, "cheatSheetShortCut");
            register(
                app_handle,
                "activeWindowShortCut",
                on_active_window,
                shortcut,
            )?;
            // 重新初始化 tray tooltip
            init_tray_tooltip("", shortcut);
        }
        _ => {}
    }

    Ok(())
}

fn on_shortcut() {
    let window = get_main_window();

    if window.is_visible().unwrap() {
        window.hide().unwrap();
    } else {
        let active_app_name = get_current_active_window();
        window.emit("active-window", active_app_name).unwrap();
        // 显示交给前端去处理，避免闪屏
    }
}

fn on_active_window() {
    notification("当前应用", get_current_active_window().as_str());
}
