import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUVIsyJQg2gZXRq4gdHs2eEfnxF4B9RIg",
  authDomain: "login-73322.firebaseapp.com",
  projectId: "login-73322",
  storageBucket: "login-73322.appspot.com", // Fixed typo
  messagingSenderId: "363951766172",
  appId: "1:363951766172:web:0f256189fcf9f828c24b59",
  measurementId: "G-VFVJ2EDYRV",
};


// Initialize Firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth and Google Provider
export const auth = getAuth(app); // Firebase Auth instance
export const googleProvider = new GoogleAuthProvider(); // Google Auth provider

export default app;
