import React from 'react'
import { Outlet } from 'react-router-dom'

interface DashboardLayoutProps {
  children?: React.ReactNode
  className?: string
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, className = '' }) => {
  return (
    <main className={`max-w-[1440px] mx-auto pt-[57px] sm:pt-[73px] pb-34 px-[100px] ${className}`}>
      {children || <Outlet />}
    </main>
  )
}
