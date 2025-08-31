import { cva } from 'class-variance-authority'

export const iconButtonVariants = cva(
  'inline-flex items-center justify-center rounded-full transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline: 'border border-border text-foreground hover:bg-muted',
        ghost: 'hover:bg-muted text-foreground', // 특별한 케이스로 유지
      },
      size: {
        sm: 'h-6 w-6 p-1',
        md: 'h-8 w-8 p-2',
        lg: 'h-10 w-10 p-3',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'md',
    },
  },
)
