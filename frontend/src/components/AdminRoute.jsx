import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { userAuthStore } from '../store/userAuthStore'
import { Loader } from 'lucide-react'
function AdminRoute() {
    const { authUser, isCheckingAuth } = userAuthStore()
    if(isCheckingAuth){
        return <div className='flex items-center justify-center h-screen'>
            <Loader className='size-10 animate-spin' />
        </div>
    }
    setTimeout(() => {
      if(!authUser || authUser.role !== "ADMIN"){
        return <Navigate to="/" />
      }
    }, 100);
    

  return (
    <Outlet />
  )
}

export default AdminRoute