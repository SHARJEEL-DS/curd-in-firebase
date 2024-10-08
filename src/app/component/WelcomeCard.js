import React from 'react';

const WelcomeCard = () => {
  return (
    <div className="relative my-2 overflow-hidden bg-purple-600 shadow-lg rounded-xl">
      {/* Background Image */}
      <img
        src="./a.jpg" // Replace with your image URL
        alt="Scenic Road"
        className="object-cover w-full h-[400px]"
      />

      {/* Overlay for Text */}
      <div className="absolute inset-0 flex items-center bg-black bg-opacity-50">
        <div className="p-8 space-y-4 text-white">
          {/* Welcome Message */}
          <h1 className="text-4xl font-bold">
            Hi! <span role="img" aria-label="wave">👋</span> James Doe
          </h1>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, something important to say here.
          </p>

          {/* Button */}
          <button className="px-6 py-2 font-semibold text-white transition duration-300 ease-in-out bg-purple-500 rounded-lg hover:bg-purple-700">
            Add Check In
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
