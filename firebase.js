import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBHMYWSqrC5UVAczqbX5soLG1WVRkFEAGk",
  authDomain: "assign-b0103.firebaseapp.com",
  projectId: "assign-b0103",
  storageBucket: "assign-b0103.appspot.com",
  messagingSenderId: "582085572101",
  appId: "1:582085572101:web:bea7da39cb35011e068e6c"
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getFirestore();
 const storage = getStorage();
 const auth = getAuth(app);
export {app, database,storage,auth}
