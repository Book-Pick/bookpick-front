import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useAuth } from '@/app/providers/AuthContext'

interface ProtectedServiceRouteProps {
  children: React.ReactNode
}

const ProtectedServiceRoute = ({ children }: ProtectedServiceRouteProps) => {
  const { isAuthenticated, isLoading, clearAuth } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast.error('유효하지 않은 인증 정보입니다. 다시 로그인 해주세요.')
      clearAuth()
    }
  }, [isAuthenticated, isLoading, clearAuth])

  // 로딩 중일 때는 대기
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  return <>{children}</>
}

export default ProtectedServiceRoute
