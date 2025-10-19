import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/shared/ui'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useAuth as useAuthContext } from '@/app/providers'
import { PenSquare, ShoppingCart, LogOut, User } from 'lucide-react'

export function GnbLoggedIn() {
  const navigate = useNavigate()
  const location = useLocation()
  const { useLogout } = useAuth()

  const { user } = useAuthContext()

  const profileImageUrl = user?.profileImageUrl || ''

  const isOnboarding = location.pathname === '/onboarding'
  const { mutate: logoutMutate } = useLogout()

  const handleCreateClick = () => {
    navigate('/curation/create')
  }

  const handleMyPageClick = () => {
    navigate('/mypage/profile')
  }

  const handleCartClick = () => {
    navigate('/order/cart')
  }

  const handleLogoutClick = () => {
    logoutMutate()
  }

  return (
    <div className='flex items-center gap-2'>
      {!isOnboarding && (
        <>
          {/* 데스크톱: 텍스트 버튼 */}
          <Button size='lg' onClick={handleCreateClick} className='mr-2 hidden sm:flex'>
            <span className='font-semibold px-1'>추천사 작성</span>
          </Button>
        </>
      )}

      {/* 데스크톱: 프로필 아이콘만 */}
      <Avatar size='sm' className='ring-1 ring-white/30 hidden sm:flex'>
        <AvatarImage src={profileImageUrl} alt='profile' className='object-cover' />
        <AvatarFallback>
          <span>북픽</span>
        </AvatarFallback>
      </Avatar>

      {/* 모바일: 프로필 아이콘 + 드롭다운 메뉴 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className='flex sm:hidden'>
          <button className='outline-none'>
            <Avatar size='sm' className='ring-1 ring-white/30 cursor-pointer'>
              <AvatarImage src={profileImageUrl} alt='profile' className='object-cover' />
              <AvatarFallback>
                <span>북픽</span>
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-48'>
          {!isOnboarding && (
            <>
              <DropdownMenuItem onClick={handleCreateClick}>
                <PenSquare size={16} className='hover:text-white' />
                <span>추천사 작성</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem onClick={handleMyPageClick}>
            <User size={16} className='hover:text-white' />
            <span>마이페이지</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleCartClick}>
            <ShoppingCart size={16} className='hover:text-white' />
            <span>장바구니</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogoutClick}>
            <LogOut size={16} className='hover:text-white' />
            <span>로그아웃</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 데스크톱: 로그아웃 버튼 */}
      <Button variant='text' onClick={handleLogoutClick} className='hidden sm:flex'>
        로그아웃
      </Button>
    </div>
  )
}
