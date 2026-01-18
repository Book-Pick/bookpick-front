import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/tabs'
import { Badge } from '@/shared/ui/badge'
import CurationCardSocial from '@/features/curation/components/CurationCardSocial'
import { useConfirm } from '@/app/providers'
import { useGetCurations, useDeleteCuration } from '@/features/curation/hooks/useCuration'
import toast from 'react-hot-toast'

export default function MyCurationPage() {
  const navigate = useNavigate()
  const { confirm } = useConfirm()
  const { mutate: deleteCurationMutate } = useDeleteCuration()

  const { data: myPublishedCurations } = useGetCurations({
    sort: 'my',
    cursor: 0,
    size: 1000,
    draft: false,
  })

  const { data: myDraftedCurations } = useGetCurations({
    sort: 'my',
    cursor: 0,
    size: 1000,
    draft: true,
  })

  const publishedCurations = useMemo(
    () => myPublishedCurations?.content ?? [],
    [myPublishedCurations],
  )

  const draftCurations = useMemo(() => myDraftedCurations?.content ?? [], [myDraftedCurations])

  const handleCardClick = (id: number) => {
    navigate(`/curation/detail/${id}`)
  }

  const handleEdit = (id: number | string) => {
    navigate(`/curation/edit/${id}`)
  }

  const handleDelete = async (id: number | string) => {
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

  const handleShare = async (id: number | string) => {
    const url = `${window.location.origin}/curation/detail/${id}`
    try {
      await navigator.clipboard.writeText(url)
      toast.success('링크가 클립보드에 저장되었습니다.')
    } catch {
      toast.error('링크 복사에 실패했습니다.')
    }
  }

  const handleBookmark = () => {
    toast('서비스 준비 중입니다.', { icon: '⏳' })
  }

  return (
    <div className='flex flex-col gap-8 md:gap-[60px] my-6 md:my-10 xl:my-15'>
      <div className='flex items-center justify-between'>
        <h2 className='font-title'>내 추천사 관리</h2>
      </div>

      <Tabs defaultValue='published' className='w-full'>
        <div className='flex items-center justify-between'>
          <TabsList>
            <TabsTrigger value='published' className='gap-2'>
              공개됨
              <Badge size='sm'>{publishedCurations.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value='draft' className='gap-2'>
              임시저장
              <Badge size='sm'>{draftCurations.length}</Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* 공개됨 탭 */}
        <TabsContent value='published' className='mt-6'>
          {publishedCurations.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {publishedCurations.map((curation) => (
                <CurationCardSocial
                  key={curation.curationId}
                  id={curation.curationId}
                  title={curation?.title ?? ''}
                  description={curation?.review ?? ''}
                  curator={curation?.nickName ?? ''}
                  likes={curation?.likeCount ?? 0}
                  comments={curation?.commentCount ?? 0}
                  views={curation?.viewCount ?? 0}
                  tags={curation?.matched ?? ''}
                  thumbnailSrc={curation?.thumbnail.imageUrl || null}
                  thumbnailColor={curation?.thumbnail.imageColor || undefined}
                  curatorImage={curation.profileImageUrl || undefined}
                  curatorBio={curation.introduction || ''}
                  menuVariant='owner'
                  onShare={handleShare}
                  onBookmark={handleBookmark}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onClick={() => handleCardClick(curation.curationId)}
                />
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center py-20 gap-4'>
              <FileText className='w-16 h-16 text-gray-300' strokeWidth={1.5} />
              <div className='text-center'>
                <p className='text-gray-500 text-lg mb-2'>공개된 추천사가 없습니다</p>
                <p className='text-gray-400 text-sm'>새로운 추천사를 작성해보세요</p>
              </div>
            </div>
          )}
        </TabsContent>

        {/* 임시저장 탭 */}
        <TabsContent value='draft' className='mt-6'>
          {draftCurations.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {draftCurations.map((curation) => (
                <CurationCardSocial
                  key={curation.curationId}
                  id={curation.curationId}
                  title={curation.title}
                  description={curation.review ?? ''}
                  curator={curation.nickName ?? ''}
                  likes={curation.likeCount ?? 0}
                  comments={curation.commentCount ?? 0}
                  views={curation.viewCount ?? 0}
                  tags={curation.matched ?? ''}
                  thumbnailSrc={curation.thumbnail.imageUrl || null}
                  thumbnailColor={curation.thumbnail.imageColor || undefined}
                  curatorImage={curation.profileImageUrl || undefined}
                  curatorBio={curation.introduction || ''}
                  menuVariant='draft'
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center py-20 gap-4'>
              <FileText className='w-16 h-16 text-gray-300' strokeWidth={1.5} />
              <div className='text-center'>
                <p className='text-gray-500 text-lg mb-2'>임시저장된 추천사가 없습니다</p>
                <p className='text-gray-400 text-sm'>작성 중인 추천사는 여기에 저장됩니다</p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
