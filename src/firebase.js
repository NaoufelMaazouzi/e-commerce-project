
import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCOn_779NOTzxzWkoTxTvYezcgoRCF5NJQ",
    authDomain: "e-commerce-project-1f484.firebaseapp.com",
    databaseURL: "https://e-commerce-project-1f484-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "e-commerce-project-1f484",
    storageBucket: "e-commerce-project-1f484.appspot.com",
    messagingSenderId: "4209990291",
    appId: "1:4209990291:web:78823716b0f04ff14bcb66",
    measurementId: "G-FRF2DBEM0Q"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth, firebase };