import { Button } from '@/shared/ui'
import { useNavigate } from 'react-router-dom'

export function GnbLoggedOut() {
  const navigate = useNavigate()

  return (
    <div className='flex items-center gap-4'>
      {/* 모바일 버튼 */}
      <Button
        variant='ghost'
        className='lg:hidden text-white hover:text-white hover:bg-transparent px-2'
        onClick={() => navigate('/login')}
      >
        로그인
      </Button>
      <Button
        variant='ghost'
        className='lg:hidden text-point hover:bg-transparent hover:text-point px-2'
        onClick={() => navigate('/register')}
      >
        회원가입
      </Button>

      {/* 데스크톱 버튼 */}
      <Button
        variant='ghost'
        size='xl'
        className='hidden lg:flex text-white hover:text-white hover:bg-transparent px-2'
        onClick={() => navigate('/login')}
      >
        로그인
      </Button>
      <Button
        variant='ghost'
        size='xl'
        className='hidden lg:flex text-point hover:bg-transparent hover:text-point px-2'
        onClick={() => navigate('/register')}
      >
        회원가입
      </Button>
    </div>
  )
}
