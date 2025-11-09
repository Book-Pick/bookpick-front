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
    <div className='flex flex-col justify-center items-center gap-5 md:gap-7.5 border border-border rounded-xl p-5 md:p-7.5 md:h-full'>
      <div className='flex flex-col md:flex-row items-center gap-4 md:gap-[17px] w-full'>
        <Avatar className='w-[70px] h-[70px] md:w-[80px] md:h-[80px] flex-shrink-0'>
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className='bg-secondary text-secondary-foreground text-lg md:text-xl font-semibold'>
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-1.5 md:gap-[7px] flex-1 text-center md:text-left w-full'>
          <p className='font-label'>{name}</p>
          <p className='text-sm font-medium text-muted-foreground'>
            선호 장르: {favoriteGenres.join(', ')}
          </p>
          <p className='text-sm font-medium text-muted-foreground'>{introduction}</p>
        </div>
      </div>
      <Button className='w-full' size='lg' onClick={() => navigate('/mypage/profile')}>
        프로필 수정
      </Button>
    </div>
  )
}
