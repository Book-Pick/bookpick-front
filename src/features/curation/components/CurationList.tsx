import CurationCardSocial from '@/features/curation/components/CurationCardSocial'
import type { Curation } from '@/features/curation/types/curation.types'

const CurationList = ({
  curations,
  onCardClick,
}: {
  curations: Curation[]
  onCardClick: (id: number) => void
}) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
      {curations.map((curation) => (
        <CurationCardSocial
          key={curation.id}
          similarity={curation.similarity}
          title={curation.title}
          description={curation.description}
          curator={curation.curator}
          likes={curation.likes}
          comments={curation.comments}
          views={curation.views}
          tags={curation.tags}
          thumbnailSrc={curation.thumbnailImage || undefined}
          thumbnailColor={curation.thumbnailColor || undefined}
          onClick={() => onCardClick(curation.id)}
        />
      ))}
    </div>
  )
}

export default CurationList
