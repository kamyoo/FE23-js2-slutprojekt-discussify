import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMe09850eI5d3S_MZw8Rt9BTtSg4qb0rc",
  authDomain: "slutprojekt-js2-2b1f0.firebaseapp.com",
  databaseURL: "https://slutprojekt-js2-2b1f0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "slutprojekt-js2-2b1f0",
  storageBucket: "slutprojekt-js2-2b1f0.appspot.com",
  messagingSenderId: "1003067095805",
  appId: "1:1003067095805:web:a854bbf61459c0cb679c94",
  measurementId: "G-15E59VFZSL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {

//     const user = userCredential.user;

//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;

//   });

async function loginUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User logged in:", user);
    // Redirect to dashboard or perform other actions after login
  } catch (error) {
    console.error("Login failed:", error);
  }
}

export { loginUser }