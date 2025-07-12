import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import auth, { googleProvider } from "../firebase/firebaseConfig"
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const registerWithEmail = async(email,password)=>{
    const userCredential = await createUserWithEmailAndPassword(auth,email,password);
    await sendEmailVerification(userCredential.user)

    await axios.post(`${baseURL}/api/user/register`,{
        uid:userCredential.user.uid,
        email:userCredential.user.email
    })
    


    return userCredential
}

export const loginWithEmail = async(email,password)=>{
    const userCredential = await signInWithEmailAndPassword(auth,email,password)
    
    await axios.post(`${baseURL}/api/user/register`, {
    uid: userCredential.user.uid,
    email: userCredential.user.email,
  });

    return userCredential
}


export const signinWithGoogle = async()=>{
    const result = await signInWithPopup(auth,googleProvider)

    await axios.post(`${baseURL}/api/user/register`, {
    uid: result.user.uid,
    email: result.user.email,
  });

    return result
}


export const logout = async()=>{
    await signOut(auth)
}