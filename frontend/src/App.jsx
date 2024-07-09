import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import Home from './pages/Home'
import Welcome from './pages/Welcome'
import Profile from './pages/Profile'
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
function App() {
  const {user} = useAuthContext()
  return (
    <>
    <div className=' h-full min-h-screen bg-gray-800 pb-10'>
      <BrowserRouter>
      <Navbar />
      <div className="body">
      <Routes>
        <Route
          path='/'
          element={user?<Home/>:<Navigate to='/welcome'/>}
        />
        <Route
          path='/welcome'
          element={!user?<Welcome/>:<Navigate to='/'/>}
        />
        <Route
          path='/profile'
          element= {user?<Profile/>:<Navigate to = '/welcome'/>}
        />
        
      </Routes>
      </div>
      </BrowserRouter>
      
      </div>
    </>
  )
}

export default App
