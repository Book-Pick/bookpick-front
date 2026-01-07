import { Card, CardHeader, CardAction, Button } from '@/shared/ui'
import { Heart, ArrowRight } from 'lucide-react'
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
          <CardAction className='flex self-center'>
            <Button
              onClick={handleBookPurchaseLink}
              disabled={isFetching}
              size='xl'
              variant='point'
              className='font-bold'
            >
              <div className='flex flex-col items-center'>
                <div className='text-xs font-light'>
                  추천사 뒤에 숨겨진 이 책의 정체를 공개합니다.
                </div>
                <div className='text-base flex items-center gap-1'>
                  {isFetching ? '이동 중...' : '책 정보 보러가기'}
                  <ArrowRight className='size-4' />
                </div>
              </div>
            </Button>
          </CardAction>
        </CardHeader>
      </Card>

      {/* 모바일용 하단 고정 네비바 */}
      <div className='fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-neutral-200 px-4 py-2.5 z-50'>
        <div className='flex items-center gap-4 pb-2'>
          <button
            onClick={onLikeToggle}
            disabled={isLikePending}
            className='flex flex-col items-center px-2'
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
            size='xl'
            variant='point'
            className='flex-1 font-bold'
          >
            <div className='flex flex-col items-center'>
              <div className='text-xs font-light'>
                추천사 뒤에 숨겨진 이 책의 정체를 공개합니다.
              </div>
              <div className='text-base flex items-center gap-1'>
                {isFetching ? '이동 중...' : '책 정보 보러가기'}
                <ArrowRight className='size-4' />
              </div>
            </div>
          </Button>
        </div>
      </div>
    </>
  )
}

export default CurationBookInfoCard
