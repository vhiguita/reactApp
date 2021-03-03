import firebase from 'firebase/app';
import '@firebase/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyBuXBuu67GjD_q8A8XZ4dUW6F1xc8-CY_A",
    authDomain: "cart-store.firebaseapp.com",
    projectId: "cart-store",
    storageBucket: "cart-store.appspot.com",
    messagingSenderId: "162106487637",
    appId: "1:162106487637:web:537021feb7bb6fe642b5dc",
    measurementId: "G-M8HL83NNMF"
 });

export function getFirebase(){
  return app;
}

export function getFirestore(){
  return firebase.firestore(app);
}
