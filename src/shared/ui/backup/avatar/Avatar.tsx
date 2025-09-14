import React, { useState } from 'react'
import { avatarVariants, statusVariants } from './avatar.style'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'
import { type VariantProps } from 'class-variance-authority'

interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  name?: string // fallback에 이니셜 표시
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  status = 'none',
  className,
  ...props
}) => {
  const [isImageError, setIsImageError] = useState(false)

  const fallbackContent = name ? name.charAt(0).toUpperCase() : '?'

  return (
    <div
      className={twMerge(clsx(avatarVariants({ size }), className))}
      aria-label={alt || name || 'avatar'}
      {...props}
    >
      {src && !isImageError ? (
        <img
          src={src}
          alt={alt || 'avatar'}
          className='w-full h-full object-cover'
          onError={() => setIsImageError(true)}
        />
      ) : (
        <span className='text-center'>{fallbackContent}</span>
      )}
      {status !== 'none' && <span className={statusVariants({ status, size })}></span>}
    </div>
  )
}
