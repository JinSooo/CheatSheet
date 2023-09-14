use active_win_pos_rs::get_active_window;
use once_cell::sync::OnceCell;
use std::collections::HashMap;

/*
  初始化应用名称的映射关系
    因为Windows和Mac中的程序名称不一定都是一样的,所以目前的方式是通过映射来协调
*/
static ACTIVE_WINDOW_MAP: OnceCell<HashMap<&str, &str>> = OnceCell::new();
pub fn init_active_window_map() {
    let mut map = HashMap::new();
    map.insert("Code", "Visual Studio Code");

    // Global ACTIVE_WINDOW_MAP
    ACTIVE_WINDOW_MAP.get_or_init(|| map);
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
            None => active_window.app_name,
        },
        Err(()) => "Default".to_string(),
    }
}
