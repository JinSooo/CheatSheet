use active_win_pos_rs::get_active_window;
use log::info;
use once_cell::sync::OnceCell;
use serde::Deserialize;
use std::collections::HashMap;
use tauri::{
    api::{file::read_string, path::resource_dir},
    Manager,
};

use crate::{window::get_main_window, APP};

#[derive(Deserialize, Debug)]
struct AppMap {
    win: String,
    mac: String,
}

/*
  ACTIVE_WINDOW_MAP 初始化应用名称的映射关系
    因为Windows和Mac中的程序名称不一定都是一样的,所以目前的方式是通过映射来协调

  ACTIVE_WINDOW_COMPAT 兼容相同软件的不同版本
    比如 Microsoft Visual Studio 2022 -> Microsoft Visual Studio
*/
static ACTIVE_WINDOW_MAP: OnceCell<HashMap<&mut str, &mut str>> = OnceCell::new();
static ACTIVE_WINDOW_COMPAT: OnceCell<Vec<&str>> = OnceCell::new();
pub fn init_active_window_map() {
    let app_handle = APP.get().unwrap();
    let resource_path = resource_dir(app_handle.package_info(), &get_main_window().env()).unwrap();
    let map_path = resource_path.join("../resources/AppMap.json");
    let compat_path = resource_path.join("../resources/AppCompat.json");
    info!("Load map config: {:?}", map_path);
    info!("Load compat config: {:?}", compat_path);

    // map
    let content = read_string(map_path).unwrap();
    let app_map = serde_json::from_str::<Vec<AppMap>>(&content).unwrap();
    let mut map = HashMap::new();
    for kv in app_map.into_iter() {
        map.insert(
            Box::leak(kv.mac.into_boxed_str()),
            Box::leak(kv.win.into_boxed_str()),
        );
    }

    // compat
    let content = Box::leak(read_string(compat_path).unwrap().into_boxed_str());
    let app_compat = serde_json::from_str::<Vec<&str>>(content).unwrap();

    // Global ACTIVE_WINDOW_MAP
    ACTIVE_WINDOW_MAP.get_or_init(|| map);
    ACTIVE_WINDOW_COMPAT.get_or_init(|| app_compat);
}

// 获取当前聚焦程序
pub fn get_current_active_window() -> String {
    match get_active_window() {
        Ok(active_window) => match ACTIVE_WINDOW_MAP
            .get()
            .unwrap()
            .get(active_window.app_name.as_str())
        {
            Some(v) => v.to_string(),
            None => {
                for compat in ACTIVE_WINDOW_COMPAT.get().unwrap() {
                    if active_window.app_name.starts_with(compat) {
                        return compat.to_string();
                    }
                }
                active_window.app_name
            }
        },
        Err(()) => "Default".to_string(),
    }
}
