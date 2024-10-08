'use client'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { database } from '../../../firebase';
import {useRouter} from 'next/navigation'

import Link from 'next/link';
import { auth,getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const router = useRouter();
    const auth = getAuth();

    const googleSignIn =  () => {
      
      try{
      const provider = new GoogleAuthProvider();
       signInWithRedirect(auth, provider);
       sessionStorage.setItem("username", auth);
      router.push('/');
      } catch (error) {
        alert("Something went wrong with Signing In" + error);
      }
    };
    

    const saveData = async (e) => {
      e.preventDefault();
      
      try {
          await signInWithEmailAndPassword(auth, email, password)
          
          sessionStorage.setItem("username", email);
          router.push('/');
        } 
        catch (error) {
          alert("Something went wrong with Signing In" + error);
        }
    }





    
  return (
    <div className="h-screen pt-5 bg-gray-50">kjl
      <p classNameName='mb-4 text-5xl font-bold text-center'> </p>
    <div className="flex max-w-sm mx-auto my-auto overflow-hidden rounded-lg shadow-lg bg-slate-300 lg:max-w-4xl">
          <div className="hidden bg-cover lg:block lg:w-1/2" style={{"background-image":"url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80"}}></div>
          <div className="w-full p-8 lg:w-1/2">
              <h2 className="text-2xl font-semibold text-center text-gray-700">Brand</h2>
              <p className="text-xl text-center text-gray-600">Welcome back!</p>
              <a href="#" className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100">
                  
              </a>
              
              <div className="mt-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700">Email Address</label>
                  <input className="block w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded appearance-none focus:outline-none focus:shadow-outline" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="mt-4">
                  <div className="flex justify-between">
                      <label className="block mb-2 text-sm font-bold text-gray-700">Password</label>
                      <a href="#" className="text-xs text-gray-500">Forget Password?</a>
                  </div>
                  <input className="block w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded appearance-none focus:outline-none focus:shadow-outline" type="password" value={password}
              onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className="mt-8">
                  <button className="w-full px-4 py-2 font-bold text-white bg-gray-700 rounded hover:bg-gray-600" onClick={saveData}>Login</button>
              </div>
              <div className="flex items-center justify-between mt-4">
                  <span className="w-1/5 border-b md:w-1/4"></span>
                  <Link href="/register" className="text-xs text-gray-500 uppercase">or sign up</Link>
                  <span className="w-1/5 border-b md:w-1/4"></span>
              </div>
          </div>
      </div>
  </div>
  )
}

export default Login
