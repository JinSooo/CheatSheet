use std::sync::Mutex;

use serde_json::{json, Value};
use tauri::{api::path::resource_dir, App, Env, Manager, Wry};
use tauri_plugin_store::{Store, StoreBuilder};

use crate::APP;

pub struct StoreWrapper(pub Mutex<Store<Wry>>);

pub fn init_config(app: &App) {
    // 获取配置文件路径
    let config_path = resource_dir(app.package_info(), &Env::default()).unwrap();
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
