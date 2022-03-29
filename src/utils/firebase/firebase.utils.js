// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCGUu7iEuUIQLtITcuFhrcmRwpOy6HZquk",
  authDomain: "crwn-clothing-db-fcd85.firebaseapp.com",
  projectId: "crwn-clothing-db-fcd85",
  storageBucket: "crwn-clothing-db-fcd85.appspot.com",
  messagingSenderId: "842091819999",
  appId: "1:842091819999:web:f9302a84c16077b0a10a6a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) => {
  //See if there is an existing document referenced
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot);
  console.log(userSnapshot.exists());   
  
  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try{
      await setDoc(userDocRef, {
    displayName, email, createdAt
      })
    }catch(err) {
      console.log('error creating the user')
    }
  }
  return userDocRef; 
}