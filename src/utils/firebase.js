// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBXOA1QJLBJVOsF_EL1O-VR61pJ_nRV8Lc",
//   authDomain: "question-paper-generator-74f02.firebaseapp.com",
//   projectId: "question-paper-generator-74f02",
//   storageBucket: "question-paper-generator-74f02.appspot.com",
//   messagingSenderId: "765562632462",
//   appId: "1:765562632462:web:36d120dd1418c20cc8ff5f",
//   measurementId: "G-68C1RYW6MP"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAavd91ZSMZP0vRr8UUZWf4syQzlXusGLE",
  authDomain: "question-paper-201db.firebaseapp.com",
  projectId: "question-paper-201db",
  storageBucket: "question-paper-201db.appspot.com",
  messagingSenderId: "647110271708",
  appId: "1:647110271708:web:6ced54f18d7119d8f18a19"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(firebaseApp)

export {firebaseApp,db};