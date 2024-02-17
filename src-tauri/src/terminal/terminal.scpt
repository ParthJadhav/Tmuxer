on run argv
    set commandText to item 1 of argv
    tell application "Terminal"
        activate
        do script commandText
    end tell
end run
