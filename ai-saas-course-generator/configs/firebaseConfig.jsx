// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-course-generator-72958.firebaseapp.com",
  projectId: "ai-course-generator-72958",
  storageBucket: "ai-course-generator-72958.appspot.com",
  messagingSenderId: "641827111686",
  appId: "1:641827111686:web:495d65f4291069b5721487",
  measurementId: "G-4ZJWLG28YB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)