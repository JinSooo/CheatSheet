// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod event;
mod hotkey;
mod tray;
mod utils;

use event::*;
use hotkey::*;
use tauri::Manager;
use tray::*;
use utils::adjust_window_size;

fn main() {
    tauri::Builder::default()
        .on_window_event(init_tauri_event)
        .system_tray(init_tray())
        .on_system_tray_event(tray_handler)
        .setup(|app| {
            init_tray_tooltip(app.app_handle());
            adjust_window_size(app.app_handle());
            init_hotkey(app.app_handle());
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
