import { Navigate } from 'react-router-dom'
import { useAuth } from '@/app/providers/AuthContext'

interface AuthRedirectRouteProps {
  children: React.ReactNode
}

const AuthRedirectRoute = ({ children }: AuthRedirectRouteProps) => {
  const { isAuthenticated } = useAuth()

  // 로그인된 상태에서 로그인/회원가입 페이지 접근 시 홈으로 리다이렉트
  if (isAuthenticated) {
    return <Navigate to='/' replace />
  }

  return <>{children}</>
}

export default AuthRedirectRoute
