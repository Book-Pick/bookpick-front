import { cva } from 'class-variance-authority'

export const textareaVariants = cva(
  'block w-full rounded-md border px-3 py-2 resize-none placeholder-gray-400 focus:outline-none focus:ring-2',
  {
    variants: {
      state: {
        default: 'border-gray-300 focus:ring-primary',
        error: 'border-red-500 focus:ring-red-500',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      state: 'default',
      size: 'md',
    },
  },
)
