// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

fn main() {
  tauri::Builder::default()
  // .setup(|app| {
  //   let window = app.get_window("main").unwrap();
  //   window.listen("tauri://event/keyboard/down", move | event | {
  //       let window = app.get_window("main").unwrap();
  //       let input = event.payload();
  //       let now = std::time::Instant::now();

  //       启动一个计时器
  //       std::thread::spawn(move || {
  //         let duration = now.elapsed();

  //         500毫秒后触发长按事件
  //         if duration >= std::time::Duration::from_millis(500) {
  //           window.emit("longPress", input).unwrap();
  //         }
  //       });
  //     });

  //   Ok(())
  // })
    .invoke_handler(tauri::generate_handler![greet])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");

}

#[tauri::command]
fn greet(name: &str) -> String {
  format!("Hello, {}! You've been greeted from Rust!", name)
}
