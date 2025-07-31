import { initializeApp } from 'firebase/app';
import { initializeAuth, inMemoryPersistence, setPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration object


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with in-memory persistence
export const auth = initializeAuth(app);
setPersistence(auth, inMemoryPersistence);

// Initialize Firestore
export const firestore = getFirestore(app);
