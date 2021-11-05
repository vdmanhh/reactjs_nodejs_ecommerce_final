import firebase from "firebase/app";
import "firebase/auth";
// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBSh8RFfGjCQrZCBY3Bd5IoAsR4pxvFIH8",
    authDomain: "ecommerce-6cc2a.firebaseapp.com",
    projectId: "ecommerce-6cc2a",
    storageBucket: "ecommerce-6cc2a.appspot.com",
    messagingSenderId: "944163807232",
    appId: "1:944163807232:web:6db28c9f8e3ed2b19178e5",
    measurementId: "G-NBTHFSSPHR"
};
// initialize firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// export
// export default firebase;
export const ggProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
