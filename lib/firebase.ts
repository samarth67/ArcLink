import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIHN45TU-xhVLd3KczBP9S6HhuxixfAoc",
  authDomain: "arclink-6b2a0.firebaseapp.com",
  projectId: "arclink-6b2a0",
  storageBucket: "arclink-6b2a0.firebasestorage.app",
  messagingSenderId: "706856033184",
  appId: "1:706856033184:web:f3a0590a75c1460008a2c5",
  measurementId: "G-RW5DSM5S2D",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);