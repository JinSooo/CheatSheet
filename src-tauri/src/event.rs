use tauri::{GlobalWindowEvent, WindowEvent};

pub fn init_tauri_event(e: GlobalWindowEvent) {
    // 失去焦点自动隐藏
    match e.event() {
        WindowEvent::Focused(focused) => on_focused(&e, focused),
        _ => (),
    }
}

fn on_focused(e: &GlobalWindowEvent, focused: &bool) {
    if !focused {
        e.window().hide().unwrap();
    }
}
