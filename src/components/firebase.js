import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var config = {
    apiKey: "AIzaSyC_EjZYVTDNTeQm1pWwDY6a-nVxwNppotA",
    authDomain: "soup-eb6a9.firebaseapp.com",
    databaseURL: "https://soup-eb6a9.firebaseio.com",
    projectId: "soup-eb6a9",
    storageBucket: "soup-eb6a9.appspot.com",
    messagingSenderId: "103355121535",
    appId: "1:103355121535:web:6fe0ffb9757645d6f9244a"
};

// Initialize Firebase
firebase.initializeApp(config);

export const database = firebase.database();
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;