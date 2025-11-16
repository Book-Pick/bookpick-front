import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, ToastProvider, ConfirmDialogProvider } from '@/app/providers'
import { routerConfig } from '@/app/router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 1,
    },
  },
})

export default function App() {
  // RouterProvider 외부에서 Provider를 감싸면 작동하지 않으므로
  // router를 App 컴포넌트 내부에서 생성하여 모든 Provider가 적용되도록 함
  const router = createBrowserRouter(routerConfig)

  return (
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ConfirmDialogProvider>
            <RouterProvider router={router} />
          </ConfirmDialogProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ToastProvider>
  )
}
