import { cva } from 'class-variance-authority'

export const badgeVariants = cva('inline-flex items-center rounded-full font-medium', {
  variants: {
    variant: {
      primary: 'bg-primary text-primary-foreground px-3 py-1 text-sm',
      secondary: 'bg-secondary text-secondary-foreground px-3 py-1 text-sm',
      outline: 'border border-border text-foreground px-3 py-1 text-sm',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})
