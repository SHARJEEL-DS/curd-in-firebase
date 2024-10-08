import React, { useEffect, useState } from 'react';
import { FaBell, FaExclamationTriangle } from 'react-icons/fa'; // Importing icons
import { auth } from '../../../firebase'; // Import Firebase auth from config
import { onAuthStateChanged } from 'firebase/auth'; // Firebase auth listener

const Navbar = () => {
  const [userInitial, setUserInitial] = useState(''); // State to hold the first letter

  // Use useEffect to track the logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, get their name or email and extract the first letter
        const displayName = user.displayName || user.email; // Use displayName or email
        setUserInitial(displayName.charAt(0).toUpperCase()); // Extract first letter and make it uppercase
      } else {
        setUserInitial(''); // No user signed in
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Logo or Icon */}
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-purple-600">Logo</span>
          </div>

          {/* Right Section: Feedback Button, Notification, and Alert Icons */}
          <div className="items-center hidden space-x-4 md:flex">
            <button className="px-4 py-2 text-white transition duration-300 ease-in-out bg-purple-600 rounded-lg hover:bg-purple-700">
              Feedback
            </button>

            <button className="p-2 transition duration-300 ease-in-out rounded-lg hover:bg-gray-300">
              <FaBell size={20} /> {/* Notification Bell Icon */}
            </button>

            <button className="p-2 transition duration-300 ease-in-out rounded-lg hover:bg-gray-300">
              <FaExclamationTriangle size={20} /> {/* Alert Icon */}
            </button>

            {/* Display first letter of user */}
            <button className="flex items-center justify-center w-10 h-10 text-white bg-purple-600 rounded-full">
              {userInitial || 'U'} {/* Default to 'U' if userInitial is empty */}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button className="text-gray-600 hover:text-black focus:outline-none focus:text-black">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
