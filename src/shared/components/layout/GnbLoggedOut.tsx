import { Button } from '@/shared/ui'
import { useNavigate } from 'react-router-dom'

export function GnbLoggedOut() {
  const navigate = useNavigate()

  return (
    <div className='flex items-center gap-2'>
      <Button variant='text' onClick={() => navigate('/login')}>
        로그인
      </Button>
      <Button variant='text' onClick={() => navigate('/register')}>
        회원가입
      </Button>
    </div>
  )
}
