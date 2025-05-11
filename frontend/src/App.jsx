import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

function App() {
  return (
    <>
    <div className='flex flex-col items-center justify-start'>
      <Routes>

        <Route
        path='/'
        element={<HomePage/>}
        />

        <Route
        path='/login'
        element={<LoginPage/>} 
        />

        <Route
        paht='/signup'
        element={<SignUpPage/>}

        />
      </Routes>
    </div>
    </>
  )
}

export default App