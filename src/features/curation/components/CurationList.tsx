import CurationCardSocial from '@/features/curation/components/CurationCardSocial'
import type { CurationItem } from '@/features/curation/types/curation.types'
import { useLikeCuration } from '@/features/community/hooks/useCommunity'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useDeleteCuration } from '@/features/curation/hooks/useCuration'
import { useConfirm } from '@/app/providers'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const CurationList = ({
  curations,
  onCardClick,
  showSimilarity = false,
}: {
  curations: CurationItem[]
  onCardClick: (id: number) => void
  showSimilarity?: boolean
}) => {
  const { user } = useAuth()
  const { confirm } = useConfirm()
  const navigate = useNavigate()

  const { mutate: likeCurationMutate } = useLikeCuration()
  const { mutate: deleteCurationMutate } = useDeleteCuration()

  const handleLikeClick = (id: number) => {
    likeCurationMutate(id)
  }

  const handleShare = async (id: number) => {
    const url = `${window.location.origin}/curation/detail/${id}`
    try {
      await navigator.clipboard.writeText(url)
      toast.success('링크가 클립보드에 저장되었습니다.')
    } catch {
      toast.error('링크 복사에 실패했습니다.')
    }
  }

  const handleBookmark = () => {
    toast('서비스 준비 중입니다.', {
      icon: '⏳',
    })
  }

  const handleEdit = (id: number) => {
    navigate(`/curation/edit/${id}`)
  }

  const handleDelete = async (id: number) => {
    const confirmed = await confirm({
      title: '추천사 삭제',
      description: '이 추천사를 삭제하시겠습니까?\n삭제된 추천사는 복구할 수 없습니다.',
      confirmText: '삭제',
      cancelText: '취소',
      variant: 'destructive',
    })

    if (confirmed) {
      deleteCurationMutate(Number(id))
    }
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
      {curations.map((curation) => (
        <CurationCardSocial
          key={curation.curationId}
          id={curation.curationId}
          similarity={showSimilarity ? curation.similarity : null}
          title={curation.title || '제목 없음'}
          description={curation.review || ''}
          curator={curation.nickName}
          likes={curation.likeCount || 0}
          comments={curation.commentCount || 0}
          views={curation.viewCount || 0}
          tags={curation.matched || curation.recommend?.keywords?.join(', ') || ''}
          thumbnailSrc={curation?.thumbnail.imageUrl || null}
          thumbnailColor={curation?.thumbnail.imageColor || undefined}
          curatorImage={curation.profileImageUrl || undefined}
          curatorBio={curation.introduction || ''}
          isLiked={curation.isLiked}
          onClick={() => onCardClick(curation.curationId || curation.id || 0)}
          onLikeClick={(id) => handleLikeClick(Number(id))}
          menuVariant={curation.userId === user?.userId ? 'owner' : 'viewer'}
          onShare={() => handleShare(curation.curationId)}
          onBookmark={() => handleBookmark()}
          onEdit={() => handleEdit(curation.curationId)}
          onDelete={() => handleDelete(curation.curationId)}
        />
      ))}
    </div>
  )
}

export default CurationList
