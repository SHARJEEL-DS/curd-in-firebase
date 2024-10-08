'use client'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { database } from '../../../firebase';
import {useRouter} from 'next/navigation'
import Link from 'next/link';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
const Page = () => {

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
    <div class=" h-screen bg-gray-50 pt-5 ">
      <p className='mb-4 text-5xl font-bold text-center'>SignUp </p>
    <div class="flex bg-slate-300  rounded-lg shadow-lg overflow-hidden mx-auto my-auto max-w-sm lg:max-w-4xl">
          <div class="hidden lg:block lg:w-1/2 bg-cover" style={{"background-image":"url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80"}}></div>
          <div class="w-full p-8 lg:w-1/2">
              <h2 class="text-2xl font-semibold text-gray-700 text-center">Brand</h2>
              <p class="text-xl text-gray-600 text-center">Welcome back!</p>
            
              <div class="mt-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2 ">Email Address</label>
                  <input class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div class="mt-4">
                  <div class="flex justify-between">
                      <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                      <a href="#" class="text-xs text-gray-500">Forget Password?</a>
                  </div>
                  <input class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password"value={password}
              onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div class="mt-8">
                  <button class="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600" onClick={saveData}>Sign Up</button>
              </div>
              <div class="mt-4 flex items-center justify-between">
                  <span class="border-b w-1/5 md:w-1/4"></span>
                  <Link href="/login" class="text-xs text-gray-500 uppercase">or Login</Link>
                  <span class="border-b w-1/5 md:w-1/4"></span>
              </div>
          </div>
      </div>
  </div>
  )
}

export default Page
