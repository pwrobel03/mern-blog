// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-30ab3.firebaseapp.com",
    projectId: "mern-blog-30ab3",
    storageBucket: "mern-blog-30ab3.appspot.com",
    messagingSenderId: "624054440938",
    appId: "1:624054440938:web:ad0cab20ea990ab8e41893",
    measurementId: "G-R6VCXXR2XS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);