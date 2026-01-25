import { GnbLoggedIn } from './GnbLoggedIn'
import { GnbLoggedOut } from './GnbLoggedOut'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { cn } from '@/shared/lib/utils'

export function TopBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  const isLoggedIn = isAuthenticated
  const isLandingPage = location.pathname === '/' && !isLoggedIn

  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <header className='absolute top-0 left-0 right-0 z-50 border-b border-border/20 py-2 sm:py-4 bg-background/0'>
      <div className='max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-20 flex items-center justify-between'>
        <div className='flex items-center' onClick={handleLogoClick}>
          <h1
            className={cn(
              'text-2xl lg:text-3xl font-wanted font-bold cursor-pointer',
              isLandingPage && 'text-white',
            )}
          >
            BOOKPICK
          </h1>
        </div>

        {isLoggedIn ? <GnbLoggedIn /> : <GnbLoggedOut />}
      </div>
    </header>
  )
}
