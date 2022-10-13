import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlvul6f6fznLI9T8WVXg9B0cAH-NQPj48",
  authDomain: "house-marketplace-app-e21ae.firebaseapp.com",
  projectId: "house-marketplace-app-e21ae",
  storageBucket: "house-marketplace-app-e21ae.appspot.com",
  messagingSenderId: "409294778771",
  appId: "1:409294778771:web:1d3185efb858f2f34af866",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
