import CurationCardSocial from '@/features/curation/components/CurationCardSocial'
import type { CurationItem } from '@/features/curation/types/curation.types'

const CurationList = ({
  curations,
  onCardClick,
}: {
  curations: CurationItem[]
  onCardClick: (id: number) => void
}) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
      {curations.map((curation) => (
        <CurationCardSocial
          key={curation.curationId}
          id={curation.curationId}
          similarity={curation.similarity}
          title={curation.title || '제목 없음'}
          description={curation.summary || curation.review || ''}
          curator={curation.nickName}
          likes={curation.likeCount || 0}
          comments={curation.commentCount || 0}
          views={curation.viewCount || 0}
          tags={curation.matched || curation.recommend?.keywords?.join(', ') || ''}
          thumbnailSrc={curation?.thumbnail.imageUrl || null}
          thumbnailColor={curation?.thumbnail.imageColor || undefined}
          curatorImage={curation.profileImageUrl || undefined}
          curatorBio={curation.introduction || ''}
          onClick={() => onCardClick(curation.curationId || curation.id || 0)}
        />
      ))}
    </div>
  )
}

export default CurationList
