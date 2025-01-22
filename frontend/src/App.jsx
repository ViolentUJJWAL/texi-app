import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginSignupForm from './pages/LoginSignupForm'
import DriverLogin from './pages/DriverLogin'
import DriverSignup from './pages/DriverSignup'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/user/auth" element={<LoginSignupForm/>} />
        <Route path="/driver/login" element={<DriverLogin/>} />
        <Route path="/driver/signup" element={<DriverSignup/>} />
      </Routes>
    </div>
  )
}

export default App
