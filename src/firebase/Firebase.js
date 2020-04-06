import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD9ejyaexTvM_WUfYMDhoKGpTVxUyQIek4",
    authDomain: "todoscontra-covid-19.firebaseapp.com",
    databaseURL: "https://todoscontra-covid-19.firebaseio.com",
    projectId: "todoscontra-covid-19",
    storageBucket: "todoscontra-covid-19.appspot.com",
    messagingSenderId: "10441002179",
    appId: "1:10441002179:web:515243d5d059362102e676",
    measurementId: "G-M3J7M9PD4K"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};
