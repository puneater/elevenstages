import fs from 'fs/promises'; // to read files
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

async function uploadData() {
    try {
        const fileData = await fs.readFile('data.json', 'utf-8');
        const rows = JSON.parse(fileData);

        for (const row of rows) {
            const docRef = await addDoc(collection(db, "child_dev_stage"), {
                id_age: row.id_age,
                cognitive: row.cognitive,
                social: row.social,
                motor: row.motor
            });
            console.log(`Document written with ID: ${docRef.id} for id_age: ${row.id_age}`);
        }
        console.log("All documents added successfully!");
    } catch (error) {
        console.error("Error uploading documents: ", error);
    }
}

uploadData();
