
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDlHk0yQ1fm2N0dNnWDZag49XCaqZnX9pU",
  authDomain: "hassaan-blog.firebaseapp.com",
  projectId: "hassaan-blog",
  storageBucket: "hassaan-blog.appspot.com",
  messagingSenderId: "74064392632",
  appId: "1:74064392632:web:a60daf3e6649e2d8a7df4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
