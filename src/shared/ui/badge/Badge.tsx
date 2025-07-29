import React from 'react'
import { badgeVariants } from './badge.style'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type VariantProps } from 'class-variance-authority'

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge: React.FC<BadgeProps> = ({ children, variant, className, ...props }) => {
  return (
    <span className={twMerge(clsx(badgeVariants({ variant }), className))} {...props}>
      {children}
    </span>
  )
}
