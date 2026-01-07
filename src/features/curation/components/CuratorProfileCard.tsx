import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardAction,
  Button,
  AspectRatio,
} from '@/shared/ui'
import { useNavigate } from 'react-router-dom'

interface CuratorProfileCardProps {
  curatorId: number
  name: string
  profileImage?: string
  favoriteGenres: string[]
  introduction?: string
  isSubscribed: boolean
  isSubscriptionLoading?: boolean
  isOwnProfile?: boolean
  className?: string
  onSubscribeToggle?: () => void
}

const CuratorProfileCard = ({
  curatorId: _curatorId,
  name,
  profileImage,
  favoriteGenres,
  introduction,
  isSubscribed,
  isSubscriptionLoading = false,
  isOwnProfile = false,
  className,
  onSubscribeToggle,
}: CuratorProfileCardProps) => {
  void _curatorId // curatorId는 부모에서 관리
  const navigate = useNavigate()

  const handleSubscribeClick = () => {
    onSubscribeToggle?.()
  }

  const handleCardClick = () => {
    if (isOwnProfile) {
      navigate('/mypage/curation')
    }
  }

  return (
    <Card
      className={`py-4 md:pb-3 bg-neutral-50 md:bg-transparent border-0 md:border rounded-xl md:rounded-lg ${isOwnProfile ? 'cursor-pointer hover:bg-neutral-100 transition-colors' : ''} ${className || ''}`}
      onClick={handleCardClick}
    >
      <CardHeader className='px-3 md:px-7'>
        {/* 모바일 레이아웃 */}
        <div className='flex md:hidden flex-row gap-3 items-center'>
          <div className='w-[48px] min-w-[48px] max-w-[48px] flex-shrink-0'>
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
          <div className='flex-1 text-left'>
            <CardTitle className='font-curation-title text-base'>{name}</CardTitle>
            <CardDescription className='mt-1 text-sm'>
              {favoriteGenres.length > 0 && (
                <p className='text-neutral-900'>선호 장르: {favoriteGenres.join(', ')}</p>
              )}
              {introduction && <p className='text-neutral-600 line-clamp-1'>{introduction}</p>}
            </CardDescription>
          </div>
          {!isOwnProfile && (
            <div className='flex-shrink-0'>
              <Button
                size='xs'
                onClick={handleSubscribeClick}
                variant={isSubscribed ? 'outline' : 'default'}
                disabled={isSubscriptionLoading}
              >
                {isSubscriptionLoading ? '...' : isSubscribed ? '구독취소' : '구독하기'}
              </Button>
            </div>
          )}
        </div>

        {/* 데스크톱 레이아웃 (기존 디자인 유지) */}
        <div className='hidden md:flex flex-row gap-4 items-center'>
          <div className='w-[100px] min-w-[100px] max-w-[100px] flex-shrink-0'>
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
          <div className='flex-1 text-left'>
            <CardTitle className='font-curation-title text-xl'>{name}</CardTitle>
            <CardDescription className='mt-2 text-sm'>
              {favoriteGenres.length > 0 && (
                <p className='text-neutral-900'>선호 장르: {favoriteGenres.join(', ')}</p>
              )}
              {introduction && <p className='text-neutral-600'>{introduction}</p>}
            </CardDescription>
          </div>
        </div>
        {/* 데스크톱용 버튼 - 본인 프로필이 아닐 때만 표시 */}
        {!isOwnProfile && (
          <CardAction className='hidden md:flex md:self-center'>
            <Button
              onClick={handleSubscribeClick}
              variant={isSubscribed ? 'outline' : 'default'}
              disabled={isSubscriptionLoading}
            >
              {isSubscriptionLoading ? '처리 중...' : isSubscribed ? '구독취소' : '구독하기'}
            </Button>
          </CardAction>
        )}
      </CardHeader>
    </Card>
  )
}

export default CuratorProfileCard
