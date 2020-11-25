---
title: "Playing Among Us On macOS"
date: 2020-11-25
tags: ["tutorial"]
---
Here's a way to play Among Us on macOS without having to work around the mobile controls with BlueStacks or taking up a lot of disk space with full virtualization. Hopefully a native macOS port will be released eventually but this will work until then (if ever).

1. Download and install [Play On Mac](https://www.playonmac.com/en/)
2. Buy and download Among Us from [itch.io](https://innersloth.itch.io/among-us)
3. Open Play On Mac
   1. Right click it
   2. Select `Open` in the right click menu
   3. Select `Open` in the popup
4. Create a new virtual drive
   1. Click `Configure`
   2. Click `New`
   3. Select `64 bits windows installation`
   4. Select the wine version available (if blank, just click next)
   5. Name the drive `among_us`
   6. Install additional packages wine prompts for
5. Install Among Us
   1. Open configuration again
   2. Select `among_us` from the sidebar
   3. Go to `Miscellaneous`
   4. Select `Open virtual drive's directory`
   5. Navigate to `/drive_c/Program Files (x86)/`
   6. Move the `Among Us` folder from itch.io to there
6. Create a Shortcut
   1. Open configuration again
   2. Select `among_us` from the sidebar
   3. Go to `General`
   4. Select `Make a new shortcut from this virtual drive`
   5. Select `Among Us.exe` and click next
   6. Name the shortcut `Among Us`
7. Start the game
   1. Go to the main Play On Mac screen
   2. Select `Among Us`
   3. Click `Run` **once** (there will be popups—we will address those next) 
   4. Open System Preferences > Security & Privacy > General
8. Click `Cancel` on each popup and then `Allow Anyway` inside of system preferences (there's a couple)
9. Have fun playing!
