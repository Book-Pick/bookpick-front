import React from 'react'
import clsx from 'clsx'
import { type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { buttonVariants } from './button.style'

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  ...props
}: ButtonProps) => {
  const spinnerColor = variant === 'secondary' ? 'border-gray-800' : 'border-white'

  return (
    <button
      className={twMerge(clsx(buttonVariants({ variant, size }), className))}
      disabled={isLoading || props.disabled}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className='flex items-center gap-2'>
          <div
            className={clsx(
              'animate-spin rounded-full h-4 w-4 border-t-2 border-b-2',
              spinnerColor,
            )}
          ></div>
          <span className='opacity-70'>{children}</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}
