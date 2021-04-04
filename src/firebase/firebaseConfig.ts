import firebase from "firebase/app";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAxlko-uth3y1uBdKka6_vjBvrQqD0aEc8",
  authDomain: "reddit-clone-images.firebaseapp.com",
  projectId: "reddit-clone-images",
  storageBucket: "reddit-clone-images.appspot.com",
  messagingSenderId: "1054587092080",
  appId: "1:1054587092080:web:31fd7ec9c1f39fe55e08b5",
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
