use log::info;
use tauri::api::notification::Notification;
use tauri::Window;

use crate::config::get;
use crate::window::get_main_window;
use crate::APP;

// 根据显示屏按比例适配窗口大小
pub static WINDOW_SIZE_RATIO: f64 = 0.75;

pub fn adjust_window_size(window: &Window) {
    info!("adjust_window_size");
    if let Some(monitor) = window.current_monitor().unwrap() {
        let size = monitor.size();
        let windows_size_ratio = match get("windowSizeRatio") {
            Some(v) => v.as_f64().unwrap(),
            None => WINDOW_SIZE_RATIO,
        };
        let width = size.width as f64 * windows_size_ratio;
        let height = size.height as f64 * windows_size_ratio;
        window
            .set_size(tauri::PhysicalSize::new(width, height))
            .unwrap();
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
#[tauri::command]
pub fn adjust_center_main_window() {
    let main_window = get_main_window();
    adjust_window_size(&main_window);
    main_window.center().unwrap();
}

#[tauri::command]
pub fn get_font_families() -> Vec<String> {
    let x = font_kit::source::SystemSource::new()
        .all_families()
        .unwrap()
        .iter()
        .map(|f| f.to_string())
        .collect();
    x
}
