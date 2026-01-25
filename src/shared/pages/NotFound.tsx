import { useNavigate } from 'react-router-dom'
import { FileQuestion } from 'lucide-react'
import { Button } from '@/shared/ui'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='text-center'>
        <div className='flex justify-center mb-6'>
          <FileQuestion className='w-24 h-24 text-gray-400' strokeWidth={1.5} />
        </div>
        <h1 className='text-6xl font-bold text-gray-900 mb-4'>404</h1>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>페이지를 찾을 수 없습니다</h2>
        <p className='text-gray-500 mb-8 max-w-md mx-auto'>
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <Button variant='default' onClick={() => navigate('/')} className='font-medium'>
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  )
}
