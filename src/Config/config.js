import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/storage";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = getFirestore(app);

export { firebase, auth, firebaseConfig, app, db };
