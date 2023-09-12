use crate::config::get;
use crate::window::get_main_window;
use crate::APP;
use active_win_pos_rs::get_active_window;
use tauri::api::notification::Notification;
use tauri::Window;

// 根据显示屏按比例适配窗口大小
pub static WINDOW_SIZE_RATIO: f64 = 0.75;

pub fn adjust_window_size(window: &Window) {
    println!("adjust_window_size");
    if let Some(monitor) = window.current_monitor().unwrap() {
        let size = monitor.size();
        let windows_size_ratio = match get("windows_size_ratio") {
            None => WINDOW_SIZE_RATIO,
            Some(v) => v.as_f64().unwrap(),
        };
        let width = size.width as f64 * windows_size_ratio;
        let height = size.height as f64 * windows_size_ratio;
        window
            .set_size(tauri::PhysicalSize::new(width, height))
            .unwrap();
    }
}

// 获取当前聚焦程序
pub fn get_current_active_window() -> String {
    match get_active_window() {
        Ok(active_window) => active_window.app_name,
        Err(()) => "Default".to_string(),
    }
}

// 发送消息 Notification
pub fn notification(title: &str, body: &str) {
    let app_handle = APP.get().unwrap();

    Notification::new(&app_handle.config().tauri.bundle.identifier)
        .title(title)
        .body(body)
        .show()
        .unwrap();
}

// 调整并居中主窗口
pub fn adjust_center_main_window() {
    let main_window = get_main_window();
    adjust_window_size(&main_window);
    main_window.center().unwrap();
}
