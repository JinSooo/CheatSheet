use crate::{
    hotkey::{
        register_hotkey_active_window, register_hotkey_shortcut, unregister_hotkey_active_window,
        unregister_hotkey_shortcut, GLOBAL_HOTKEY_ACTIVE_WINDOW, GLOBAL_HOTKEY_SHORTCUT,
    },
    window::show_config_window,
    APP,
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
        .add_submenu(SystemTraySubmenu::new(
            "主题",
            SystemTrayMenu::new()
                .add_item(CustomMenuItem::new("theme_system".to_string(), "系统默认").selected())
                .add_item(CustomMenuItem::new("theme_light".to_string(), "亮色主题"))
                .add_item(CustomMenuItem::new("theme_dark".to_string(), "暗色主题")),
        ))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("option".to_string(), "首选项..."))
        .add_item(CustomMenuItem::new("help".to_string(), "帮助"))
        .add_item(CustomMenuItem::new("update".to_string(), "检查更新..."))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("quit".to_string(), "退出"));
    SystemTray::new().with_menu(tray_menu)
}

pub fn init_tray_tooltip() {
    let app_handle = APP.get().unwrap();
    unsafe {
        app_handle.tray_handle()
        .set_tooltip(
            format!(
                "CheatSheet   \n显示快捷键: {GLOBAL_HOTKEY_SHORTCUT}   \n当前应用快捷键: {GLOBAL_HOTKEY_ACTIVE_WINDOW}   "
            )
            .as_str(),
        )
        .unwrap();
    }
}

pub fn tray_handler<'a>(app: &'a AppHandle, event: SystemTrayEvent) {
    match event {
        // 暂时保留
        SystemTrayEvent::LeftClick { .. } => on_left_click(app),
        SystemTrayEvent::RightClick { .. } => on_right_click(),
        // 根据菜单 id 进行事件匹配
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "show" => on_show(app),
            "hide" => on_hide(app),
            "forbid_shortcut" => on_forbid_shortcut(app),
            "forbid_active_window" => on_forbid_active_window(app),
            "theme_system" => on_theme(app, id.as_str()),
            "theme_light" => on_theme(app, id.as_str()),
            "theme_dark" => on_theme(app, id.as_str()),
            "option" => on_config(app),
            "help" => on_help(),
            "update" => on_update(),
            "quit" => on_quit(app),
            _ => (),
        },
        _ => {}
    }
}

/*
  单击托盘事件
    0: 空
    1: 显示CheatSheet窗口
    2: 显示配置窗口
*/
static mut LEFT_CLICK_TYPE: &str = "null";
fn on_left_click(app: &AppHandle) {
    println!("🎉🎉🎉 tray: left click");
    unsafe {
        match LEFT_CLICK_TYPE {
            "cheatsheet" => {
                app.get_window("main").unwrap().show().unwrap();
            }
            "config" => {
                show_config_window(app);
            }
            _ => (),
        }
    }
}

#[tauri::command]
pub fn left_click_type(lc_type: String) {
    unsafe {
        LEFT_CLICK_TYPE = Box::leak(lc_type.into_boxed_str());
    }
}

fn on_right_click() {
    println!("🎉🎉🎉 tray: right click");
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
            register_hotkey_shortcut();
        } else {
            unregister_hotkey_shortcut();
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
            register_hotkey_active_window();
        } else {
            unregister_hotkey_active_window();
        }
        IS_FORBID_ACTIVE_WINDOW = !IS_FORBID_ACTIVE_WINDOW;
        app.tray_handle()
            .get_item("forbid_active_window")
            .set_selected(IS_FORBID_ACTIVE_WINDOW)
            .unwrap();
    }
}

fn on_theme(app: &AppHandle, theme: &str) {
    app.emit_all("theme", theme).unwrap();
}

fn on_config(app: &AppHandle) {
    show_config_window(app);
}

fn on_help() {}

fn on_update() {}

fn on_quit(app: &AppHandle) {
    app.exit(0);
}
