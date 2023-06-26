Solução:
Open android studio
View => tools windows => device files explorer
data/data/com.wallety/databases/Wallety
copy file to 
path C:\Users\tlcal\Documents\githubProjects\wisely-app\databases












run on vscode terminal:
adb shell run-as com.wallety ls /data/data/com.wallety/databases/

adb shell run-as com.wallety cp /data/data/com.wallety/databases/Waletty /sdcard/Waletty.db

adb pull /sdcard/Wallety

copy database
adb -d shell "run-as com.wallety cat /data/data/com.wallety/databases/Waletty.db" > /sdcard/Waletty.db

adb shell run-as com.wallety pull /data/data/com.wallety/databases/Waletty /Users/PATH/

path C:\Users\tlcal\Documents\githubProjects\wisely-app\databases