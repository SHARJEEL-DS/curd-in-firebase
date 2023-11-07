import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDGnTntNFN1Fb-qSZJ99c_-BvcUNfETFUo",
  authDomain: "ffff-cbe8f.firebaseapp.com",
  projectId: "ffff-cbe8f",
  storageBucket: "ffff-cbe8f.appspot.com",
  messagingSenderId: "100646740849",
  appId: "1:100646740849:web:23e9a24839339788798cd0"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getFirestore();
 const storage = getStorage();

export {app, database,storage}
