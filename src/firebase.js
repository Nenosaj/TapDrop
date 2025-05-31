import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";




const firebaseConfig = {
  apiKey: "AIzaSyBHhYj4pQ6wWYbLFuSa80yJ5PBHGlgMJ-Q",
  authDomain: "water-vendo-gcash.firebaseapp.com",
  databaseURL: "https://water-vendo-gcash-default-rtdb.firebaseio.com/",
  projectId: "water-vendo-gcash",
  storageBucket: "water-vendo-gcash.firebasestorage.app",
  messagingSenderId: "353067031897",
  appId: "1:353067031897:web:ffccba6656b41057434048",
  measurementId: "G-6F8HE4SG35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const firedb = getFirestore(app);
const auth = getAuth(app);


export { database, firedb, auth };
