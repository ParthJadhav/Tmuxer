use auto_launch::AutoLaunchBuilder;

#[tauri::command]
pub fn launch_on_login(enable: bool) -> bool {
    if let Ok(auto) = AutoLaunchBuilder::new()
        .set_app_name("Tmuxer")
        .set_app_path("/Applications/Tmuxer.app")
        .build()
    {
        if enable {
            match auto.enable() {
                Ok(_) => true,
                Err(_) => {
                    log::warn!("Failed to set auto_launch");
                    false
                }
            }
        } else {
            match auto.disable() {
                Ok(_) => true,
                Err(_) => false,
            }
        }
    } else {
        log::error!("Failed to set launch on login");
        false
    }
}
