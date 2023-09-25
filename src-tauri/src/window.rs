use crate::APP;
use log::{info, warn};
use tauri::{Manager, Monitor, Window, WindowBuilder};

// Get main window instance
pub fn get_main_window() -> Window {
    let app_handle = APP.get().unwrap();
    match app_handle.get_window("main") {
        Some(v) => v,
        None => {
            warn!("Main window not found, create new main window!");
            let (window, _exists) = build_window("main", "", "/");
            window
        }
    }
}

// Get monitor where the mouse is currently located
pub fn get_current_monitor(x: i32, y: i32) -> Monitor {
    info!("Mouse position: {}, {}", x, y);
    let main_window = get_main_window();
    let monitors = main_window.available_monitors().unwrap();

    for m in monitors {
        let size = m.size();
        let position = m.position();

        if x >= position.x
            && x <= (position.x + size.width as i32)
            && y >= position.y
            && y <= (position.y + size.height as i32)
        {
            info!("Current Monitor: {:?}", m);
            return m;
        }
    }
    warn!("Current Monitor not found, using primary monitor");
    main_window.primary_monitor().unwrap().unwrap()
}

// Creating a window on the mouse monitor
fn build_window(label: &str, title: &str, url: &str) -> (Window, bool) {
    use mouse_position::mouse_position::{Mouse, Position};

    let mouse_position = match Mouse::get_mouse_position() {
        Mouse::Position { x, y } => Position { x, y },
        Mouse::Error => {
            warn!("Mouse position not found, using (0, 0) as default");
            Position { x: 0, y: 0 }
        }
    };
    let current_monitor = get_current_monitor(mouse_position.x, mouse_position.y);
    let dpi = current_monitor.scale_factor();
    let physical_position = current_monitor.position();
    let position: tauri::LogicalPosition<f64> = physical_position.to_logical(dpi);

    let app_handle = APP.get().unwrap();
    match app_handle.get_window(label) {
        Some(v) => {
            info!("Window existence: {}", label);
            v.set_focus().unwrap();
            (v, true)
        }
        None => {
            info!("Window not existence, Creating new window: {}", label);
            let builder = WindowBuilder::new(app_handle, label, tauri::WindowUrl::App(url.into()))
                .position(position.x, position.y)
                .decorations(true)
                .transparent(true)
                .focused(true)
                .title(title)
                .visible(false);

            // TODO: Config窗口无头化
            // #[cfg(not(target_os = "macos"))]
            // {
            //     builder = builder.decorations(false);
            // }
            let window = builder.build().unwrap();
            let _ = window.current_monitor();
            window.set_focus().unwrap();
            (window, false)
        }
    }
}

pub fn config_window() {
    let (window, _exists) = build_window("config", "CheatSheet Config", "/config/general");
    window
        .set_min_size(Some(tauri::LogicalSize::new(800, 400)))
        .unwrap();
    window.set_size(tauri::LogicalSize::new(800, 600)).unwrap();
    window.center().unwrap();
    window.show().unwrap();
    window.set_focus().unwrap();
}
