import { useNavigate } from 'react-router-dom'
import { ServerCrash } from 'lucide-react'
import { Button } from '@/shared/ui'

export default function ServerError() {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='text-center'>
        <div className='flex justify-center mb-6'>
          <ServerCrash className='w-24 h-24 text-gray-400' strokeWidth={1.5} />
        </div>
        <h1 className='text-6xl font-bold text-gray-900 mb-4'>500</h1>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>서버 오류가 발생했습니다</h2>
        <p className='text-gray-500 mb-8 max-w-md mx-auto'>
          일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
        </p>
        <Button variant='default' onClick={() => navigate('/')} className='font-medium'>
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  )
}
