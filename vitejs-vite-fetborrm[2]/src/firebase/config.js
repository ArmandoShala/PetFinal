// Importa las funciones necesarias de Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCJ9x_Uqln18LnPhGr5czcrmphxSyskNxQ",
  authDomain: "petcare-85310.firebaseapp.com",
  projectId: "petcare-85310",
  storageBucket: "petcare-85310.firebasestorage.app",
  messagingSenderId: "571411959871",
  appId: "1:571411959871:web:27a980c7d0f6564fa9a88a",
  measurementId: "G-KCZ0SQ0PX5"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta Firestore y Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
