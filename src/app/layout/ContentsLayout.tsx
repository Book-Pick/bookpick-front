import React from 'react'
import { Outlet } from 'react-router-dom'

interface ContentsLayoutProps {
  children?: React.ReactNode
  className?: string
}

export const ContentsLayout: React.FC<ContentsLayoutProps> = ({ children, className = '' }) => {
  return (
    <main
      className={`max-w-[1000px] mx-auto pt-[57px] sm:pt-[73px] pb-34 px-4 lg:px-0 ${className}`}
    >
      {children || <Outlet />}
    </main>
  )
}
