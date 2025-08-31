import { Avatar, AvatarFallback, AvatarImage, Button } from '@/shared/ui'
import { Bell } from 'lucide-react'
import sampleImage from '@/assets/images/sample_image.jpeg'

export function GnbLoggedIn() {
  return (
    <div className='flex items-center gap-2'>
      <Button size='sm' className='text-xs'>
        큐레이션 작성
      </Button>

      <Button variant='ghost' size='icon' className='rounded-full'>
        <Bell />
      </Button>

      <Avatar>
        <AvatarImage src={sampleImage} alt='profile' className='object-cover' />
        <AvatarFallback>수민</AvatarFallback>
      </Avatar>
    </div>
  )
}
