import { Toaster } from 'react-hot-toast'

interface ToastProviderProps {
  children: React.ReactNode
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <>
      {children}
      <Toaster
        toastOptions={{
          style: {
            background: 'var(--toast)',
            color: 'var(--toast-foreground)',
            fontSize: '14px',
            fontWeight: '600',
            border: 'none',
          },
        }}
      />
    </>
  )
}
