import { Avatar, IconButton, Button } from '@/shared/ui'
import { Bell } from 'lucide-react'

export function TopBar() {
  return (
    <header className='bg-background border-b border-border px-6 py-4'>
      <div className='flex items-center justify-between'>
        {/* Logo(temp) */}
        <div className='flex items-center'>
          <h1 className='text-2xl font-bold text-foreground'>BOOK PICK</h1>
        </div>

        <div className='flex items-center gap-4'>
          <Button variant='secondary' size='sm'>
            큐레이션 작성
          </Button>

          <div className='relative'>
            <IconButton
              icon={<Bell className='w-5 h-5' />}
              variant='ghost'
              size='md'
              aria-label='공지사항'
            />
            {/* 새로운 알림 있을 때 */}
            <span className='absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full'></span>
          </div>

          {/* 유저 프로필 아바타 */}
          <Avatar
            name='Sumin'
            size='md'
            status='online'
            className='cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all'
          />
        </div>
      </div>
    </header>
  )
}
