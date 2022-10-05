
import { initializeApp } from "firebase/app";
import { getAuth , signInWithPopup, signInWithRedirect , GoogleAuthProvider } from 'firebase/auth'
import {getFirestore , doc , getDoc , setDoc} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCswu7fGYTSeX9iDMcjfVv0J29vsRPnxSo",
  authDomain: "crwn-clothing-db-45966.firebaseapp.com",
  projectId: "crwn-clothing-db-45966",
  storageBucket: "crwn-clothing-db-45966.appspot.com",
  messagingSenderId: "759905486735",
  appId: "1:759905486735:web:c966c58968bddb372aedfa"
};


const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt : "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) =>{
  const userDocRef = doc(db , 'user', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  if(!userSnapshot.exists()){
    const {displayName , email } = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt
      });

    }catch(error){
      console.log('error creating rhe user',error.message);
    }
  }
  return userDocRef;
}