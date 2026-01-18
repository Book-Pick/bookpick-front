import React from 'react'
import { TopBar } from '@/shared/components/layout'
import { Outlet } from 'react-router-dom'
import RouteChangeTracker from '@/shared/components/RouteChangeTracker'

export const MainLayout: React.FC = () => {
  return (
    <div className='flex flex-col min-h-screen relative'>
      <RouteChangeTracker />
      <TopBar />
      <main className='flex-1'>
        <Outlet />
      </main>
    </div>
  )
}
