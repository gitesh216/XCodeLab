import React from 'react'
import Navbar from '../components/Navbar.jsx'
import { Outlet } from 'react-router-dom'
function Layout() {
  console.log("Layout");
  return (
    <div>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default Layout