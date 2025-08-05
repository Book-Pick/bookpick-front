import React from 'react'
import clsx from 'clsx'
import { type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { inputVariants } from './input.style'

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  errorMessage?: string
  label?: string
}

export const Input: React.FC<InputProps> = ({
  className,
  state,
  size,
  errorMessage,
  label,
  id,
  ...props
}) => {
  return (
    <div className='w-full'>
      {label && (
        <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1'>
          {label}
        </label>
      )}
      <input
        id={id}
        className={twMerge(clsx(inputVariants({ state, size }), className))}
        {...props}
      />
      {errorMessage && <p className='mt-1 text-sm text-red-600'>{errorMessage}</p>}
    </div>
  )
}
