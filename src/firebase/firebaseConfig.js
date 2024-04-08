// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBplfYqsx1ECZpkhAEgVJPsddLIz6KeLls",
  authDomain: "clinsys-v1.firebaseapp.com",
  databaseURL: "https://clinsys-v1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "clinsys-v1",
  storageBucket: "clinsys-v1.appspot.com",
  messagingSenderId: "636636586096",
  appId: "1:636636586096:web:e737fc29acc1a2473b94b5",
  measurementId: "G-6YG43878R5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);


export default database;