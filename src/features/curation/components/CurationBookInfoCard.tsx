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
    try {
      // Safari 팝업 차단을 피하기 위해 클릭 시점에 먼저 빈 창을 엽니다
      // 이렇게 하면 사용자 상호작용과 직접 연결되어 팝업 차단을 피할 수 있습니다
      const newWindow = window.open('about:blank', '_blank', 'noopener,noreferrer')

      const result = await refetch()
      if (result.data) {
        if (newWindow && !newWindow.closed) {
          // refetch 완료 후 창의 URL을 업데이트합니다
          // location.replace를 사용하면 히스토리에 about:blank가 남지 않습니다
          try {
            newWindow.location.replace(result.data)
          } catch {
            // 크로스 오리진 URL의 경우 location.href 사용
            newWindow.location.href = result.data
          }
        } else {
          // 팝업이 차단된 경우 fallback (현재 창에서 이동)
          window.location.href = result.data
        }
      } else if (newWindow && !newWindow.closed) {
        // 데이터를 가져오지 못한 경우 빈 창을 닫습니다
        newWindow.close()
      }
    } catch (error) {
      console.error('Failed to fetch book purchase link:', error)
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
