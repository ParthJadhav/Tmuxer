on run argv
    set commandText to item 1 of argv
    do shell script "/Applications/kitty.app/Contents/MacOS/kitty --hold -e " & commandText & " &"
end run
