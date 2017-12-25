import * as firebase from 'firebase';
var firebaseConfig = {
  apiKey: "AIzaSyBzTeYNkx9WNUEPWO0i0_yNmXMooasFrq0",
  authDomain: "fablabbooking-3062f.firebaseapp.com",
  databaseURL: "https://fablabbooking-3062f.firebaseio.com",
  projectId: "fablabbooking-3062f",
  storageBucket: "fablabbooking-3062f.appspot.com",
  messagingSenderId: "794905869410"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.auth().signInAnonymously();

global.firebase = firebase;
console.ignoredYellowBox = ["Setting a timer"];