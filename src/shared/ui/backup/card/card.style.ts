import { cva } from 'class-variance-authority'

export const cardVariants = cva('rounded-lg shadow-sm border bg-card text-card-foreground p-4', {
  variants: {
    variant: {
      default: 'border-transparent',
      outlined: 'border-gray-300',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
