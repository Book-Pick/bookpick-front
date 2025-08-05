import { Avatar, IconButton, Button } from '@/shared/ui'
import { Bell } from 'lucide-react'

export function GnbLoggedIn() {
  return (
    <div className='flex items-center gap-4'>
      <Button variant='secondary' size='md'>
        큐레이션 작성
      </Button>

      <div className='relative'>
        <IconButton
          icon={<Bell className='w-5 h-5' />}
          variant='ghost'
          size='md'
          aria-label='공지사항'
        />
        <span className='absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full'></span>
      </div>

      <Avatar
        name='Sumin'
        size='md'
        status='online'
        className='cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all'
      />
    </div>
  )
}
