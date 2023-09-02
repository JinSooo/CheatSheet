use crate::utils::get_current_active_window;
use tauri::api::notification::Notification;
use tauri::{AppHandle, GlobalShortcutManager, Manager};

pub static GLOBAL_HOTKEY_SHORTCUT: &str = "F2";
pub static GLOBAL_HOTKEY_ACTIVE_WINDOW: &str = "Ctrl+F2";

pub fn init_hotkey(app: AppHandle) {
    register_hotkey(app);
}

pub fn register_hotkey(app: AppHandle) {
    let app_handle = app.app_handle();
    app_handle
        .global_shortcut_manager()
        .register(GLOBAL_HOTKEY_SHORTCUT, move || {
            hotkey_shortcut_handler(&app);
        })
        .unwrap();
    app_handle
        .global_shortcut_manager()
        .register(GLOBAL_HOTKEY_ACTIVE_WINDOW, move || {
            hotkey_active_window_handler(&app_handle);
        })
        .unwrap();
}

pub fn unregister_hotkey(app: &AppHandle) {
    app.global_shortcut_manager()
        .unregister(GLOBAL_HOTKEY_SHORTCUT)
        .unwrap();
}

fn hotkey_shortcut_handler(app: &AppHandle) {
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

fn hotkey_active_window_handler(app: &AppHandle) {
    println!("message: {}", get_current_active_window());
    Notification::new(&app.config().tauri.bundle.identifier)
        .title("当前应用")
        .body(get_current_active_window())
        .show()
        .unwrap();
}
