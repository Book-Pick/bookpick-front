import { GnbLoggedIn } from './GnbLoggedIn'
import { GnbLoggedOut } from './GnbLoggedOut'
import { useNavigate } from 'react-router-dom'

export function TopBar() {
  const navigate = useNavigate()
  // TODO: store로 상태 관리
  const authData = localStorage.getItem('auth')
  const isLoggedIn = !!(authData && JSON.parse(authData)?.isLogin === 'true')

  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <header className='absolute top-0 left-0 right-0 z-50 border-b border-border/20 py-2 sm:py-4 bg-background/0'>
      <div className='max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-20 flex items-center justify-between'>
        <div className='flex items-center' onClick={handleLogoClick}>
          <h1 className='text-lg sm:text-xl lg:text-3xl font-wanted font-bold text-accent cursor-pointer'>
            BOOKPICK
          </h1>
        </div>

        {isLoggedIn ? <GnbLoggedIn /> : <GnbLoggedOut />}
      </div>
    </header>
  )
}
