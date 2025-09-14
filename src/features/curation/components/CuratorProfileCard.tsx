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
    <Card className={`py-4 pb-3 ${className || ''}`}>
      <CardHeader className='px-7'>
        <div className='flex gap-4 items-center'>
          <div className='w-[140px] min-w-[140px] max-w-[140px] flex-shrink-0'>
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
          <div>
            <CardTitle className='font-semibold text-[26px]'>{name}</CardTitle>
            <CardDescription className='mt-1'>
              <p className='text-neutral-900'>선호 장르: {favoriteGenres.join(', ')}</p>
              <p className='text-neutral-600'>소개문구: {introduction}</p>
            </CardDescription>
          </div>
        </div>
        <CardAction className='self-center'>
          <Button onClick={handleSubscribeClick} variant={isSubscribed ? 'outline' : 'default'}>
            {isSubscribed ? '구독취소' : '구독하기'}
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  )
}

export default CuratorProfileCard
