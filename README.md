# Cardinal Kit Web Version

Project Demo is available at https://cardinalkit-testing.web.app/ 
Download our application for ios 

# Getting started
# 1) Configure Firebase Project
**1.1** Create New Firebase Project and send data from Cardinal Kit ios App
 - Clone our Ios application and connect to your own Firebase project
 - `https://github.com/CardinalKit/CardinalKit.git`
 - Register users and send data to firebase from Ios Application

**1.2** Add web App on Firebase Project
 - On Firebase Project go to Project Settings and Add App
 - Select Web and complete all steps
 - Download Firebase Config

**1.3:** Add firebase Config to Vue Project

 - Open ***cardinal-kit-web/.env*** File
 - Copy firebase config values 
	 - `VUE_APP_FIREBASE_API_KEY = firebaseConfig.apiKey`
	 - `VUE_APP_FIREBASE_AUTH_DOMAIN  = firebaseConfig.authDomain`
     - `VUE_APP_FIREBASE_DATABASE_URL  = firebaseConfig.databaseURL`
	 - `VUE_APP_FIREBASE_PROJECT_ID  = firebaseConfig.projectId`
	 - `VUE_APP_FIREBASE_STORAGE_BUCKET  = firebaseConfig.storageBucket`
	 - `VUE_APP_FIREBASE_MESSAGING_SENDER_ID  = firebaseConfig.messagingSenderId` 
	 - `VUE_APP_FIREBASE_APP_ID = firebaseConfig.appId` 
	
# 2) Deploy Firebase Functions

Firebase functions are required to transform Omh to Fhir data in real time

**2.1** Install and login  Firebase CLI 

    Follow Firebase Documentation https://firebase.google.com/docs/cli?hl=es
   **2.2** Init Firebase Functions on "Firebase" folder 
> Don't override any functions folder

**2.3** Deploy Firebase functions on your project
		

    Firebase Deploy --only functions

# 3) Run Vue Project

 **3.1** Open cardinal-kit-web

    cd cardinal-kit-web

**3.2** Install Dependencies

    npm install

**3.3** Run the project

    npm run serve

