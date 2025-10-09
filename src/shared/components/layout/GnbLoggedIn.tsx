import { Avatar, AvatarFallback, AvatarImage, Button } from '@/shared/ui'
import sampleImage from '@/assets/images/sample_image.jpeg'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'

export function GnbLoggedIn() {
  const navigate = useNavigate()
  const location = useLocation()
  const { useLogout } = useAuth()

  const isOnboarding = location.pathname === '/onboarding'
  const { mutate: logoutMutate } = useLogout()

  const handleCreateClick = () => {
    navigate('/curation/create')
  }
  const handleLogoutClick = () => {
    logoutMutate()
  }
  return (
    <div className='flex items-center gap-2'>
      {!isOnboarding && (
        <Button size='lg' onClick={handleCreateClick} className='mr-2 hidden md:flex'>
          <span className='font-semibold px-1'>큐레이션 작성</span>
        </Button>
      )}

      <Avatar size='sm' className='ring-2 ring-white/30 drop-shadow-lg'>
        <AvatarImage src={sampleImage} alt='profile' className='object-cover' />
        <AvatarFallback>수민</AvatarFallback>
      </Avatar>

      <Button variant='text' onClick={handleLogoutClick}>
        로그아웃
      </Button>
    </div>
  )
}
