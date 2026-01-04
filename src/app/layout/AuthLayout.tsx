import React from 'react'
import { Outlet } from 'react-router-dom'
import RouteChangeTracker from '@/shared/components/RouteChangeTracker'

export const AuthLayout: React.FC = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <RouteChangeTracker />
      <Outlet />
    </div>
  )
}
