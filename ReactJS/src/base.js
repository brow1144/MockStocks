import firebase from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyCKsx-nrKUw4k1z0u0joPrqXrq4dWnndVo",
    authDomain: "portfolio-79626.firebaseapp.com",
    databaseURL: "https://portfolio-79626.firebaseio.com",
    projectId: "portfolio-79626",
    storageBucket: "portfolio-79626.appspot.com",
    messagingSenderId: "315330828559"
});

export const fireauth = firebase.auth();

export default firebase;