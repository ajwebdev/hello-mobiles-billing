import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCaRLMDdgJG6yjRl4onIGvLwQ13-8Jexns",
  authDomain: "hello-mobile-stock.firebaseapp.com",
  databaseURL: "https://hello-mobile-stock.firebaseio.com",
  projectId: "hello-mobile-stock",
  storageBucket: "hello-mobile-stock.appspot.com",
  messagingSenderId: "1087924006127",
  appId: "1:1087924006127:web:58d64eb98821096ed63f1a",
  measurementId: "G-0HHTBGD7QJ",
};
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

export default firebase