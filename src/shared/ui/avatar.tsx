import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '@/shared/lib/utils'

interface AvatarProps extends React.ComponentProps<typeof AvatarPrimitive.Root> {
  size?: 'sm' | 'default'
}

function Avatar({ className, size = 'default', ...props }: AvatarProps) {
  const sizeClass = size === 'sm' ? 'size-10' : 'size-14'

  return (
    <AvatarPrimitive.Root
      data-slot='avatar'
      className={cn('relative flex shrink-0 overflow-hidden rounded-full', sizeClass, className)}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot='avatar-image'
      className={cn('aspect-square size-full', className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot='avatar-fallback'
      className={cn(
        'bg-neutral-200 flex size-full items-center justify-center rounded-full',
        className,
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
