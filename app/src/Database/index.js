import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import 'firebase/auth'
import 'firebase/compat/database'
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDBj6C-8noKmZlZ9yklakWlW0F4YlFfIYE",
  authDomain: "blood-donation-system-63490.firebaseapp.com",
  databaseURL: "https://blood-donation-system-63490-default-rtdb.firebaseio.com",
  projectId: "blood-donation-system-63490",
  storageBucket: "blood-donation-system-63490.appspot.com",
  messagingSenderId: "900152837185",
  appId: "1:900152837185:web:e537424d2d2456165af2c0",
  measurementId: "G-9MRJRLKDLZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
