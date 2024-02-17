use core::panic;
use std::process::Command;

pub struct TerminalEmulator {
    #[allow(dead_code)]
    name: &'static str,
    script: &'static str,
}

impl TerminalEmulator {
    #[allow(dead_code)]
    fn new(name: &'static str, script: &'static str) -> Self {
        Self { name, script }
    }

    fn run_script(self, command: &str) {
        let _ = Command::new("osascript")
            .arg("-e")
            .arg(self.script)
            .arg(command.to_owned())
            .spawn();
    }
}

const DEFAULT_TERMINAL_SHELL: &str = include_str!("./terminal.scpt");
const ITERM_SHELL: &str = include_str!("./iterm.scpt");
const KITTY_SHELL: &str = include_str!("./kitty.scpt");
const ALACRITTY_SHELL: &str = include_str!("./alacritty.scpt");

const DEFAULT_TERMINAL: TerminalEmulator = TerminalEmulator {
    name: "Default Terminal",
    script: DEFAULT_TERMINAL_SHELL,
};

const ITERM: TerminalEmulator = TerminalEmulator {
    name: "iTerm",
    script: ITERM_SHELL,
};

const KITTY: TerminalEmulator = TerminalEmulator {
    name: "Kitty",
    script: KITTY_SHELL,
};

const ALACRITTY: TerminalEmulator = TerminalEmulator {
    name: "Alacritty",
    script: ALACRITTY_SHELL,
};

#[tauri::command]
pub fn open_terminal(terminal: String, command: String) {
    match terminal.to_lowercase().as_str() {
        "default" => {
            DEFAULT_TERMINAL.run_script(command.as_str());
        }
        "iterm" => {
            ITERM.run_script(command.as_str());
        }
        "kitty" => {
            KITTY.run_script(command.as_str());
        }
        "alacritty" => {
            ALACRITTY.run_script(command.as_str());
        }
        _ => {
            panic!("terminal emulator not implemented");
        }
    }
}
