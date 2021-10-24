---
home: false
title: Web Deploy
footer: Alternova Inc
---

<Block>

# Web Deploy

## 1) Configure Firebase Project

Create New Firebase Project and send data from Cardinal Kit ios App
 - Go to firebase.google.com and sign in with the same account that you set up for the mobile app.
 ``` https://console.firebase.google.com/ ```
 - Select the same application that you created previously
 </br>
 </br>
 <img src="./images/project.png" alt="drawing" width="450"/>
 </br>
 </br>
 - then select project settings in the configuration menu
 </br>
 </br>
 <img src="./images/settings.png" alt="drawing" width="450"/>
 </br>
 </br>
 - now select add app to create a new web application and associate it with firebase
 </br>
 </br>
 <img src="./images/new-app.png" alt="drawing" width="775"/>
 </br>
 </br>
 - select web app symbol
 </br>
 </br>
 <img src="./images/webapp.png" alt="drawing" width="450"/>
 </br>
 </br>
  - Complete firebase form to register new web app
 </br>
 </br>
 <img src="./images/register1.png" alt="drawing" width="438"/>
  </br>
 </br>
  - copy the generated firebase configuration
 </br>
 </br>
 <img src="./images/register2.png" alt="drawing" width="650"/>
 </br>
 </br>
 - Open ***cardinal-kit-web/.env*** File and replace firebase config values
 </br>
 </br>
     - `VUE_APP_FIREBASE_API_KEY = firebaseConfig.apiKey`
	 - `VUE_APP_FIREBASE_AUTH_DOMAIN  = firebaseConfig.authDomain`
     - `VUE_APP_FIREBASE_DATABASE_URL  = firebaseConfig.databaseURL`
	 - `VUE_APP_FIREBASE_PROJECT_ID  = firebaseConfig.projectId`
	 - `VUE_APP_FIREBASE_STORAGE_BUCKET  = firebaseConfig.storageBucket`
	 - `VUE_APP_FIREBASE_MESSAGING_SENDER_ID  = firebaseConfig.messagingSenderId` 
	 - `VUE_APP_FIREBASE_APP_ID = firebaseConfig.appId` 
	


 <Example>

<br>
<br>
<br>
<br>


 ```
 https://console.firebase.google.com/
  ```

 </Example>
 </Block>
 <Block>

## 2) Deploy Firebase Functions

To automatically transform the data from ohm format to fhir format it is necessary to implement the firebase functions found in the project

- Go to the console install firebase and log in 

you can follow the official documentation  ```https://firebase.google.com/docs/cli?hl=es```

<Example>
 ```bash
 npm install -g firebase-tools
 firebase login
  ```

</Example>
</Block>

<Block>

  ###  Init Firebase Functions on "Firebase" folder

  > Don't override any functions folder

</br>
</br>
</br>

  ###  Then Deploy firebase functions

  <Example>
```bash
    firebase init
```

</br>
</br>

```bash
    Firebase Deploy --only functions
```
  </Example>


</Block>

<Block>

## 3) Run Vue Project

Once we have configured firebase complements, the next step is to run the service of your website locally

abre en una terminal la carpeta Cardinal-kit-web

```bash
 cd cardinal-kit-web
```

once in the folder the first thing is to install all the dependencies that the vue project needs for this we will use npm

```bash
 npm install
```

after having everything installed and configured, it only remains to run the project

```bash
 npm run serve
```

</Block>