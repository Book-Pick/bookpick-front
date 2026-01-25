import * as React from 'react'
import { CircleX } from 'lucide-react'

import { cn } from '@/shared/lib/utils'

interface InputProps extends Omit<React.ComponentProps<'input'>, 'size'> {
  errorMessage?: string
  label?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  clearable?: boolean
  onClear?: () => void
  rightElement?: React.ReactNode
  floatingLabel?: boolean
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
  rightElement,
  floatingLabel = false,
  placeholder,
  ...props
}: InputProps) {
  const showClearButton = clearable && value && String(value).length > 0
  const hasRightContent = showClearButton || rightElement
  const isFloating = floatingLabel && label

  // Floating label용 사이즈별 스타일
  const floatingInputStyles = {
    sm: 'h-12 pt-5 pb-1 px-3 text-xs',
    md: 'h-14 pt-6 pb-1 px-3 text-xs',
    lg: 'h-16 pt-7 pb-1 px-4 text-sm',
    xl: 'h-20 pt-8 pb-2 px-6 text-base',
  }

  // Floating label 위치 스타일
  const floatingLabelStyles = {
    sm: 'left-3 text-sm peer-focus:top-1.5 peer-[:not(:placeholder-shown)]:top-1.5',
    md: 'left-3 text-sm peer-focus:top-2 peer-[:not(:placeholder-shown)]:top-2',
    lg: 'left-4 text-base peer-focus:top-2.5 peer-[:not(:placeholder-shown)]:top-2.5',
    xl: 'left-6 text-lg peer-focus:top-3 peer-[:not(:placeholder-shown)]:top-3',
  }

  const inputElement = (
    <input
      id={id}
      type={type}
      data-slot='input'
      value={value}
      placeholder={isFloating ? ' ' : placeholder}
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:border-0 file:bg-transparent file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        errorMessage && 'border-destructive',
        isFloating ? floatingInputStyles[size] : null,
        !isFloating && size === 'sm' && 'h-7 px-2 py-0.5 text-sm file:h-5 file:text-xs',
        !isFloating && size === 'md' && 'h-11 px-4 py-2 text-base file:h-9 file:text-base',
        !isFloating &&
          size === 'lg' &&
          'h-11 px-4 py-2 text-lg md:text-base file:h-9 file:text-base',
        !isFloating && size === 'xl' && 'h-16 px-6 py-4 text-2xl md:text-xl file:h-12 file:text-xl',
        hasRightContent && 'pr-10',
        isFloating && 'peer',
        className,
      )}
      aria-invalid={!!errorMessage}
      {...props}
    />
  )

  const clearButton = showClearButton && (
    <button
      type='button'
      onClick={onClear}
      className='absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer'
      aria-label='입력 내용 지우기'
    >
      <CircleX size={16} />
    </button>
  )

  const rightElementNode = rightElement && !showClearButton && (
    <div className='absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center'>
      {rightElement}
    </div>
  )

  // Floating Label 모드
  if (isFloating) {
    return (
      <div className='w-full'>
        <div className='relative'>
          {inputElement}
          <label
            htmlFor={id}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none',
              'transition-all duration-200 ease-out',
              'peer-focus:text-xs peer-focus:-translate-y-0 peer-focus:text-primary',
              'peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-muted-foreground',
              floatingLabelStyles[size],
            )}
          >
            {label}
          </label>
          {clearButton}
          {rightElementNode}
        </div>
        {errorMessage && <p className='mt-1 text-xs text-destructive'>{errorMessage}</p>}
      </div>
    )
  }

  // 기존 모드
  return (
    <div className='w-full'>
      {label && (
        <label htmlFor={id} className='block text-sm font-medium leading-none mb-2'>
          {label}
        </label>
      )}
      <div className='relative'>
        {inputElement}
        {clearButton}
        {rightElementNode}
      </div>
      {errorMessage && <p className='mt-1 text-xs text-destructive'>{errorMessage}</p>}
    </div>
  )
}

export { Input }
