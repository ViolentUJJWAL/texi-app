import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="flex items-center mb-4 mt-4">
        <span className="text-5xl font-bold">ApniTexi</span>
        <span className="text-yellow-400 text-5xl ml-1">•</span>
      </div>

      {/* Scooter Illustration */}
      <div className="w-96 h-96 mb-4">
        <img src="https://img.pikbest.com/element_our/20220402/bg/25ba9f5cdd241.png!sw800" alt="Scooter" />
      </div>

      {/* Location Services Text */}
      <div className="text-center">
        <p className="text-2xl text-gray-800 font-medium mb-2">Apki Apni Texi Kahi Bhi Kabhi Bhi.</p>
      </div>

      {/* Loading Animation */}
      <div className="mt-4 flex space-x-2">
        <Link to="/user/auth" className="text-2xl bg-yellow-400 text-white px-4 py-2 rounded-md">Continue</Link>
      </div>
    </div>
  );
};

export default Home;    