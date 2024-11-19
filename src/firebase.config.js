// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPJ3jefwHqsGopEGpEUGLajuXDXQEdyrE",
  authDomain: "fir-lesson-3d0dc.firebaseapp.com",
  projectId: "fir-lesson-3d0dc",
  storageBucket: "fir-lesson-3d0dc.firebasestorage.app",
  messagingSenderId: "255662572894",
  appId: "1:255662572894:web:84407dc23f4cf78271fbcf",
  measurementId: "G-ZN7Y1DM53Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

export const singInWithGoogle = () => {
  signInWithPopup(auth, googleProvider);
};

export const singInWithGitHub = () => {
  // signInWithPopup(auth, gitHubProvider);
  // signInWithRedirect(auth, gitHubProvider);

  signInWithPopup(auth, gitHubProvider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      console.log(user ,"github user");
      
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
    });
};

const analytics = getAnalytics(app);
