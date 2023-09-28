use crate::config::get;
use crate::updater::check_update;
use crate::window::{config_window, get_main_window};
use crate::APP;
use tauri::{
    AppHandle, CustomMenuItem, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem,
};

pub fn init_tray() -> SystemTray {
    // Tray 菜单
    let tray_menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("show".to_string(), "显示").accelerator("F2"))
        .add_item(CustomMenuItem::new("hide".to_string(), "隐藏").accelerator("F2"))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("option".to_string(), "首选项..."))
        .add_item(CustomMenuItem::new("help".to_string(), "帮助"))
        .add_item(CustomMenuItem::new("update".to_string(), "检查更新..."))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("relaunch".to_string(), "重启"))
        .add_item(CustomMenuItem::new("quit".to_string(), "退出"));
    SystemTray::new().with_menu(tray_menu)
}

pub fn init_tray_tooltip(cheatsheet_shortcut: &str, active_window_shortcut: &str) {
    let cheatsheet = if cheatsheet_shortcut.is_empty() {
        match get("cheatSheetShortCut") {
            Some(v) => v.as_str().unwrap().to_string(),
            None => "".to_string(),
        }
    } else {
        cheatsheet_shortcut.to_string()
    };
    let active_window = if active_window_shortcut.is_empty() {
        match get("activeWindowShortCut") {
            Some(v) => v.as_str().unwrap().to_string(),
            None => "".to_string(),
        }
    } else {
        active_window_shortcut.to_string()
    };
    let app_handle = APP.get().unwrap();
    app_handle
        .tray_handle()
        .set_tooltip(
            format!(
                "CheatSheet   \n显示快捷键: {cheatsheet}   \n当前应用快捷键: {active_window}   "
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
            "show" => on_show(),
            "hide" => on_hide(),
            "option" => on_config(),
            "help" => on_help(),
            "update" => on_update(),
            "relaunch" => on_relaunch(app),
            "quit" => on_quit(app),
            _ => (),
        },
        _ => {}
    }
}

static mut LEFT_CLICK_TYPE: &str = "null";
pub fn init_tray_click() {
    let kind = match get("trayLeftClick") {
        Some(v) => v.as_str().unwrap().to_string(),
        None => "".to_string(),
    };
    unsafe {
        LEFT_CLICK_TYPE = Box::leak(kind.into_boxed_str());
    }
}

fn on_left_click() {
    println!("🎉🎉🎉 tray: left click");
    unsafe {
        match LEFT_CLICK_TYPE {
            "cheatsheet" => {
                get_main_window().show().unwrap();
            }
            "config" => {
                config_window();
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

fn on_show() {
    let main_window = get_main_window();
    main_window.show().unwrap();
    main_window.set_focus().unwrap();
}

fn on_hide() {
    get_main_window().hide().unwrap();
}

fn on_config() {
    config_window();
}

fn on_help() {}

fn on_relaunch(app: &AppHandle) {
    app.restart();
}

fn on_update() {
    check_update();
}

fn on_quit(app: &AppHandle) {
    app.exit(0);
}
