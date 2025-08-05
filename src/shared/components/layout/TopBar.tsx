import { GnbLoggedIn } from './GnbLoggedIn'
import { GnbLoggedOut } from './GnbLoggedOut'

export function TopBar() {
  // TODO: store로 상태 관리
  const isLoggedIn = true

  return (
    <header className='bg-background border-b border-border px-6 py-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <h1 className='text-2xl font-bold text-foreground'>BOOK PICK</h1>
        </div>

        {isLoggedIn ? <GnbLoggedIn /> : <GnbLoggedOut />}
      </div>
    </header>
  )
}
