import { initializeApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC-Tz-volbh5B9ajv_3IlI8kUMbKF2-8zA",
  authDomain: "teste-auth-84f28.firebaseapp.com",
  projectId: "teste-auth-84f28",
  storageBucket: "teste-auth-84f28.appspot.com",
  messagingSenderId: "508782609622",
  appId: "1:508782609622:web:6b36e2cf364252d67af577"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Obtenha uma instância do Firestore
const firestore = getFirestore(app);

export { app, firestore };
