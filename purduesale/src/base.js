import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD2H690CHZ83tFmNyuLf1CWMGYl_wYm8nE",
    authDomain: "purduesale-f3832.firebaseapp.com",
    databaseURL: "https://purduesale-f3832.firebaseio.com",
    projectId: "purduesale-f3832",
    storageBucket: "purduesale-f3832.appspot.com",
    messagingSenderId: "761839243960",
    appId: "1:761839243960:web:fd0078428abc654cfa1a4d",
    measurementId: "G-MT8X9B14NL"
  };

const app = firebase.initializeApp(firebaseConfig);
  // Get a reference to the database service
  const database = firebase.database();

  export {app, database};