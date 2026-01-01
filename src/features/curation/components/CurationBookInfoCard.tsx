import { Card, CardHeader, CardDescription, CardAction, Button } from '@/shared/ui'
import { Heart } from 'lucide-react'
import { useGetCurationBookPurchaseLink } from '../hooks/useCuration'

interface CurationBookInfoCardProps {
  curationId: number
  className?: string
  isLiked?: boolean
  likeCount?: number | null
  isLikePending?: boolean
  onLikeToggle?: () => void
}

const CurationBookInfoCard = ({
  curationId,
  className,
  isLiked = false,
  likeCount,
  isLikePending = false,
  onLikeToggle,
}: CurationBookInfoCardProps) => {
  const { refetch, isFetching } = useGetCurationBookPurchaseLink(curationId, { enabled: false })

  const handleBookPurchaseLink = async () => {
    const result = await refetch()
    if (result.data) {
      window.open(result.data, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <>
      {/* 데스크톱용 카드 */}
      <Card className={`hidden md:block py-4 bg-neutral-100 border-0 ${className || ''}`}>
        <CardHeader className='px-5'>
          <div className='text-left'>
            <CardDescription className='text-neutral-600 font-medium'>
              이 추천사, 어떤 책일까요?
            </CardDescription>
          </div>
          <CardAction className='flex self-center'>
            <Button
              onClick={handleBookPurchaseLink}
              disabled={isFetching}
              size='lg'
              variant='point'
              className='font-bold'
            >
              <span>{isFetching ? '로딩 중...' : '어떤 책인지 보러가기'}</span>
            </Button>
          </CardAction>
        </CardHeader>
      </Card>

      {/* 모바일용 하단 고정 네비바 */}
      <div className='fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-neutral-200 px-4 py-2.5 z-50'>
        {/* 1줄: 안내 문구 */}
        <div className='flex items-center justify-center mb-2'>
          <span className='text-sm font-medium text-neutral-600'>이 추천사, 어떤 책일까요?</span>
        </div>

        {/* 2줄: 좋아요 + 책 보러가기 버튼 */}
        <div className='flex items-center gap-2.5 pb-2'>
          {/* 좋아요 버튼 */}
          <button
            onClick={onLikeToggle}
            disabled={isLikePending}
            className='flex flex-col items-center'
          >
            <Heart
              className={`size-5 transition-all cursor-pointer hover:scale-110 active:scale-95 ${isLiked ? 'fill-accent text-accent animate-heart-bounce' : 'text-accent'}`}
            />
            <span className='text-[10px] font-medium text-accent'>{likeCount ?? 0}</span>
          </button>

          {/* 책 보러가기 버튼 */}
          <Button
            onClick={handleBookPurchaseLink}
            disabled={isFetching}
            size='default'
            variant='point'
            className='flex-1 font-bold'
          >
            <span>{isFetching ? '로딩 중...' : '어떤 책인지 보러가기'}</span>
          </Button>
        </div>
      </div>
    </>
  )
}

export default CurationBookInfoCard
