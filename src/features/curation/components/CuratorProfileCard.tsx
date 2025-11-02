import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardAction,
  Button,
  AspectRatio,
} from '@/shared/ui'

interface CuratorProfileCardProps {
  curatorId: number
  name: string
  profileImage?: string
  favoriteGenres: string[]
  introduction: string
  isSubscribed: boolean
  className?: string
  onSubscribeToggle?: (curatorId: number, isSubscribed: boolean) => void
}

const CuratorProfileCard = ({
  curatorId,
  name,
  profileImage,
  favoriteGenres,
  introduction,
  isSubscribed,
  className,
  onSubscribeToggle,
}: CuratorProfileCardProps) => {
  const handleSubscribeClick = () => {
    onSubscribeToggle?.(curatorId, !isSubscribed)
  }

  return (
    <Card className={`py-4 pb-0 md:pb-3 bg-transparent ${className || ''}`}>
      <CardHeader className='px-4 md:px-7'>
        <div className='flex flex-col md:flex-row gap-4 items-center md:items-center'>
          <div className='w-[80px] md:w-[100px] min-w-[80px] md:min-w-[100px] max-w-[80px] md:max-w-[100px] flex-shrink-0'>
            <AspectRatio ratio={1} className='w-full'>
              <div className='w-full h-full bg-neutral-200 rounded-full flex items-center justify-center overflow-hidden'>
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={name}
                    className='w-full h-full object-cover rounded-lg'
                  />
                ) : (
                  <div className='text-xs text-neutral-500 font-medium'>프로필</div>
                )}
              </div>
            </AspectRatio>
          </div>
          <div className='flex-1 text-center md:text-left'>
            <CardTitle className='font-curation-title text-lg md:text-xl'>{name}</CardTitle>
            <CardDescription className='mt-2 text-sm'>
              <p className='text-neutral-900'>선호 장르: {favoriteGenres.join(', ')}</p>
              <p className='text-neutral-600'>소개문구: {introduction}</p>
            </CardDescription>
          </div>
        </div>
        {/* 데스크톱용 버튼 */}
        <CardAction className='hidden md:flex md:self-center'>
          <Button onClick={handleSubscribeClick} variant={isSubscribed ? 'outline' : 'secondary'}>
            {isSubscribed ? '구독취소' : '구독하기'}
          </Button>
        </CardAction>
      </CardHeader>

      {/* 모바일용 버튼 */}
      <div className='block md:hidden px-4 pb-4 pt-3'>
        <Button
          className='w-full'
          onClick={handleSubscribeClick}
          variant={isSubscribed ? 'outline' : 'secondary'}
        >
          {isSubscribed ? '구독취소' : '구독하기'}
        </Button>
      </div>
    </Card>
  )
}

export default CuratorProfileCard
