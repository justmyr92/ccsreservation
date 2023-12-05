// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCfiIO46DQEH1PpyvBlcCNImTlXxe2nCZk",
    authDomain: "ccsreservation-76790.firebaseapp.com",
    projectId: "ccsreservation-76790",
    storageBucket: "ccsreservation-76790.appspot.com",
    messagingSenderId: "627111735487",
    appId: "1:627111735487:web:aef3c0fc520f38f0ed960a",
    measurementId: "G-H2TJDMY00M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
