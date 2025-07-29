import React from 'react'
import { cardVariants } from './card.style'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'
import { type VariantProps } from 'class-variance-authority'

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card: React.FC<CardProps> = ({ children, variant, className, ...props }) => {
  return (
    <div className={twMerge(clsx(cardVariants({ variant }), className))} {...props}>
      {children}
    </div>
  )
}
