import CurationCardSocial from '@/features/curation/components/CurationCardSocial'
import { mockCurations } from '@/features/curation/api/mockCurationApiData'

// 현재는 mockCurations에서 일부만 사용
const mockLikedCurations = mockCurations.slice(0, 6)

export default function MyLikesPage() {
  return (
    <div className='flex flex-col gap-8 md:gap-[60px] my-6 md:my-10 xl:my-15'>
      {/* 페이지 제목 */}
      <div className='flex flex-col gap-3'>
        <h2 className='font-title'>좋아요한 추천사</h2>
      </div>

      {/* 좋아요한 큐레이션 목록 */}
      <div className='flex flex-col gap-4'>
        {mockLikedCurations.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {mockLikedCurations.map((curation) => (
              <CurationCardSocial
                key={curation.id}
                id={curation.id}
                similarity={curation.similarity}
                title={curation.title}
                description={curation.description}
                curator={curation.curator}
                likes={curation.likes}
                comments={curation.comments}
                views={curation.views}
                tags={curation.tags.join(', ')}
                thumbnailSrc={curation.thumbnailImage || undefined}
                thumbnailColor={curation.thumbnailColor}
                onClick={() => {
                  // TODO: 큐레이션 상세 페이지로 이동
                  console.log(`Navigate to curation detail: ${curation.id}`)
                }}
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
