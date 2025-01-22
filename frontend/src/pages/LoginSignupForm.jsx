import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginSignupForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  return (
    <div className="w-full h-screen relative mx-auto bg-[url('https://static.vecteezy.com/system/resources/previews/037/350/076/non_2x/ai-generated-a-city-that-is-filled-with-taxis-on-a-rainy-day-free-photo.jpg')] bg-center bg-no-repeat shadow-2xl">
      <div className="absolute w-full h-full mx-auto px-16 py-10 bg-[#2C2700] bg-opacity-90">
        <div className='w-full max-w-md mx-auto'>
          {/* Tabs */}
          <div className="flex mb-8">
            <button
              className={`text-2xl mr-4 pb-1 border-b-2 transition-colors ${isSignIn ? 'text-white border-yellow-500' : 'text-gray-400 border-transparent'
                }`}
              onClick={() => setIsSignIn(true)}
            >
              Sign In
            </button>
            <button
              className={`text-2xl mr-4 pb-1 border-b-2 transition-colors ${!isSignIn ? 'text-white border-yellow-500' : 'text-gray-400 border-transparent'
                }`}
              onClick={() => setIsSignIn(false)}
            >
              Sign Up
            </button>
          </div>

          {/* Form Container */}
          <div className="relative">
            {/* Sign In Form */}
            <div className={`transition-transform duration-400 ${isSignIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
              }`}>
              <div className="mb-4">
                <label className="block text-gray-400 text-xs uppercase mb-2">Username</label>
                <input
                  type="text"
                  className="w-full px-5 py-3 rounded-full bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 text-xs uppercase mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-5 py-3 rounded-full bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={keepSignedIn}
                    onChange={(e) => setKeepSignedIn(e.target.checked)}
                    className="hidden"
                  />
                  <span className={`w-4 h-4 mr-2 rounded flex items-center justify-center ${keepSignedIn ? 'bg-yellow-500' : 'bg-white/10'
                    }`}>
                    {keepSignedIn && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  Keep me Signed in
                </label>
              </div>
              <button className="w-full py-3 rounded-full bg-yellow-500 text-white uppercase hover:bg-yellow-600 transition-colors">
                Sign In
              </button>
              <div className="my-6 h-px bg-white/20"></div>
              <div className="text-center">
                <a href="#forgot" className="text-white hover:underline">Forgot Password?</a>
              </div>
              <Link to="/driver/login" className="w-full block my-10 text-xl bg-yellow-500 text-white px-4 py-2 rounded-lg text-center hover:text-black">Login As Driver</Link>
            </div>

            {/* Sign Up Form */}
            <div className={`transition-transform duration-400 absolute top-0 w-full ${!isSignIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
              }`}>
              <div className="mb-4">
                <label className="block text-gray-400 text-xs uppercase mb-2">Username</label>
                <input
                  type="text"
                  className="w-full px-5 py-3 rounded-full bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 text-xs uppercase mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-5 py-3 rounded-full bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 text-xs uppercase mb-2">Repeat Password</label>
                <input
                  type="password"
                  className="w-full px-5 py-3 rounded-full bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 text-xs uppercase mb-2">Repeat Password</label>
                <input
                  type="password"
                  className="w-full px-5 py-3 rounded-full bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 text-xs uppercase mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full px-5 py-3 rounded-full bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <button className="w-full py-3 rounded-full bg-yellow-500 text-white uppercase hover:bg-yellow-600 transition-colors">
                Sign Up
              </button>
              <div className="my-6 h-px bg-white/20"></div>
              <div className="text-center">
                <button
                  onClick={() => setIsSignIn(true)}
                  className="text-white hover:underline"
                >
                  Already Member?
                </button>
              </div>
              <Link to="/driver/signup" className="w-full block my-10 text-xl bg-yellow-500 text-white px-4 py-2 rounded-lg text-center hover:text-black">Register As Driver</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginSignupForm;