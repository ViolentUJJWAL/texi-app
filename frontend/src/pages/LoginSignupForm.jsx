import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../service/auth.services';
import { setUser } from '../redux/authSlice';
import { useDispatch } from 'react-redux';

const LoginSignupForm = () => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  
  const [signupData, setSignupData] = useState({
    name: '',
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await authService.loginUser({
        email: loginData.email,
        password: loginData.password
      });
      console.log(response);
      // Handle successful login
      dispatch(setUser(response.user));
      if (response) {
        // You might want to store the token in localStorage or context
        navigate('/home'); // Navigate to dashboard or home page
      }
    } catch (err) {
    console.log(err);
      setError(err || 'Login failed. Please try again.');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await authService.registerUser({
        name: signupData.name,
        email: signupData.email,
        phone: signupData.phone,
        password: signupData.password
      });
      
      // Handle successful registration
      if (response) {
        setIsSignIn(true); // Switch to login form
        // Optionally show success message
      }
    } catch (err) {
      setError(err || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="w-full h-screen relative mx-auto bg-[url('https://static.vecteezy.com/system/resources/previews/037/350/076/non_2x/ai-generated-a-city-that-is-filled-with-taxis-on-a-rainy-day-free-photo.jpg')] bg-center bg-no-repeat shadow-2xl">
      <div className="absolute w-full h-full mx-auto px-16 py-10 bg-[#2C2700] bg-opacity-90">
        <div className='w-full max-w-md mx-auto'>
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 text-red-100 rounded-lg text-center">
              {error}
            </div>
          )}
          
          {/* Tabs */}
          <div className="flex mb-8">
            <button
              className={`text-2xl mr-4 pb-1 border-b-2 transition-colors ${isSignIn ? 'text-white border-yellow-500' : 'text-gray-400 border-transparent'}`}
              onClick={() => setIsSignIn(true)}
            >
              Sign In
            </button>
            <button
              className={`text-2xl mr-4 pb-1 border-b-2 transition-colors ${!isSignIn ? 'text-white border-yellow-500' : 'text-gray-400 border-transparent'}`}
              onClick={() => setIsSignIn(false)}
            >
              Sign Up
            </button>
          </div>

          {/* Form Container */}
          <div className="relative">
            {/* Sign In Form */}
            <form 
              onSubmit={handleLoginSubmit}
              className={`transition-transform duration-400 ${isSignIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}
            >
              <div className="mb-4">
                <label className="block text-gray-400 text-xs uppercase mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  className="w-full px-5 py-3 rounded-full bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 text-xs uppercase mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="w-full px-5 py-3 rounded-full bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
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
                  <span className={`w-4 h-4 mr-2 rounded flex items-center justify-center ${keepSignedIn ? 'bg-yellow-500' : 'bg-white/10'}`}>
                    {keepSignedIn && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  Keep me Signed in
                </label>
              </div>
              <button 
                type="submit"
                className="w-full py-3 rounded-full bg-yellow-500 text-white uppercase hover:bg-yellow-600 transition-colors"
              >
                Sign In
              </button>
              <div className="my-6 h-px bg-white/20"></div>
              <div className="text-center">
                <a href="#forgot" className="text-white hover:underline">Forgot Password?</a>
              </div>
              <Link to="/driver/login" className="w-full block my-10 text-xl bg-yellow-500 text-white px-4 py-2 rounded-lg text-center hover:text-black">
                Login As Driver
              </Link>
            </form>

            {/* Sign Up Form */}
            <form 
              onSubmit={handleSignupSubmit}
              className={`transition-transform duration-400 absolute top-0 w-full ${!isSignIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}
            >
              <div className="mb-4">
                <label className="block text-gray-400 text-xs uppercase mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={signupData.name}
                  onChange={handleSignupChange}
                  className="w-full px-5 py-3 rounded-full bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 text-xs uppercase mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  className="w-full px-5 py-3 rounded-full bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 text-xs uppercase mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={signupData.phone}
                  onChange={handleSignupChange}
                  className="w-full px-5 py-3 rounded-full bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 text-xs uppercase mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  className="w-full px-5 py-3 rounded-full bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 text-xs uppercase mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                  className="w-full px-5 py-3 rounded-full bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full py-3 rounded-full bg-yellow-500 text-white uppercase hover:bg-yellow-600 transition-colors"
              >
                Sign Up
              </button>
              <div className="my-6 h-px bg-white/20"></div>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsSignIn(true)}
                  className="text-white hover:underline"
                >
                  Already Member?
                </button>
              </div>
              <Link to="/driver/signup" className="w-full block my-10 text-xl bg-yellow-500 text-white px-4 py-2 rounded-lg text-center hover:text-black">
                Register As Driver
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupForm;