import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    authDomain: "neurogrow-lite-f7cb9.firebaseapp.com",
    projectId: "neurogrow-lite-f7cb9",
    storageBucket: "neurogrow-lite-f7cb9.firebasestorage.app",
    messagingSenderId: "427711259224",
    appId: "1:427711259224:web:17dd57de9116fc6003a02d",
    measurementId: "G-YG6VV89K73"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
