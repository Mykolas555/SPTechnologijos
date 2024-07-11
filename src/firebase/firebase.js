// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSIdYgxqcKL5I3GAvHvTSQmCUTTuCdlCo",
  authDomain: "skysciuperpilimo.firebaseapp.com",
  projectId: "skysciuperpilimo",
  storageBucket: "skysciuperpilimo.appspot.com",
  messagingSenderId: "565085968618",
  appId: "1:565085968618:web:f3376b72bbf3a55f311f93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);
const auth = getAuth(app);
export const imageDb = getStorage(app)
const db = getFirestore(app);
const storage = getStorage(app);

export { firestore, auth, onAuthStateChanged, db, storage};
