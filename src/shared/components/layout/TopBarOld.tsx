import { GnbLoggedIn } from './GnbLoggedIn_bak'
import { GnbLoggedOut } from './GnbLoggedOut'
import { useNavigate } from 'react-router-dom'

export function TopBarOld() {
  const navigate = useNavigate()
  // TODO: store로 상태 관리
  const authData = localStorage.getItem('auth')
  const isLoggedIn = !!(authData && JSON.parse(authData)?.isLogin === 'true')

  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <header className='border-b border-border py-2 sm:py-4'>
      <div className='max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-20 flex items-center justify-between'>
        <div className='flex items-center' onClick={handleLogoClick}>
          <h1 className='text-2xl sm:text-xl lg:text-3xl font-wanted font-semibold text-accent cursor-pointer'>
            BOOKPICK
          </h1>
        </div>

        {isLoggedIn ? <GnbLoggedIn /> : <GnbLoggedOut />}
      </div>
    </header>
  )
}
