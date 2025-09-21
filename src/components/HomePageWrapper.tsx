import { useAuth } from '@/features/auth/hooks/useAuth'
import HomePage from '@/pages/HomePage'
import LandingPage from '@/pages/LandingPage'

/**
 * 로그인 상태에 따라 HomePage 또는 LandingPage를 보여주는 래퍼 컴포넌트
 */
export default function HomePageWrapper() {
  const { isAuthenticated, isLoading } = useAuth()

  console.log('로그인 상태', isAuthenticated)

  // 로딩 중일 때는 빈 화면 또는 로딩 스피너 표시
  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
      </div>
    )
  }

  // 로그인 상태에 따라 다른 페이지 표시
  return isAuthenticated ? <HomePage /> : <LandingPage />
}
