import React from 'react'
import { Outlet } from 'react-router-dom'

interface ContentsLayoutProps {
  children?: React.ReactNode
  className?: string
}

export const ContentsLayoutOld: React.FC<ContentsLayoutProps> = ({ children, className = '' }) => {
  return (
    <main className={`max-w-[1440px] mx-auto px-14 py-16 ${className}`}>
      {children || <Outlet />}
    </main>
  )
}
