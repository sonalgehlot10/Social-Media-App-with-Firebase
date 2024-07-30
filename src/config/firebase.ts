// Import the functions you need from the SDKs you need
// import exp from "constants";
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8bFkMdKJAZW0fwetyno7RtC_7kwt-2_E",
  authDomain: "social-media-app-e5f82.firebaseapp.com",
  projectId: "social-media-app-e5f82",
  storageBucket: "social-media-app-e5f82.appspot.com",
  messagingSenderId: "415611081283",
  appId: "1:415611081283:web:cb6d98580c3bda545a3af6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
