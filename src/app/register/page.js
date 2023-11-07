'use client'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { database } from '../../../firebase';
import {useRouter} from 'next/navigation'
import Link from 'next/link';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const page = () => {
 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const router = useRouter();
    const auth = getAuth();
    
    const saveData = async (e) => {
      e.preventDefault();
      
      try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password)
          const user = userCredential.user;
          
          // Save this user in firestore
          await setDoc(doc(database, "users", user.uid), {
            "email":email,              
          })
          alert('user registered successfully');
          setEmail('');
          setPassword('');
          
          }
          catch (error) {
              console.log("Something went wrong with registration: " + error);
          }
    }
  
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
          <form className='flex flex-col items-center justify-center w-4/12 gap-4 px-10 py-5 bg-gray-400'>
            <h2 className='text-xl font-bold '>Registration</h2>
            <input 
              type="email" 
              placeholder='Enter Email' 
              className='w-full px-4 py-1 border-none outline-none' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
  
            <input 
              type="password" 
              placeholder='Enter Password' 
              className='w-full px-4 py-1 border-none outline-none' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
  
            <button 
              type='submit'
              className='w-full p-2 text-white bg-blue-500 rounded-full'
              onClick={saveData}
            >Insert</button>
  
            ALready Have an account ? 
            <Link href={"/login"}>Login</Link>
          </form>
  
        </div>
    )
  }
  

export default page
