on run argv
    set commandText to item 1 of argv
    do shell script "/Applications/Alacritty.app/Contents/MacOS/alacritty --hold -e " & commandText & " &"
end run
