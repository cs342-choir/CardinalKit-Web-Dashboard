import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
}
console.log(firebaseConfig)
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const appleAuthProvider = new firebase.auth.OAuthProvider('apple.com');
const timeTransform =  firebase.firestore.Timestamp
const secondaryProvider = firebase.initializeApp(firebaseConfig, "Secondary").auth();
// export utils/refs
export {
  db,
  auth,
  googleAuthProvider,
  appleAuthProvider,
  timeTransform,
  secondaryProvider
}