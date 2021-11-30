import {initializeApp} from 'firebase/app';
import firebase from "firebase/compat";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBBfrmCFjhbrDnQy2Nhpva2qbfxqdPIjJk",
    authDomain: "rookas-ig.firebaseapp.com",
    projectId: "rookas-ig",
    storageBucket: "rookas-ig.appspot.com",
    messagingSenderId: "444280829260",
    appId: "1:444280829260:web:f2a4692b7d78b91fe54be9",
    measurementId: "G-DCM72YR60V"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();


