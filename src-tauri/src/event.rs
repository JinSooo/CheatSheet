use tauri::{GlobalWindowEvent, WindowEvent};

pub fn init_tauri_event(e: GlobalWindowEvent) {
    // 失去焦点自动隐藏
    match e.event() {
        WindowEvent::Focused(focused) => on_focused(&e, focused),
        _ => (),
    }
}

fn on_focused(e: &GlobalWindowEvent, focused: &bool) {
    if e.window().label() == "main" && !focused && e.window().is_visible().unwrap() {
        e.window().hide().unwrap();
    }
}
