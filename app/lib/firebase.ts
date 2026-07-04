import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
apiKey: "AIzaSyDrPHanGFC6klA6SIfRcj2UadcSfhMg3qs", authDomain: "intent-harshit.firebaseapp.com", projectId: "intent-harshit", storageBucket: "intent-harshit.firebasestorage.app", messagingSenderId: "284915181273", appId: "1:284915181273:web:62a01b2ad2105539b480c8", measurementId: "G-Z6WM73J82G"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);