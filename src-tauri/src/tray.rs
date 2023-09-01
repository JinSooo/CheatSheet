use tauri::{
    AppHandle, CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
    SystemTrayMenuItem,
};

pub fn init_tray() -> SystemTray {
    // Tray 菜单
    let tray_menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("show".to_string(), "显示").accelerator("F2"))
        .add_item(CustomMenuItem::new("hide".to_string(), "隐藏").accelerator("F2"))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("forbid".to_string(), "禁用快捷键"))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("active-window".to_string(), "当前应用"))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("option".to_string(), "首选项..."))
        .add_item(CustomMenuItem::new("help".to_string(), "帮助"))
        .add_item(CustomMenuItem::new("update".to_string(), "检查更新..."))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("quit".to_string(), "退出"));
    SystemTray::new().with_menu(tray_menu)
}

pub fn init_tray_tooltip(app: AppHandle) {
    app.tray_handle()
        .set_tooltip("CheatSheet   \n快捷键: F2   ")
        .unwrap();
}

pub fn tray_handler<'a>(app: &'a AppHandle, event: SystemTrayEvent) {
    match event {
        // 暂时保留
        SystemTrayEvent::LeftClick { .. } => on_left_click(),
        SystemTrayEvent::RightClick { .. } => on_right_click(),
        // 根据菜单 id 进行事件匹配
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "show" => on_show(app),
            "hide" => on_hide(app),
            "forbid" => on_forbid(),
            "active_window" => on_active_window(),
            "option" => on_option(),
            "help" => on_help(),
            "update" => on_update(),
            "quit" => on_quit(app),
            _ => (),
        },
        _ => {}
    }
}

fn on_left_click() {
    println!("🎉🎉🎉 tray: left click");
}

fn on_right_click() {
    println!("🎉🎉🎉 tray: left click");
}

fn on_show(app: &AppHandle) {
    app.get_window("main").unwrap().show().unwrap();
}

fn on_hide(app: &AppHandle) {
    app.get_window("main").unwrap().hide().unwrap();
}

fn on_forbid() {}

fn on_active_window() {}

fn on_option() {}

fn on_help() {}

fn on_update() {}

fn on_quit(app: &AppHandle) {
    app.exit(0);
}
