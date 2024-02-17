export interface ISession {
  session_name: string;
  windows: number;
  created_at: string;
}

export type TerminalEmulator = "Default" | "Kitty" | "iTerm" | "Alacritty"
