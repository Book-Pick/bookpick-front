import { createContext, useContext } from 'react'

export interface ConfirmOptions {
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive'
}

export interface ConfirmDialogContextType {
  confirm: (options?: ConfirmOptions) => Promise<boolean>
}

export const ConfirmDialogContext = createContext<ConfirmDialogContextType | undefined>(undefined)

export function useConfirm() {
  const context = useContext(ConfirmDialogContext)
  if (context === undefined) {
    throw new Error('useConfirm must be used within a ConfirmDialogProvider')
  }
  return context
}
