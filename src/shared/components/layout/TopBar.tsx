import { GnbLoggedIn } from './GnbLoggedIn'
import { GnbLoggedOut } from './GnbLoggedOut'

export function TopBar() {
  // TODO: store로 상태 관리
  const isLoggedIn = true

  return (
    <header className='bg-background border-b border-border px-6 py-4'>
      <div className='max-w-[1200px] mx-auto flex items-center justify-between'>
        <div className='flex items-center'>
          <h1 className='text-2xl font-bold text-foreground'>BookPick</h1>
        </div>

        {isLoggedIn ? <GnbLoggedIn /> : <GnbLoggedOut />}
      </div>
    </header>
  )
}
