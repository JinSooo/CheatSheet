use crate::utils::get_current_active_window;
use tauri::{AppHandle, GlobalShortcutManager, Manager};

static GLOBAL_HOTKEY_SHORTCUT: &str = "F2";

pub fn init_hotkey(app: AppHandle) {
    register_hotkey(app);
}

fn hotkey_handler(app: &AppHandle) {
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

pub fn register_hotkey(app: AppHandle) {
    app.global_shortcut_manager()
        .register(GLOBAL_HOTKEY_SHORTCUT, move || {
            hotkey_handler(&app);
        })
        .unwrap();
}

pub fn unregister_hotkey(app: &AppHandle) {
    app.global_shortcut_manager()
        .unregister(GLOBAL_HOTKEY_SHORTCUT)
        .unwrap();
}
