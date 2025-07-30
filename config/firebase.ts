import { initializeApp } from 'firebase/app';
import { initializeAuth, inMemoryPersistence, setPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBcXHwa5BJshwpQud8u94vbPx17eDM80Us",
  authDomain: "expense-tracker-f6a26.firebaseapp.com",
  projectId: "expense-tracker-f6a26",
  storageBucket: "expense-tracker-f6a26.firebasestorage.app",
  messagingSenderId: "570575185258",
  appId: "1:570575185258:web:e134dad825ef52e9883113"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with in-memory persistence
export const auth = initializeAuth(app);
setPersistence(auth, inMemoryPersistence);

// Initialize Firestore
export const firestore = getFirestore(app);