'use client'
import  Image from 'next/image'
// import { collection } from 'firebase/firestore';
// import DataList from '../../component/DataList'
import React, { useEffect, useState } from 'react'
// import {useRouter}  from 'next/router'
import { useRouter } from 'next/navigation'
import { collection, deleteDoc, addDoc, doc, getDocs } from 'firebase/firestore';
import { database , storage} from '../../../firebase';
import Link from 'next/link'

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const page = () => {
   
    const [name, setName] = useState("");
    const [marks, setMarks] = useState("");
    const [imageFile, setImageFile] = useState(null);
const [imageUrl, setImageUrl] = useState('');
    const router = useRouter();
  
    const saveData = async (e) => {
        e.preventDefault();
      
        if (imageFile) {
          const storageRef = ref(storage, `studentImages/${imageFile.name}`);
          await uploadBytesResumable(storageRef, imageFile).then(async () => {
            const imageUrl = await getDownloadURL(storageRef);
            await addDoc(collection(database, 'students'), {
              name: name,
              marks: marks,
              imageUrl: imageUrl, // Save the image URL
            })
            .then(() => {
              alert('Data Saved');
              setName('');
              setMarks('');
              setImageFile(null);
              setImageUrl('');
            })
            .catch((err) => {
              console.log(err);
            });
          });
        }
      };
    return (
        <div className='flex items-center justify-center h-screen flex-col'>
          <form className='bg-gray-400 w-4/12 flex items-center justify-center flex-col gap-4 py-5 px-10'>
            <h2 className='font-bold text-xl '>Add Details</h2>
            <input 
              type="text" 
              placeholder='Enter Name' 
              className='w-full py-1 px-4 border-none outline-none' 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
  
            <input 
              type="number" 
              placeholder='Enter Marks' 
              className='w-full py-1 px-4 border-none outline-none' 
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
            />
            <input required style={{ display: "none" }} type="file" id="file"  onChange={(e) => {
                const file = e.target.files[0];
                setImageFile(file);
              }} />
            <label htmlFor="file">
              <img src="./favicon.ico" className='w-10 h-10'/>
              <span>Add an avatar</span>
            </label>
            
            <button 
              type='submit'
              className='bg-blue-500 text-white w-full p-2 rounded-full'
              onClick={saveData}
            >Insert</button>
          </form>
  
          <button
            className='underline text-blue-400'
            onClick={() => router.push('/')}
          >Back</button>
        </div>
    )
  }
  
export default page
