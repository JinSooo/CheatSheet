use tauri::{AppHandle, WindowBuilder, WindowUrl};

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
