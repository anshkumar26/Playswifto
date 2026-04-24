import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { googleProvider } from "firebase/auth";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCuxANfiSQRtWnPUqlZeMKNMh8u0JdzYmE",
  authDomain: "playswifto-732ee.firebaseapp.com",
  projectId: "playswifto-732ee",
  storageBucket: "playswifto-732ee.firebasestorage.app",
  messagingSenderId: "810854487309",
  appId: "1:810854487309:web:11d32c783f66aba2c58c44",
  measurementId: "G-30D2KPT4D3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// const analytics = getAnalytics(app);

export {auth, googleProvider};