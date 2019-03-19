import * as firebase from 'firebase';
import firebaseConfig from './firebase_config.json';
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.auth().signInAnonymously();

global.firebase = firebase;
console.ignoredYellowBox = ["Setting a timer"];