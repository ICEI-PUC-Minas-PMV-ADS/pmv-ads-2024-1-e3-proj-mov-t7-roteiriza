import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = initializeApp( {
  apiKey: "AIzaSyBp3ZpGkWyTT6VpAkPCuO6PFOYBctwY1Qc",
  authDomain: "roteiriza-teste-db.firebaseapp.com",
  projectId: "roteiriza-teste-db",
  storageBucket: "roteiriza-teste-db.appspot.com",
  messagingSenderId: "722469930133",
  appId: "1:722469930133:web:994399f99e1b3066a3c79c"
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export  default firebaseConfig