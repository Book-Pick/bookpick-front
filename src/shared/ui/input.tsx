import * as React from 'react'
import { CircleX } from 'lucide-react'

import { cn } from '@/shared/lib/utils'

interface InputProps extends Omit<React.ComponentProps<'input'>, 'size'> {
  errorMessage?: string
  label?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  clearable?: boolean
  onClear?: () => void
}

function Input({
  className,
  type,
  errorMessage,
  label,
  id,
  size = 'md',
  clearable = false,
  onClear,
  value,
  ...props
}: InputProps) {
  const showClearButton = clearable && value && String(value).length > 0

  return (
    <div className='w-full'>
      {label && (
        <label htmlFor={id} className='block text-sm font-medium leading-none mb-2'>
          {label}
        </label>
      )}
      <div className='relative'>
        <input
          id={id}
          type={type}
          data-slot='input'
          value={value}
          className={cn(
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:border-0 file:bg-transparent file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            errorMessage && 'border-destructive',
            size === 'sm' && 'h-7 px-2 py-0.5 text-sm file:h-5 file:text-xs',
            size === 'md' && 'h-9 px-3 py-1 text-xs md:text-sm file:h-7 file:text-sm',
            size === 'lg' && 'h-11 px-4 py-2 text-lg md:text-base file:h-9 file:text-base',
            size === 'xl' && 'h-16 px-6 py-4 text-2xl md:text-xl file:h-12 file:text-xl',
            showClearButton && 'pr-8',
            className,
          )}
          aria-invalid={!!errorMessage}
          {...props}
        />
        {showClearButton && (
          <button
            type='button'
            onClick={onClear}
            className='absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer'
            aria-label='입력 내용 지우기'
          >
            <CircleX size={16} />
          </button>
        )}
      </div>
      {errorMessage && <p className='mt-1 text-xs text-destructive'>{errorMessage}</p>}
    </div>
  )
}

export { Input }
