// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod event;
mod hotkey;
mod tray;
mod utils;
mod window;

use event::*;
use hotkey::*;
use once_cell::sync::OnceCell;
use tauri::{generate_context, generate_handler, Manager};
use tauri_plugin_autostart::MacosLauncher;
use tray::*;
use utils::adjust_window_size;

// Global AppHandle
pub static APP: OnceCell<tauri::AppHandle> = OnceCell::new();

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
            // Global AppHandle
            APP.get_or_init(|| app.handle());

            init_tray_tooltip();
            init_hotkey();
            adjust_window_size(app.app_handle());
            Ok(())
        })
        .invoke_handler(generate_handler![
            left_click_type,
            register_hotkey_with_shortcut,
            register_hotkey,
            unregister_hotkey
        ])
        .run(generate_context!())
        .expect("error while running tauri application");
}
