// Firebase deps
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";

var db
export const initializeFirebase = () => {
    // if (!firebase.apps.length) {
    initializeApp({
        apiKey: "AIzaSyBZCgErFx4wGEyLe-Ncpe2K1OBZ0BRdEJI",
        authDomain: "avatar-garments-console-70a14.firebaseapp.com",
        projectId: "avatar-garments-console-70a14",
        storageBucket: "avatar-garments-console-70a14.appspot.com",
        messagingSenderId: "1082034447236",
        appId: "1:1082034447236:web:c16d49873864ee9485f3d1"
    });
    db = getFirestore();
}

export default db;
