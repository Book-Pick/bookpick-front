import React from 'react'

interface ContentsLayoutProps {
  children: React.ReactNode
  className?: string
}

export const ContentsLayout: React.FC<ContentsLayoutProps> = ({ children, className = '' }) => {
  return <main className={`max-w-[1440px] mx-auto px-14 py-16 ${className}`}>{children}</main>
}
