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
  apiKey: "AIzaSyARu3es8FJTa1M7KdIbowB1qqOCWTKeJJA",
  authDomain: "xoiche-c6469.firebaseapp.com",
  projectId: "xoiche-c6469",
  storageBucket: "xoiche-c6469.firebasestorage.app",
  messagingSenderId: "854421162779",
  appId: "1:854421162779:web:e70b22b58049039e05e1be",
  measurementId: "G-3SC0E704RF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const firestore = getFirestore(app);
const storage = getStorage(app);
export {storage};
