import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtf7OBBbrIc1c9YLLkUR8Du_70GlqYN2U",
  authDomain: "mawel-motors.firebaseapp.com",
  projectId: "mawel-motors",
  storageBucket: "mawel-motors.firebasestorage.app",
  messagingSenderId: "927744072237",
  appId: "1:927744072237:web:6bd87ad4c57e77097e76a4",
  measurementId: "G-PTCF1YNSF4",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
