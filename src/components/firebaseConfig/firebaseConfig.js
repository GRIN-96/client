// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxHX09vQ5gNJ49hoythpvcCrGzxn22rmU",
  authDomain: "test-project-c773d.firebaseapp.com",
  projectId: "test-project-c773d",
  storageBucket: "test-project-c773d.appspot.com",
  messagingSenderId: "1090331519126",
  appId: "1:1090331519126:web:da4c2e5d9850789f3cfab7",
  measurementId: "G-L55YRM47T8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default getFirestore(app);
