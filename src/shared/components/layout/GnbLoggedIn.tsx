import { Avatar, AvatarFallback, AvatarImage, Button } from '@/shared/ui'
import sampleImage from '@/assets/images/sample_image.jpeg'
import { useNavigate } from 'react-router-dom'

export function GnbLoggedIn() {
  const navigate = useNavigate()
  const handleCreateClick = () => {
    navigate('/curation/create')
  }
  return (
    <div className='flex items-center gap-5'>
      <Button size='xl' className='drop-shadow-lg' onClick={handleCreateClick}>
        <span className='font-semibold px-1'>큐레이션 작성</span>
      </Button>

      <Avatar className='ring-2 ring-white/30 drop-shadow-lg'>
        <AvatarImage src={sampleImage} alt='profile' className='object-cover' />
        <AvatarFallback>수민</AvatarFallback>
      </Avatar>
    </div>
  )
}
