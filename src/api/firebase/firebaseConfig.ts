// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { Constants } from "../../constants/config";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Constants.FIREBASE_API_KEY,
  authDomain: "usedmarketzone.firebaseapp.com",
  projectId: "usedmarketzone",
  storageBucket: "usedmarketzone.appspot.com",
  messagingSenderId: "843770844397",
  appId: "1:843770844397:web:c84160dfadd56b6d91e8e4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);