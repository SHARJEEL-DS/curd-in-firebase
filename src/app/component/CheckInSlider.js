import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaBars } from 'react-icons/fa'; // Menu icon from react-icons
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { database, storage, auth } from '../../../firebase'; // Import auth from Firebase config
import { onAuthStateChanged } from 'firebase/auth'; // Import Firebase auth state listener
import Link from 'next/link';

const CheckInSlider = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [checkIns, setCheckIns] = useState([]); // Stores all check-in data
  const [owner, setOwner] = useState(''); // Stores the owner's name

  // Form fields for CheckIn
  const [title, setTitle] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [rooms, setRooms] = useState('');
  const [guests, setGuests] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [image, setImage] = useState(null); // For image upload
  const [imageUrl, setImageUrl] = useState('');
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

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Fetch CheckIns from Firestore
  const fetchCheckIns = async () => {
    try {
      const querySnapshot = await getDocs(collection(database, 'checkIns'));
      const fetchedCheckIns = querySnapshot.docs.map(doc => doc.data());
      setCheckIns(fetchedCheckIns);
    } catch (error) {
      console.error("Error fetching check-ins:", error);
    }
  };

  // Handle image upload
  const handleImageUpload = async () => {
    if (image) {
      const storageRef = ref(storage, `checkins/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          null,
          (error) => reject(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
              resolve(downloadURL);
            });
          }
        );
      });
    }
    return null;
  };

  // Add CheckIn to Firestore
  const handleAddCheckIn = async () => {
    const uploadedImageUrl = await handleImageUpload();

    const newCheckIn = {
      title,
      bookingId,
      rooms,
      guests,
      bookingDate,
      imageUrl: uploadedImageUrl,
      owner, // Add the owner's name or email
    };

    await addDoc(collection(database, 'checkIns'), newCheckIn);

    // Fetch the updated CheckIns
    fetchCheckIns();
    handleCloseDetailsModal();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenDetailsModal = () => {
    setIsModalOpen(false); // Close the first modal
    setIsDetailsModalOpen(true); // Open the second modal
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };

  // Use useEffect to track the logged-in user and fetch check-ins
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, set the owner's name (or email) from user object
        setOwner(user.displayName || user.email);
      } else {
        setOwner('');
      }
    });

    // Fetch check-ins when the component mounts
    fetchCheckIns();

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="relative p-4">
      <h2 className="mb-4 text-2xl font-bold">Added CheckIns</h2>
      {/* Menu Icon Button */}
      <button
        onClick={handleOpenModal}
        className="absolute top-0 right-0 p-2 mt-4 mr-4 bg-gray-200 rounded-full hover:bg-gray-300"
      >
        <FaBars size={24} />
      </button>

      {/* Slider */}
      <Slider {...settings}>
        {checkIns.map((checkIn, index) => (
          <div key={index} className="p-4">
            <div className="overflow-hidden bg-white rounded-lg shadow-lg">
              <img
                src={checkIn.imageUrl || 'https://via.placeholder.com/300'}
                alt={`CheckIn ${index + 1}`}
                className="object-cover w-[390px] h-48 rounded-lg"
              />
              <div className="p-4">
                <h3 className="text-2xl font-semibold">{checkIn.title}</h3>
                <p className="text-[13px] text-gray-500 mt-2">Date: {checkIn.bookingDate}</p>
                <div className="flex items-center flex-1 mt-2">
                <button className="flex items-center justify-center w-10 h-10 text-white bg-purple-600 rounded-full">
                {userInitial || 'U'} {/* Default to 'U' if userInitial is empty */}
              </button>
                  <p className="ml-4 mt-2 text-[16px] text-gray-500 font-bold">Owner: {checkIn.owner}</p>
                </div>
              </div>
              <div className="absolute px-3 py-1 text-sm text-white bg-purple-600 rounded-full top-2 right-2">
                Checked In
              </div>
            </div>
          </div>
        ))}
      </Slider>


      {/* First Modal - Add Check In */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg w-96">
            <h2 className="mb-4 text-xl font-bold">Add Check In</h2>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="p-4 text-center border-2 border-gray-300 border-dashed rounded-lg">
              <input type="file" onChange={e => setImage(e.target.files[0])} />
              <p className="text-sm text-gray-500">Support for a single or bulk upload.</p>
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={handleCloseModal} className="px-4 py-2 mr-2 bg-gray-200 rounded">
                Cancel
              </button>
              <button onClick={handleOpenDetailsModal} className="px-4 py-2 text-white bg-purple-600 rounded">
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Second Modal - Details (Rooms, Guests, etc.) */}
      {isDetailsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg w-[500px]">
            <h2 className="mb-4 text-xl font-bold">Detail</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-bold">Booking ID</label>
                <input
                  type="text"
                  value={bookingId}
                  onChange={e => setBookingId(e.target.value)}
                  className="w-full p-2 mb-4 border rounded"
                />
                <label className="block mb-2 text-sm font-bold">Rooms</label>
                <input
                  type="number"
                  value={rooms}
                  onChange={e => setRooms(e.target.value)}
                  className="w-full p-2 mb-4 border rounded"
                />
                <label className="block mb-2 text-sm font-bold">Number of Guests</label>
                <input
                  type="number"
                  value={guests}
                  onChange={e => setGuests(e.target.value)}
                  className="w-full p-2 mb-4 border rounded"
                />
                <label className="block mb-2 text-sm font-bold">Booked Date</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={e => setBookingDate(e.target.value)}
                  className="w-full p-2 mb-4 border rounded"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  src={imageUrl || 'https://via.placeholder.com/150'}
                  alt="Selected Check In"
                  className="object-cover w-full h-32 rounded-lg"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={handleCloseDetailsModal} className="px-4 py-2 mr-2 bg-gray-200 rounded">
                Cancel
              </button>
              <button onClick={handleAddCheckIn} className="px-4 py-2 text-white bg-purple-600 rounded">
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckInSlider;
