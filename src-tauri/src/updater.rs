use tauri::Manager;

use crate::window::get_main_window;

pub fn check_update() {
    get_main_window().emit_all("check_update", "").unwrap();
}
// pub fn check_update() {
//     let app_handle = APP.get().unwrap();
//     let app_handle = app_handle.clone();

//     tauri::async_runtime::spawn(async move {
//         match tauri::updater::builder(app_handle).check().await {
//             Ok(update) => {
//                 if update.is_update_available() {
//                     info!("New version available");
//                     update.download_and_install().await.unwrap();
//                 }
//             }
//             Err(e) => {
//                 warn!("Failed to check update: {}", e);
//             }
//         }
//     });
// }
