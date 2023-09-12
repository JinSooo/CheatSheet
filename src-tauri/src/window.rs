use tauri::{AppHandle, Manager, Window, WindowBuilder, WindowUrl};

use crate::APP;

fn build_window(label: &str, title: &str, url: &str) -> Window {
    let app_handle = APP.get().unwrap();
    match app_handle.get_window(label) {
        Some(v) => {
            println!("Window existence: {}", label);
            v.set_focus().unwrap();
            v
        }
        None => {
            println!("Window not existence, Creating new window: {}", label);
            let mut builder =
                tauri::WindowBuilder::new(app_handle, label, tauri::WindowUrl::App(url.into()))
                    .transparent(true)
                    .decorations(true)
                    .accept_first_mouse(true)
                    .resizable(false)
                    .focused(true)
                    .title(title)
                    .visible(false);

            #[cfg(target_os = "macos")]
            {
                builder = builder
                    .title_bar_style(tauri::TitleBarStyle::Overlay)
                    .hidden_title(true);
            }

            builder.build().unwrap()
        }
    }
}

pub fn config_window() {
    let config_window = build_window("config", "CheatSheet Config", "/config");
    // TODO: CheatSheet窗口会覆盖Config窗口，所以先将Config窗口也置顶，后续有其他方法再修改
    config_window.set_always_on_top(true).unwrap();
    config_window.show().unwrap();
    config_window.center().unwrap();
}
