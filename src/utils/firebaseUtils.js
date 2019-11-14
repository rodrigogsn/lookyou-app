import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBapA_UAaodFIGtQMzwHW2wEOaMTcsww2A",
  authDomain: "lookyou-59c92.firebaseapp.com",
  databaseURL: "https://lookyou-59c92.firebaseio.com",
  projectId: "lookyou-59c92",
  storageBucket: "lookyou-59c92.appspot.com",
  messagingSenderId: "126142889389",
  appId: "1:126142889389:web:6ccda535b7c7f99d003524",
  measurementId: "G-Z0R63XMGB2"
};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();
export const storage = firebase.storage();
