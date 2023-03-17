// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// };

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

export const auth = getAuth(app);
