import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDjgYwZrgtEHc-k-mqMdAbzmu87IWCZs5E",
  authDomain: "projectmanagement-4a0f2.firebaseapp.com",
  projectId: "projectmanagement-4a0f2",
  storageBucket: "projectmanagement-4a0f2.appspot.com",
  messagingSenderId: "18193391940",
  appId: "1:18193391940:web:d7af9eadc54c0745dd3711",
};

firebase.initializeApp(firebaseConfig);
const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.Timestamp;
const projectStorage = firebase.storage();

export { projectAuth, projectFirestore, timestamp, projectStorage };
