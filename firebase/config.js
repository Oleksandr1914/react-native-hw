import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtEkx07iBrQ0ZTNc1vKrEPn6A-es4Asgw",
  authDomain: "react-native-hw-c244d.firebaseapp.com",
  projectId: "react-native-hw-c244d",
  storageBucket: "react-native-hw-c244d.appspot.com",
  messagingSenderId: "357275504036",
  appId: "1:357275504036:web:b300b82d533ba958854531",
  measurementId: "G-MJ29G0TL57",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
