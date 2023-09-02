use crate::hotkey::{
    register_hotkey_active_window, register_hotkey_shortcut, unregister_hotkey_active_window,
    unregister_hotkey_shortcut, GLOBAL_HOTKEY_ACTIVE_WINDOW, GLOBAL_HOTKEY_SHORTCUT,
};
use tauri::{
    AppHandle, CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
    SystemTrayMenuItem, SystemTraySubmenu,
};

pub fn init_tray() -> SystemTray {
    // Tray 菜单
    let tray_menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("show".to_string(), "显示").accelerator("F2"))
        .add_item(CustomMenuItem::new("hide".to_string(), "隐藏").accelerator("F2"))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_submenu(SystemTraySubmenu::new(
            "禁用快捷键",
            SystemTrayMenu::new()
                .add_item(CustomMenuItem::new(
                    "forbid_shortcut".to_string(),
                    "显示快捷键",
                ))
                .add_item(CustomMenuItem::new(
                    "forbid_active_window".to_string(),
                    "当前应用快捷键",
                )),
        ))
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
        .set_tooltip(
            format!(
                "CheatSheet   \n显示快捷键: {GLOBAL_HOTKEY_SHORTCUT}   \n当前应用快捷键: {GLOBAL_HOTKEY_ACTIVE_WINDOW}   "
            )
            .as_str(),
        )
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
            "forbid_shortcut" => on_forbid_shortcut(app),
            "forbid_active_window" => on_forbid_active_window(app),
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

static mut IS_FORBID_SHORTCUT: bool = false;
fn on_forbid_shortcut(app: &AppHandle) {
    unsafe {
        if IS_FORBID_SHORTCUT {
            register_hotkey_shortcut(app.app_handle());
        } else {
            unregister_hotkey_shortcut(app);
        }
        IS_FORBID_SHORTCUT = !IS_FORBID_SHORTCUT;
        app.tray_handle()
            .get_item("forbid_shortcut")
            .set_selected(IS_FORBID_SHORTCUT)
            .unwrap();
    }
}

static mut IS_FORBID_ACTIVE_WINDOW: bool = false;
fn on_forbid_active_window(app: &AppHandle) {
    unsafe {
        if IS_FORBID_ACTIVE_WINDOW {
            register_hotkey_active_window(app.app_handle());
        } else {
            unregister_hotkey_active_window(app);
        }
        IS_FORBID_ACTIVE_WINDOW = !IS_FORBID_ACTIVE_WINDOW;
        app.tray_handle()
            .get_item("forbid_active_window")
            .set_selected(IS_FORBID_ACTIVE_WINDOW)
            .unwrap();
    }
}

fn on_option() {}

fn on_help() {}

fn on_update() {}

fn on_quit(app: &AppHandle) {
    app.exit(0);
}
