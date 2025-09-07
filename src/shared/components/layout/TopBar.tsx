import { GnbLoggedIn } from './GnbLoggedIn'
import { GnbLoggedOut } from './GnbLoggedOut'
import { useNavigate } from 'react-router-dom'

export function TopBar() {
  const navigate = useNavigate()
  // TODO: store로 상태 관리
  const isLoggedIn = false

  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <header className='border-b border-border py-4'>
      <div className='max-w-[1440px] mx-auto px-20 flex items-center justify-between'>
        <div className='flex items-center' onClick={handleLogoClick}>
          <h1 className='text-[32px] font-wanted font-semibold text-foreground cursor-pointer'>
            BOOKPICK
          </h1>
        </div>

        {isLoggedIn ? <GnbLoggedIn /> : <GnbLoggedOut />}
      </div>
    </header>
  )
}
