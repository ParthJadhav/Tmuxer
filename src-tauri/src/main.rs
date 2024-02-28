#![warn(clippy::nursery, clippy::pedantic)]

mod ns_panel;
mod terminal;
mod tmux;
mod util;

use log::Log;
use tauri::{
    CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem,
    Window,
};

use tauri_plugin_log::LogTarget;
use terminal::open_terminal;
use tmux::get_tmux_sessions;
use util::launch_on_login;

#[allow(unused_imports)]
use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial};

fn create_system_tray() -> SystemTray {
    let quit = CustomMenuItem::new("Quit".to_string(), "Quit");
    let show = CustomMenuItem::new("Show".to_string(), "Show");
    let hide = CustomMenuItem::new("Hide".to_string(), "Hide");
    let dashboard = CustomMenuItem::new("Dashboard".to_string(), "Dashboard");
    let tray_menu = SystemTrayMenu::new()
        .add_item(show)
        .add_item(hide)
        .add_item(dashboard)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);
    SystemTray::new().with_menu(tray_menu)
}

#[tauri::command]
fn apply_vibrancy_to_dashboard(window: Window) {
    apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, Some(10.0))
        .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");
}

fn main() {
    let _ = fix_path_env::fix();

    #[cfg(debug_assertions)]
    const LOG_TARGETS: [LogTarget; 2] = [LogTarget::Stdout, LogTarget::Webview];

    #[cfg(not(debug_assertions))]
    const LOG_TARGETS: [LogTarget; 2] = [LogTarget::Stdout, LogTarget::LogDir];

    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(
            tauri_plugin_log::Builder::default()
                .targets(LOG_TARGETS)
                .build(),
        )
        .invoke_handler(tauri::generate_handler![
            launch_on_login,
            open_terminal,
            get_tmux_sessions,
            ns_panel::init_ns_panel,
            ns_panel::show_app,
            ns_panel::hide_app,
            apply_vibrancy_to_dashboard
        ])
        .setup(|app| {
            app.set_activation_policy(tauri::ActivationPolicy::Accessory);
            #[cfg(target_os = "macos")]
            if let Some(window) = app.get_window("search") {
                apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, Some(10.0))
                    .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");
            } else {
                log::error!("Failed to apply vibrancy to window");
            }
            Ok(())
        })
        .manage(ns_panel::State::default())
        .system_tray(create_system_tray())
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "Hide" => {
                    if let Some(window) = app.get_window("search") {
                        match window.hide() {
                            Err(e) => {
                                log::error!("Failed to hide search window: {}", e);
                            }
                            _ => {}
                        }
                    } else {
                        log::error!("Failed to set auto_launch");
                    }
                }
                "Show" => {
                    if let Some(window) = app.get_window("search") {
                        if let Err(e) = window.emit("showApp", Some("Yes")) {
                            log::error!("Failed to emit 'showApp': {}", e);
                        }
                        if let Err(e) = window.show() {
                            log::error!("Failed to show window: {}", e);
                        }
                        if let Err(e) = window.center() {
                            log::error!("Failed to center window: {}", e);
                        }
                    } else {
                        log::error!("Failed to set auto_launch");
                    }
                }
                "Dashboard" => {
                    if let Some(window) = app.get_window("search") {
                        if let Err(e) = window.emit("showDashboard", Some("Yes")) {
                            log::error!("Failed to emit 'showDashboard': {}", e);
                        }
                        if let Err(e) = window.show() {
                            log::error!("Failed to show window: {}", e);
                        }
                        if let Err(e) = window.center() {
                            log::error!("Failed to center window: {}", e);
                        }
                    }
                }
                "Quit" => {
                    std::process::exit(0);
                }
                _ => {}
            },
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
