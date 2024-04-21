import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC3T5Uqo4WwmygkIvYiCv-5RdESGtkyr8E",
  authDomain: "teste-bbc13.firebaseapp.com",
  projectId: "teste-bbc13",
  storageBucket: "teste-bbc13.appspot.com",
  messagingSenderId: "662570204489",
  appId: "1:662570204489:web:24cd11d3f40fd6a12aae98"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase}; 
