import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "we-chat-dev.firebaseapp.com",
  projectId: "we-chat-dev",
  storageBucket: "we-chat-dev.appspot.com",
  messagingSenderId: "439711520823",
  appId: "1:439711520823:web:2612defb266ac8285f87b2",
  measurementId: "G-4SHZ13QX10",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);
export const signOutUser = () => signOut(auth);
