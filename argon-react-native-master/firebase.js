// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };