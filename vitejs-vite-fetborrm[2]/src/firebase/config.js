// Importa las funciones necesarias de Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// La configuración se lee desde variables de entorno (archivo .env en la raíz del proyecto).
// Copia .env.example a .env y pega los valores desde:
// Consola de Firebase > Configuración del proyecto > General > Tus apps > Configuración del SDK
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error(
    'Falta la configuración de Firebase: copia .env.example a .env, completa los valores y reinicia el servidor de desarrollo (ver README, sección "Configuración de Firebase").'
  );
}

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta Firestore y Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
