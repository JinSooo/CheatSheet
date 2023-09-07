// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod event;
mod hotkey;
mod tray;
mod utils;
mod window;

use event::*;
use hotkey::*;
use tauri::{generate_context, generate_handler, Manager};
use tauri_plugin_autostart::MacosLauncher;
use tray::*;
use utils::adjust_window_size;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_autostart::init(
            MacosLauncher::LaunchAgent,
            Some(vec!["--flag1", "--flag2"]),
        ))
        // .on_window_event(init_tauri_event)
        .system_tray(init_tray())
        .on_system_tray_event(tray_handler)
        .setup(|app| {
            init_tray_tooltip(app.app_handle());
            adjust_window_size(app.app_handle());
            init_hotkey(app.app_handle());
            Ok(())
        })
        .invoke_handler(generate_handler![left_click_type])
        .run(generate_context!())
        .expect("error while running tauri application");
}
