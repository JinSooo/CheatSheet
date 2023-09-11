use active_win_pos_rs::get_active_window;
use tauri::api::notification::Notification;
use tauri::{LogicalSize, Manager, Size};

use crate::APP;

// 根据显示屏按比例适配窗口大小
static WINDOW_SIZE_RATIO: f64 = 0.75;
pub fn adjust_window_size() {
    let app_handle = APP.get().unwrap();
    let window = app_handle.get_window("main").unwrap();

    if let Some(monitor) = window.current_monitor().unwrap() {
        let size = monitor.size();
        let width = size.width as f64 * WINDOW_SIZE_RATIO;
        let height = size.height as f64 * WINDOW_SIZE_RATIO;
        window
            .set_size(Size::Logical(LogicalSize { width, height }))
            .unwrap();
        window.center().unwrap();
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
