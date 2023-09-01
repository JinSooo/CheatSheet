use active_win_pos_rs::get_active_window;
use tauri::{AppHandle, Manager, PhysicalSize, Size};

// 根据显示屏按比例适配窗口大小
static WINDOW_SIZE_RATIO: f64 = 0.75;
pub fn adjust_window_size(app: AppHandle) {
    let window = app.get_window("main").unwrap();

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

// 获取当前聚焦程序
pub fn get_current_active_window() -> String {
    match get_active_window() {
        Ok(active_window) => active_window.app_name,
        Err(()) => "Default".to_string(),
    }
}
