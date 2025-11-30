// src/firebase/firebase.ts
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDH3A6l6YaI4VEnHGW988nEJQhnANLpQYc",
  authDomain: "calendar2-628e3.firebaseapp.com",
  projectId: "calendar2-628e3",
  storageBucket: "calendar2-628e3.firebasestorage.app",
  appId: "1:891540603726:android:99d49b301b96c9e145941f"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth = getAuth();

// Exportar la instancia de Firestore
export const db = getFirestore(app);

