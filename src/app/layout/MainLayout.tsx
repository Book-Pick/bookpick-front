import React from 'react'
import { TopBar, Footer } from '@/shared/components/layout'
import { Outlet } from 'react-router-dom'

export const MainLayout: React.FC = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <TopBar />
      <main className='flex-1 px-6 py-4'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
