import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {

};


// Initialize Firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth and Google Provider
export const auth = getAuth(app); // Firebase Auth instance
export const googleProvider = new GoogleAuthProvider(); // Google Auth provider

export default app;
