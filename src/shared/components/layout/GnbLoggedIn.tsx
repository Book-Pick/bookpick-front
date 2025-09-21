import { Avatar, AvatarFallback, AvatarImage, Button } from '@/shared/ui'
import sampleImage from '@/assets/images/sample_image.jpeg'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'

export function GnbLoggedIn() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const handleCreateClick = () => {
    navigate('/curation/create')
  }
  const handleLogoutClick = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('로그아웃 실패:', error)
    }
  }
  return (
    <div className='flex items-center gap-5'>
      <Button size='lg' onClick={handleCreateClick}>
        <span className='font-semibold px-1'>큐레이션 작성</span>
      </Button>

      <Avatar size='sm' className='ring-2 ring-white/30 drop-shadow-lg'>
        <AvatarImage src={sampleImage} alt='profile' className='object-cover' />
        <AvatarFallback>수민</AvatarFallback>
      </Avatar>

      <Button size='lg' className='text-lg px-2' variant='text' onClick={handleLogoutClick}>
        로그아웃
      </Button>
    </div>
  )
}
