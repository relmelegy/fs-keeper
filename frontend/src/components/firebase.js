import { getAuth, GoogleAuthProvider } from 'firebase/auth'; 
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjT3-P3D-2msfATIuVQe33td-dQ63WnHU",
  authDomain: "fs-keeper.firebaseapp.com",
  projectId: "fs-keeper",
  storageBucket: "fs-keeper.appspot.com",
  messagingSenderId: "398896899037",
  appId: "1:398896899037:web:2b72932a309b12eedecc34",
  measurementId: "G-D917ET2XLC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Export both getAuth and firebase
export { auth, app, analytics, GoogleAuthProvider};