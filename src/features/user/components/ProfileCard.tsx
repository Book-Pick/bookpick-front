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
    <div className='flex flex-col gap-2.5 border border-border rounded-lg p-4 md:justify-center md:items-center md:gap-5 md:p-7.5 md:h-full md:rounded-xl'>
      <div className='flex flex-row items-center gap-3.5 w-full md:flex-col md:gap-4'>
        <Avatar className='w-[60px] h-[60px] flex-shrink-0 md:w-[80px] md:h-[80px]'>
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className='bg-secondary text-secondary-foreground text-base md:text-xl font-semibold'>
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-1 flex-1 text-left md:text-center md:gap-1.5 w-full'>
          <p className='text-sm font-semibold md:font-label'>{name}</p>
          <p className='text-xs font-medium text-muted-foreground md:text-sm md:hidden'>
            {introduction}
          </p>
          <p className='text-xs font-medium text-muted-foreground hidden md:block'>
            선호 장르: {favoriteGenres.join(', ')}
            <br />
            {introduction}
          </p>
        </div>
      </div>
      <Button className='w-full' size='lg' onClick={() => navigate('/mypage/profile')}>
        프로필 수정
      </Button>
    </div>
  )
}
