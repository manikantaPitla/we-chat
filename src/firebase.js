import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "we-chat-9beb7.firebaseapp.com",
  projectId: "we-chat-9beb7",
  storageBucket: "we-chat-9beb7.appspot.com",
  messagingSenderId: "176167843330",
  appId: "1:176167843330:web:8d5ec9a903b1d0d539991b",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);
export const signOutUser = () => signOut(auth);
