import React from 'react'
import { TopBarOld, Footer } from '@/shared/components/layout'
import { Outlet } from 'react-router-dom'

export const MainLayoutOld: React.FC = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <TopBarOld />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
