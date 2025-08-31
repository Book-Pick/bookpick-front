import { Avatar, AvatarFallback, AvatarImage, Button } from '@/shared/ui'
import { Bell } from 'lucide-react'
import sampleImage from '@/assets/images/sample_image.jpeg'

export function GnbLoggedIn() {
  return (
    <div className='flex items-center gap-2'>
      <Button>큐레이션 작성</Button>

      <Button variant='ghost' className='rounded-full'>
        <Bell size={18} className='size-[20px]' />
      </Button>

      <Avatar>
        <AvatarImage src={sampleImage} alt='profile' className='object-cover' />
        <AvatarFallback>수민</AvatarFallback>
      </Avatar>
    </div>
  )
}
