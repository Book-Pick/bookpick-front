import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { useNavigate } from 'react-router-dom'

interface ProfileCardProps {
  avatarUrl?: string
  name: string
  favoriteGenres: string[]
  introduction: string
}

export default function ProfileCard({
  avatarUrl,
  name,
  favoriteGenres,
  introduction,
}: ProfileCardProps) {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col justify-center items-center gap-7.5 border border-border rounded-xl p-7.5 h-full'>
      <div className='flex items-center gap-[17px] w-full'>
        <Avatar className='w-[102px] h-[102px] flex-shrink-0'>
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className='bg-[#D7DEE9] text-[#2A3D54] text-2xl font-semibold'>
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-[7px] flex-1'>
          <p className='font-subtitle'>{name}</p>
          <p className='font-label text-muted-foreground'>선호 장르: {favoriteGenres.join(', ')}</p>
          <p className='text-sm md:text-base font-medium text-muted-foreground'>{introduction}</p>
        </div>
      </div>
      <Button
        className='w-full'
        size='lg'
        variant='secondary'
        onClick={() => navigate('/mypage/profile')}
      >
        프로필 수정
      </Button>
    </div>
  )
}
