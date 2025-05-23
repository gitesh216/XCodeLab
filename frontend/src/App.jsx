import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

function App() {

  let authUser = null;

  return (
    <>
    <div className='flex flex-col items-center justify-start'>
      <Toaster /> 
      <Routes>

        <Route
        path='/'
        element={authUser ? <HomePage/> : <Navigate to={"/login"} />}
        />

        <Route
        path='/login'
        element={!authUser ? <LoginPage/> : <Navigate to={"/"} />} 
        />

        <Route
        path='/signup'
        element={!authUser ? <SignUpPage/> : <Navigate to={"/"} />}
        />
      </Routes>
    </div>
    </>
  )
}

export default App