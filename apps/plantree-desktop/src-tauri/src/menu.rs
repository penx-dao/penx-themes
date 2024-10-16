use std::time::{SystemTime, UNIX_EPOCH};

// use tauri::{
//     menu::{MenuBuilder, MenuItemBuilder},
//     tray::{ClickType, TrayIconBuilder},
// };

// pub fn create_system_tray() -> SystemTray {
//     let quit = CustomMenuItem::new("Quit".to_string(), "Quit");
//     let show = CustomMenuItem::new("Show".to_string(), "Show");
//     let hide = CustomMenuItem::new("Hide".to_string(), "Hide");
//     let preferences = CustomMenuItem::new("Preferences".to_string(), "Preferences");
//     let tray_menu = SystemTrayMenu::new()
//         .add_item(show)
//         .add_item(hide)
//         .add_item(preferences)
//         .add_native_item(SystemTrayMenuItem::Separator)
//         .add_item(quit);
//     SystemTray::new().with_menu(tray_menu)
// }

#[tauri::command]
pub fn on_button_clicked() -> String {
    let start = SystemTime::now();
    let since_the_epoch = start
        .duration_since(UNIX_EPOCH)
        .expect("Time went backwards")
        .as_millis();
    format!("on_button_clicked called from Rust! (timestamp: {since_the_epoch}ms)")
}
