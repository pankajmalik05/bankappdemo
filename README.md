### Bankappdemo

## Front End
  # Modifications
  - change Base_URL in src/proxy.js to hosted server url
  # Running
  - yarn 
  - yarn android
  # Build Instructions for Android
  - open project diractory in terminal 
  - type command "cd android"
  - type  type "./gradlew assembleRelease"
  - you will find your APK in   "projectRoot\android\app\build\outputs\apk\release\" directory 

## Back End
  # Modifications
  - change mongodbOnline in Config/db.js to  Database url
  # Running
  - node server
  # Hosting on Heroku
  - create account on heroku 
  - create an app with name of your choice
  - download the heroku cli for windows
  - type command "heroku login" in terminal and follow steps to deploy and get server url for client


