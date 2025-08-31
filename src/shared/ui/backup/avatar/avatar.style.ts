import { cva } from 'class-variance-authority'

export const avatarVariants = cva(
  'inline-flex items-center justify-center rounded-full bg-gray-200 relative',
  {
    variants: {
      size: {
        sm: 'w-8 h-8 text-xs',
        md: 'w-12 h-12 text-sm',
        lg: 'w-16 h-16 text-lg',
      },
      status: {
        none: '',
        online: '',
        offline: '',
      },
    },
    defaultVariants: {
      size: 'md',
      status: 'none',
    },
  },
)

export const statusVariants = cva('absolute top-0 right-0 rounded-full border-2 border-white', {
  variants: {
    status: {
      online: 'bg-green-500',
      offline: 'bg-gray-400',
    },
    size: {
      sm: 'w-2 h-2',
      md: 'w-3 h-3',
      lg: 'w-4 h-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
