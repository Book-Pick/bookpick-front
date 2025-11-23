import CurationCardSocial from '@/features/curation/components/CurationCardSocial'
import { useGetCurations } from '@/features/curation/hooks/useCuration'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MyLikesPage() {
  const navigate = useNavigate()

  const { data: likedCurations } = useGetCurations({
    sort: 'liked',
    cursor: 0,
    size: 1000,
  })

  const curations = useMemo(() => likedCurations?.content ?? [], [likedCurations])

  const handleCardClick = (id: number) => {
    navigate(`/curation/detail/${id}`)
  }

  return (
    <div className='flex flex-col gap-8 md:gap-[60px] my-6 md:my-10 xl:my-15'>
      <div className='flex flex-col gap-3'>
        <h2 className='font-title'>좋아요한 추천사</h2>
      </div>

      {/* 좋아요한 큐레이션 목록 */}
      <div className='flex flex-col gap-4'>
        {curations.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {curations.map((curation) => (
              <CurationCardSocial
                key={curation.curationId}
                id={curation.curationId}
                similarity={curation.similarity}
                title={curation.title}
                description={curation?.review ?? ''}
                curator={curation.nickName}
                likes={curation.likeCount ?? 0}
                comments={curation.commentCount ?? 0}
                views={curation.viewCount ?? 0}
                tags={curation.matched ?? ''}
                thumbnailSrc={curation.thumbnail.imageUrl || null}
                thumbnailColor={curation.thumbnail.imageColor || undefined}
                curatorImage={curation.profileImageUrl || undefined}
                curatorBio={curation.introduction || ''}
                onClick={() => handleCardClick(curation.curationId)}
              />
            ))}
          </div>
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
