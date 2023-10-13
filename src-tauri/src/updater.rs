use log::{info, warn};
use tauri::api::version;

use crate::{
    config::{get, set},
    window::update_window,
    APP,
};

pub fn check_update() {
    let flag = match get("checkUpdate") {
        Some(v) => v.as_bool().unwrap(),
        None => {
            set("checkUpdate", true);
            true
        }
    };
    info!("checkUpdate: {}", flag);

    if flag {
        let app_handle = APP.get().unwrap().clone();

        tauri::async_runtime::spawn(async move {
            match app_handle.updater().check().await {
                Ok(update) => {
                    if version::is_greater(
                        app_handle.package_info().version.to_string().as_str(),
                        update.latest_version(),
                    )
                    .unwrap()
                    {
                        update_window();
                    } else {
                        info!("current app latest")
                    }
                }
                Err(e) => {
                    warn!("Failed to check update: {}", e);
                }
            }
        });
    }
}
