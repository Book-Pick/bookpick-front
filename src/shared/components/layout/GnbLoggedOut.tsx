import { Button } from '@/shared/ui'
import { useNavigate } from 'react-router-dom'

export function GnbLoggedOut() {
  const navigate = useNavigate()

  return (
    <div className='flex items-center gap-4'>
      <Button>로그인</Button>
      <Button onClick={() => navigate('/register')}>회원가입</Button>
    </div>
  )
}
