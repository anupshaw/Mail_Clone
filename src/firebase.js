import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";

//firebaseConfig is required to make connection with database
const firebaseConfig = {
  apiKey: "AIzaSyBpnN_0Zo-UPZGxq2OZqZHZls0iIbkGTzY",
  authDomain: "mailclone-7456e.firebaseapp.com",
  projectId: "mailclone-7456e",
  storageBucket: "mailclone-7456e.appspot.com",
  messagingSenderId: "141989993599",
  appId: "1:141989993599:web:9086e7d82d73a841b8f34a",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { db, auth, provider };
