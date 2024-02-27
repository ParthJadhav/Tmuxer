use std::process::Command;

#[derive(serde::Serialize, Clone)]
pub struct Session {
    session_name: String,
    windows: i16,
    created_at: String,
}

impl Session {
    pub fn new(session_name: String, windows: i16, created_at: String) -> Self {
        Session {
            session_name,
            windows,
            created_at,
        }
    }

    pub fn display(&self) {
        println!("Session Name: {}", self.session_name);
        println!("Number of Windows: {}", self.windows);
        println!("Created Time: {}", self.created_at);
    }
}

#[tauri::command]
pub fn get_tmux_sessions() -> Vec<Session> {
    let output = Command::new("tmux").arg("ls").output();

    match output {
        Ok(value) => {
            let stdout = String::from_utf8(value.stdout).expect("Error decoding string");

            let mut sessions: Vec<Session> = Vec::new();

            for line in stdout.lines() {
                let parts: Vec<&str> = line.split(": ").collect();
                if parts.len() == 2 {
                    let session_name = parts[0];
                    let info: Vec<&str> = parts[1].split(" (created ").collect();
                    let window_info: Vec<&str> = info[0].split(' ').collect();
                    let windows = window_info[0].parse::<i16>().unwrap();
                    let created_at = info[1].trim_end_matches(')');

                    let session =
                        Session::new(session_name.to_owned(), windows, created_at.to_owned());
                    sessions.push(session);
                }
            }

            sessions
        }
        Err(err) => {
            log::error!("error getting tmux sessions: {}", err);
            Vec::new()
        }
    }
}
