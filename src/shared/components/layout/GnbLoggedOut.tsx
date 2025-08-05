import { Button } from '@/shared/ui'
import { useNavigate } from 'react-router-dom'

export function GnbLoggedOut() {
  const navigate = useNavigate()

  return (
    <div className='flex items-center gap-4'>
      <Button variant='outline' size='md'>
        로그인
      </Button>
      <Button variant='primary' size='md' onClick={() => navigate('/register')}>
        회원가입
      </Button>
    </div>
  )
}
