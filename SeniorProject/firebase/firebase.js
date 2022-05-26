import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage, ref } from "firebase/storage"

const firebaseConfig ={
  apiKey: "AIzaSyDYN1UYiLSWWhBjV_cHuUEL6EdzT6R_QE0",
  authDomain: "popflash-f94e1.firebaseapp.com",
  projectId: "popflash-f94e1",
  storageBucket: "popflash-f94e1.appspot.com",
  messagingSenderId: "979061148982",
  appId: "1:979061148982:web:5d18625ac50c2005a57797",
  measurementId: "G-KG539QNHPQ"
};
const app = initializeApp(firebaseConfig)
const projectAuth = getAuth(app)
const projectFirestore = getFirestore(app)
const projectStorage = getStorage(app)

export { app, projectAuth, projectFirestore, projectStorage, ref }

