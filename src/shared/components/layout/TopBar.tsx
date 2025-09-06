import { GnbLoggedIn } from './GnbLoggedIn'
import { GnbLoggedOut } from './GnbLoggedOut'

export function TopBar() {
  // TODO: store로 상태 관리
  const isLoggedIn = true

  return (
    <header className='border-b border-border py-4'>
      <div className='max-w-[1440px] mx-auto px-4 flex items-center justify-between'>
        <div className='flex items-center'>
          <h1 className='text-[32px] font-semibold text-foreground'>BOOKPICK</h1>
        </div>

        {isLoggedIn ? <GnbLoggedIn /> : <GnbLoggedOut />}
      </div>
    </header>
  )
}
