import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

//Initialize firebase
var config = {
    apiKey: "AIzaSyD2H690CHZ83tFmNyuLf1CWMGYl_wYm8nE",
    authDomain: "purduesale-f3832.firebaseapp.com",
    databaseURL: "https://purduesale-f3832.firebaseio.com",
    projectId: "purduesale-f3832",
    storageBucket: "purduesale-f3832.appspot.com",
    messagingSenderId: "761839243960",
    appId: "1:761839243960:web:fd0078428abc654cfa1a4d",
    measurementId: "G-MT8X9B14NL"
  };

firebase.initializeApp(config);

const storage = firebase.storage();

export {storage, firebase as default}