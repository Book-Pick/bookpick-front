import { useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import CurationList from '@/features/curation/components/CurationList'
import { useGetInfiniteCurations } from '@/features/curation/hooks/useCuration'

export default function MyLikesPage() {
  const navigate = useNavigate()
  const observerInstance = useRef<IntersectionObserver | null>(null)

  const {
    data: likedData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteCurations({
    sort: 'liked',
    size: 10,
    draft: false,
  })

  // 무한 스크롤 Observer
  const observerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerInstance.current) {
        observerInstance.current.disconnect()
      }
      if (node) {
        observerInstance.current = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
              fetchNextPage()
            }
          },
          { threshold: 0.1 },
        )
        observerInstance.current.observe(node)
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  )

  const handleCardClick = (id: number) => {
    navigate(`/curation/detail/${id}`)
  }

  // 무한 스크롤 데이터 평탄화
  const curations = likedData?.pages.flatMap((page) => page.content) || []

  return (
    <div className='flex flex-col gap-8 md:gap-[60px] my-6 md:my-10 xl:my-15'>
      <div className='flex flex-col gap-3'>
        <h2 className='font-title'>좋아요한 추천사</h2>
      </div>

      {/* 좋아요한 추천사 목록 */}
      <div className='flex flex-col gap-4'>
        {isLoading ? (
          <div className='flex justify-center items-center py-20'>
            <p className='text-muted-foreground'>로딩 중...</p>
          </div>
        ) : curations.length > 0 ? (
          <>
            <CurationList curations={curations} onCardClick={handleCardClick} />
            <div ref={observerRef} className='h-4' />
            {isFetchingNextPage && (
              <div className='flex justify-center items-center py-4'>
                <p className='text-muted-foreground'>더 불러오는 중...</p>
              </div>
            )}
            {!hasNextPage && curations.length > 0 && (
              <div className='flex items-center justify-center gap-4 py-8 text-muted-foreground'>
                <div className='h-px flex-1 bg-border' />
                <span className='text-sm'>❤️ 모든 좋아요한 추천사를 확인했어요</span>
                <div className='h-px flex-1 bg-border' />
              </div>
            )}
          </>
        ) : (
          // 빈 상태
          <div className='flex flex-col items-center justify-center py-20 gap-4'>
            <svg
              className='w-16 h-16 text-gray-300'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
              />
            </svg>
            <div className='text-center'>
              <p className='text-gray-500 text-lg mb-2'>아직 좋아요한 추천사가 없습니다</p>
              <p className='text-gray-400 text-sm'>마음에 드는 추천사에 좋아요를 눌러보세요</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
