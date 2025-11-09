import * as React from 'react'
import { cn } from '@/shared/lib/utils'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    return (
      <div
        ref={ref}
        className='relative h-2 w-full overflow-hidden rounded-full bg-gray-200'
        {...props}
      >
        <div
          className={cn(
            'h-full w-full flex-1 transition-all duration-300 ease-in-out bg-primary',
            className,
          )}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </div>
    )
  },
)

Progress.displayName = 'Progress'

export { Progress }
