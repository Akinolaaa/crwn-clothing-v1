// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged } from 'firebase/auth';
import { 
  getFirestore, 
  doc, getDoc, 
  setDoc, collection, 
  writeBatch, query, getDocs } from 'firebase/firestore';

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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async(collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  // Transaction is a word that represents a successful unit of work to a db
  const batch = writeBatch(db);
  objectsToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object)
  });
  await batch.commit();
  console.log('done adding collection x docs');
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const categoriesArray = querySnapshot.docs.map(docSnapshot => docSnapshot.data())
  
  /* .reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {}) */
  return categoriesArray;
}


export const createUserDocumentFromAuth = async (
  userAuth, additionalInformation={}) => {
  if (!userAuth) {
    return;
  }
  const userDocRef = doc(db, 'users', userAuth.uid);
  //console.log(userDocRef);
  
  const userSnapshot = await getDoc(userDocRef)
  //console.log(userSnapshot);
  //See if there is an existing document referenced
  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try{
      await setDoc(userDocRef, {
        displayName, email, createdAt, ...additionalInformation
      })
    }catch(err) {
      console.log('error creating the user')
    }
  }
  return userDocRef; 
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback)
}