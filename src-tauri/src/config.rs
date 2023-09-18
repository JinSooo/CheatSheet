use crate::utils::WINDOW_SIZE_RATIO;
use crate::APP;
use serde_json::{json, Value};
use std::sync::Mutex;
use tauri::{api::path::config_dir, App, Manager, Wry};
use tauri_plugin_store::{Store, StoreBuilder};

pub struct StoreWrapper(pub Mutex<Store<Wry>>);

pub fn init_config(app: &App) {
    // 获取配置文件路径
    // let config_path = resource_dir(app.package_info(), &Env::default()).unwrap();
    let config_path = config_dir().unwrap();
    let config_path = config_path.join(app.config().tauri.bundle.identifier.clone());
    let config_path = config_path.join("config.json");
    println!("Load config: {:?}", config_path);

    // 加载Store
    let mut store = StoreBuilder::new(app.handle(), config_path).build();
    match store.load() {
        Ok(_) => println!("Config loaded"),
        Err(e) => {
            println!("Config load error: {:?}", e);
            println!("Config not found, creating new config");
        }
    }
    // 添加到app中
    app.manage(StoreWrapper(Mutex::new(store)));
}

fn check_config_key<T: serde::ser::Serialize>(key: &str, default: T) {
    match get(key) {
        Some(..) => {}
        None => set(key, default),
    }
}

// 检查配置信息是否完整
pub fn check_config() {
    check_config_key("cheatSheetShortCut", "F2");
    check_config_key("activeWindowShortCut", "Ctrl+F2");
    check_config_key("autoStart", false);
    check_config_key("checkUpdate", false);
    check_config_key("windowOpacity", 10);
    check_config_key("windowBorderRadius", 16);
    check_config_key("windowSizeRatio", WINDOW_SIZE_RATIO);
    check_config_key("theme", "system");
    check_config_key("trayLeftClick", "none");
}

pub fn get(key: &str) -> Option<Value> {
    let state = APP.get().unwrap().state::<StoreWrapper>();
    let store = state.0.lock().unwrap();
    match store.get(key) {
        Some(value) => Some(value.clone()),
        None => None,
    }
}

pub fn set<T: serde::ser::Serialize>(key: &str, value: T) {
    let state = APP.get().unwrap().state::<StoreWrapper>();
    let mut store = state.0.lock().unwrap();
    store.insert(key.to_string(), json!(value)).unwrap();
    store.save().unwrap();
}
