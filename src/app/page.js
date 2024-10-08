'use client'
import Image from 'next/image';
import DataList from '../../component/DataList';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Auth
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { database } from '../../firebase';
import Link from 'next/link';
import Narbar from './component/Narbar';
import WelcomeCard from './component/WelcomeCard';
import CheckInSlider from './component/CheckInSlider';

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Loading state to ensure redirection occurs after checking

  useEffect(() => {
    const auth = getAuth();
    // Check if user is authenticated
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect to login page if user is not logged in
        router.push('/login');
      } else {
        setLoading(false); // User is authenticated, stop the loading state
      }
    });
  }, [router]);

  // Show a loading indicator or nothing until authentication check is done
  if (loading) {
    return <div>Loading...</div>; // You can customize this loading screen
  }

  return (
    <div>
      <Narbar />
      <WelcomeCard />
      <CheckInSlider />
     
    </div>
  );
}
