// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgbmLRU03zmOpG67Y--deJRK-GNsiOeWo",
  authDomain: "chase-bus.firebaseapp.com",
  projectId: "chase-bus",
  storageBucket: "chase-bus.firebasestorage.app",
  messagingSenderId: "771058330782",
  appId: "1:771058330782:web:5e79596f5513878789df8f",
  measurementId: "G-3MLQPE38RJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, auth, analytics };