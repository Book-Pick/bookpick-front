import { useAuth } from '@/features/auth/hooks/useAuth'
import HomePage from '@/pages/HomePage'
import LandingPage from '@/pages/LandingPage'
import FirstLoginModal from '@/components/FirstLoginModal'

export default function HomePageWrapper() {
  const { isAuthenticated, isLoading, isFirstLogin, clearFirstLogin } = useAuth()

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
      </div>
    )
  }

  return (
    <>
      {isAuthenticated ? <HomePage /> : <LandingPage />}
      <FirstLoginModal open={isAuthenticated && isFirstLogin} onClose={clearFirstLogin} />
    </>
  )
}
