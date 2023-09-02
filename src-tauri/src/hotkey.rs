use crate::utils::{get_current_active_window, notification};
use tauri::{AppHandle, GlobalShortcutManager, Manager};

pub static GLOBAL_HOTKEY_SHORTCUT: &str = "F2";
pub static GLOBAL_HOTKEY_ACTIVE_WINDOW: &str = "Ctrl+F2";

pub fn init_hotkey(app: AppHandle) {
    register_hotkey_shortcut(app.app_handle());
    register_hotkey_active_window(app.app_handle());
}

pub fn register_hotkey_shortcut(app: AppHandle) {
    app.global_shortcut_manager()
        .register(GLOBAL_HOTKEY_SHORTCUT, move || {
            on_shortcut(&app);
        })
        .unwrap();
}

pub fn register_hotkey_active_window(app: AppHandle) {
    app.global_shortcut_manager()
        .register(GLOBAL_HOTKEY_ACTIVE_WINDOW, move || {
            on_active_window(&app);
        })
        .unwrap();
}

pub fn unregister_hotkey_shortcut(app: &AppHandle) {
    app.global_shortcut_manager()
        .unregister(GLOBAL_HOTKEY_SHORTCUT)
        .unwrap();
}

pub fn unregister_hotkey_active_window(app: &AppHandle) {
    app.global_shortcut_manager()
        .unregister(GLOBAL_HOTKEY_ACTIVE_WINDOW)
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

fn on_active_window(app: &AppHandle) {
    notification(app, "当前应用", get_current_active_window().as_str());
}
