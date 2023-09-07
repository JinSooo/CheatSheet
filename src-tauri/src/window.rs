use tauri::{AppHandle, Manager, WindowBuilder, WindowUrl};

pub fn create_config_window(app: &AppHandle) {
    WindowBuilder::new(app, "config", WindowUrl::App("/config".into()))
        .transparent(true)
        .accept_first_mouse(true)
        .center()
        .resizable(false)
        .title("CheatSheet Config")
        // .decorations(false)
        .build()
        .unwrap();
}

pub fn show_config_window(app: &AppHandle) {
    match app.get_window("config") {
        Some(config_window) => {
            config_window.show().unwrap();
        }
        None => {
            create_config_window(app);
        }
    };
}
