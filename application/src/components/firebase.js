import firebase from 'firebase'
import config from '../credentials'

firebase.initializeApp(config);

export default firebase;
export const db = firebase.firestore();
export const auth = firebase.auth()