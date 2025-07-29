import React from 'react'
import clsx from 'clsx'
import { type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { textareaVariants } from './textarea.style'

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  errorMessage?: string
}

export const Textarea: React.FC<TextareaProps> = ({
  className,
  state,
  size,
  errorMessage,
  ...props
}) => {
  return (
    <div className='w-full'>
      <textarea
        className={twMerge(clsx(textareaVariants({ state, size }), className))}
        {...props}
      />
      {errorMessage && <p className='mt-1 text-sm text-red-600'>{errorMessage}</p>}
    </div>
  )
}
