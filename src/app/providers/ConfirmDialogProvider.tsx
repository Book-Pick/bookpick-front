import { useState } from 'react'
import type { ReactNode } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/shared/ui/alert-dialog'
import { ConfirmDialogContext } from './ConfirmDialogContext'
import type { ConfirmOptions } from './ConfirmDialogContext'

export function ConfirmDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<ConfirmOptions>({})
  const [resolveCallback, setResolveCallback] = useState<((value: boolean) => void) | null>(null)

  const confirm = (confirmOptions?: ConfirmOptions): Promise<boolean> => {
    setOptions({
      title: confirmOptions?.title || '확인',
      description: confirmOptions?.description || '이 작업을 진행하시겠습니까?',
      confirmText: confirmOptions?.confirmText || '확인',
      cancelText: confirmOptions?.cancelText || '취소',
      variant: confirmOptions?.variant || 'default',
    })
    setIsOpen(true)

    return new Promise<boolean>((resolve) => {
      setResolveCallback(() => resolve)
    })
  }

  const handleConfirm = () => {
    if (resolveCallback) {
      resolveCallback(true)
    }
    setIsOpen(false)
    setResolveCallback(null)
  }

  const handleCancel = () => {
    if (resolveCallback) {
      resolveCallback(false)
    }
    setIsOpen(false)
    setResolveCallback(null)
  }

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{options.title}</AlertDialogTitle>
            <AlertDialogDescription>{options.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>{options.cancelText}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className={
                options.variant === 'destructive'
                  ? 'bg-red-600 hover:bg-red-700 focus:ring-red-600'
                  : ''
              }
            >
              {options.confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmDialogContext.Provider>
  )
}
