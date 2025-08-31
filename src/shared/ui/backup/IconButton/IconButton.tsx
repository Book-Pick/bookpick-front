import React from 'react'
import clsx from 'clsx'
import { type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { iconButtonVariants } from './iconButton.style'

interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    VariantProps<typeof iconButtonVariants> {
  icon: React.ReactNode
  'aria-label': string
  isLoading?: boolean
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'ghost',
  size = 'md',
  isLoading = false,
  className,
  ...props
}: IconButtonProps) => {
  return (
    <button
      className={twMerge(clsx(iconButtonVariants({ variant, size }), className))}
      disabled={isLoading || props.disabled}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <div
          className={clsx(
            'animate-spin rounded-full border-t-2 border-b-2',
            variant === 'ghost' || variant === 'outline' ? 'border-foreground' : 'border-current',
            size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-5 w-5' : 'h-6 w-6',
          )}
        />
      ) : (
        icon
      )}
    </button>
  )
}
