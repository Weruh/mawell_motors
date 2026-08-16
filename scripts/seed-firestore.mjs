import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtf7OBBbrIc1c9YLLkUR8Du_70GlqYN2U",
  authDomain: "mawel-motors.firebaseapp.com",
  projectId: "mawel-motors",
  storageBucket: "mawel-motors.firebasestorage.app",
  messagingSenderId: "927744072237",
  appId: "1:927744072237:web:6bd87ad4c57e77097e76a4",
  measurementId: "G-PTCF1YNSF4",
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const { cars } = JSON.parse(readFileSync(join(__dirname, "..", "db.json"), "utf-8"));

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const carsCollection = collection(db, "cars");

for (const { id, ...car } of cars) {
  const docRef = await addDoc(carsCollection, car);
  console.log(`Seeded "${car.name}" (was db.json id ${id}) -> Firestore id ${docRef.id}`);
}

console.log(`Done. Seeded ${cars.length} cars.`);
process.exit(0);
