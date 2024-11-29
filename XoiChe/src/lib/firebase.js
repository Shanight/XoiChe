// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth,GoogleAuthProvider,sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth";
import { getStorage } from "firebase/storage";

import { Auth } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmQullpEMPTl0p5P5gf_T8rOAh3pIwSaA",
  authDomain: "baitai1-85678.firebaseapp.com",
  databaseURL: "https://baitai1-85678-default-rtdb.firebaseio.com",
  projectId: "baitai1-85678",
  storageBucket: "baitai1-85678.appspot.com",
  messagingSenderId: "475082567479",
  appId: "1:475082567479:web:5197e1d15cb5ed7426b4b2",
  measurementId: "G-ZYBX0NMBB1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const firestore = getFirestore(app);
const storage = getStorage(app);

export {storage};
