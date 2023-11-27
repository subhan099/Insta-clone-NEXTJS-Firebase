// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzUevGnhB2yjmo3eFoi-yT1lZHk_5-n58",
  authDomain: "instagram-clone-b8ae6.firebaseapp.com",
  projectId: "instagram-clone-b8ae6",
  storageBucket: "instagram-clone-b8ae6.appspot.com",
  messagingSenderId: "223379145805",
  appId: "1:223379145805:web:de362b2bd0f6405299c804",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
