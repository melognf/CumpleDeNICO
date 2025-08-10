// Usá tu configuración real que copiaste desde Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCGWKZtlbo-fMdzosfFERoDgM3Lx5euh5g",
  authDomain: "invitacionweb-957e9.firebaseapp.com",
  projectId: "invitacionweb-957e9",
  storageBucket: "invitacionweb-957e9.firebasestorage.app",
  messagingSenderId: "681307607037",
  appId: "1:681307607037:web:964009c966df77f9a21394"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
