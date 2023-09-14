// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod active_window;
mod config;
mod event;
mod hotkey;
mod tray;
mod utils;
mod window;

use crate::utils::adjust_center_main_window;
use active_window::*;
use config::*;
use hotkey::*;
use once_cell::sync::OnceCell;
use tauri::{api::notification::Notification, generate_handler};
use tauri_plugin_autostart::MacosLauncher;
use tray::*;

// Global AppHandle
pub static APP: OnceCell<tauri::AppHandle> = OnceCell::new();

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, _, cwd| {
            Notification::new(&app.config().tauri.bundle.identifier)
                .title("程序已经在运行, 请不要再次启动!")
                .body(cwd)
                .show()
                .unwrap();
        }))
        .plugin(tauri_plugin_autostart::init(
            MacosLauncher::LaunchAgent,
            Some(vec!["--flag1", "--flag2"]),
        ))
        .plugin(tauri_plugin_store::Builder::default().build())
        // .on_window_event(init_tauri_event)
        .system_tray(init_tray())
        .on_system_tray_event(tray_handler)
        .setup(|app| {
            #[cfg(target_os = "macos")]
            app.set_activation_policy(tauri::ActivationPolicy::Accessory);

            // Global AppHandle
            APP.get_or_init(|| app.handle());

            init_config(&app);
            check_config();
            init_tray_tooltip("", "");
            init_tray_click();
            init_hotkey();
            init_active_window_map();

            Ok(())
        })
        .invoke_handler(generate_handler![
            left_click_type,
            register_shortcut_by_frontend,
            adjust_center_main_window
        ])
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        // 窗口关闭不退出
        .run(|_app_handle, event| {
            if let tauri::RunEvent::ExitRequested { api, .. } = event {
                api.prevent_exit();
            }
        });
}
