import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginSignupForm from './pages/LoginSignupForm'
import DriverLogin from './pages/DriverLogin'
import DriverSignup from './pages/DriverSignup'
import Start from './pages/Start'
import Home from './pages/Home'
import { useDispatch } from 'react-redux'
import { fetchUser } from './redux/authSlice'
import ProtectedRoute from './route/protectedRoutes'


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchUserAuth = () => {
    setLoading(true);
    dispatch(fetchUser())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }
  
  useEffect(() => {
    fetchUserAuth();
  }, [dispatch]);

  if(loading) {
    return <div>Loading...</div>
  } 

  return (
    <div>
      <Routes>
        <Route path="/" element={<Start/>} />
        <Route path="/user/auth" element={<LoginSignupForm/>} />
        <Route path="/driver/login" element={<DriverLogin/>} />
        <Route path="/driver/signup" element={<DriverSignup/>} />

        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App
