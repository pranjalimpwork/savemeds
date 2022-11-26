// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQ3CDr70YYeoIxOZGO9i8oxitVVpiPriU",
  authDomain: "savemedicines.firebaseapp.com",
  projectId: "savemedicines",
  storageBucket: "savemedicines.appspot.com",
  messagingSenderId: "1012985070682",
  appId: "1:1012985070682:web:d5108faffa54a18d6f0463",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
