import CuratorProfileCard from '../components/CuratorProfileCard'
import CurationPurchaseCard from '../components/CurationPurchaseCard'
import CommentSection from '@/features/community/components/CommentSection'
import toast from 'react-hot-toast'
import { Badge } from '@/shared/ui'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useGetCurationById } from '../hooks/useCuration'
import { useSubscriptionToggle } from '@/features/user/hooks/useSubscription'
import { useAuth } from '@/features/auth/hooks/useAuth'

export default function CurationDetailPage() {
  const { id } = useParams<{ id: string }>()
  const curationId = Number(id)
  const navigate = useNavigate()
  const { user } = useAuth()

  const { data: curation, isLoading, error } = useGetCurationById(curationId)

  const {
    isSubscribed,
    toggle: toggleSubscription,
    isLoading: isSubscriptionLoading,
  } = useSubscriptionToggle(curation?.userId ?? 0)

  // 본인이 작성한 추천사인지 확인
  const isOwnCuration = user?.userId === curation?.userId

  const [isLiked, setIsLiked] = useState(false)

  const handlePurchase = (_curationId: number, _price: number) => {
    // console.log(`추천사 ${curationId} 구매 요청, 가격: ${price}원`)
    toast('서비스 준비 중입니다.', {
      icon: '⏳',
    })
    // navigate('/order/complete')
  }

  const handleCart = (_curationId: number, _price: number) => {
    // console.log(`추천사 ${curationId} 장바구니 담기 요청, 가격: ${price}원`)
    // toast.success('추천사가 장바구니에 담겼습니다.')
    toast('서비스 준비 중입니다.', {
      icon: '⏳',
    })
  }

  const handleSubscribeToggle = () => {
    toggleSubscription()
  }

  // 로딩 상태
  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <p className='text-muted-foreground'>로딩 중...</p>
      </div>
    )
  }

  // 에러 상태
  if (error) {
    return (
      <div className='flex flex-col justify-center items-center min-h-[400px] gap-4'>
        <p className='text-destructive'>추천사를 불러오는데 실패했습니다.</p>
        <button
          onClick={() => navigate(-1)}
          className='px-4 py-2 bg-primary text-primary-foreground rounded-md'
        >
          뒤로 가기
        </button>
      </div>
    )
  }

  // 데이터가 없는 경우
  if (!curation) {
    return (
      <div className='flex flex-col justify-center items-center min-h-[400px] gap-4'>
        <p className='text-muted-foreground'>추천사를 찾을 수 없습니다.</p>
        <button
          onClick={() => navigate(-1)}
          className='px-4 py-2 bg-primary text-primary-foreground rounded-md'
        >
          뒤로 가기
        </button>
      </div>
    )
  }

  return (
    <>
      {/* 추천사 내용 */}
      <div className='my-10 xl:my-15'>
        <CuratorProfileCard
          curatorId={curation.userId}
          name={curation.nickName}
          favoriteGenres={[]}
          introduction={curation.introduction || undefined}
          isSubscribed={isSubscribed}
          isSubscriptionLoading={isSubscriptionLoading}
          isOwnProfile={isOwnCuration}
          onSubscribeToggle={handleSubscribeToggle}
          profileImage={curation.profileImageUrl || undefined}
        />
        <h3 className='font-curation-title my-12'>{curation.title || '제목 없음'}</h3>
        <p className='font-curation-text leading-normal mb-12 whitespace-pre-line'>
          {curation.review || curation.summary || '내용이 없습니다.'}
        </p>
        <div className='flex justify-between items-center'>
          <div className='flex gap-1'>
            {(curation.matched || curation.recommend?.keywords?.join(', ') || '')
              .split(',')
              .map((tag) => tag.trim())
              .filter((tag) => tag.length > 0)
              .map((keyword, index) => (
                <Badge key={index} variant='outline' size='sm'>
                  #{keyword}
                </Badge>
              ))}
          </div>
          <button onClick={() => setIsLiked(!isLiked)} className='flex flex-col items-center gap-1'>
            <Heart
              className={`size-6 text-accent transition-all ${isLiked ? 'fill-accent' : ''}`}
            />
            <span className='text-sm font-medium text-accent'>좋아요</span>
          </button>
        </div>
      </div>
      {/* 지도 */}
      {/* <BookStoreMap /> */}

      {/* 댓글 및 피드백 */}
      <CommentSection curationId={curationId} className='bg-transparent' />

      {/* 추천사 구매 정보 */}
      <CurationPurchaseCard
        curationId={curation.curationId || curation.id || 0}
        price={15000}
        className='mt-10 bg-neutral-100'
        onPurchase={handlePurchase}
        onCart={handleCart}
      />
    </>
  )
}
