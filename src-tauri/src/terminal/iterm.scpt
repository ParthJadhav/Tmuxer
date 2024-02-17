on run argv
    set commandText to item 1 of argv

    tell application "iTerm"
        set newWindow to (create window with default profile)
        activate
        tell current session of newWindow
            write text commandText
        end tell
    end tell
end run
