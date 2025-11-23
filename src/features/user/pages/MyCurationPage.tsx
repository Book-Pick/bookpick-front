import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/tabs'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import CurationCardSocial from '@/features/curation/components/CurationCardSocial'
import { useConfirm } from '@/app/providers'
import { useGetCurations, useDeleteCuration } from '@/features/curation/hooks/useCuration'
import toast from 'react-hot-toast'

export default function MyCurationPage() {
  const navigate = useNavigate()
  const { confirm } = useConfirm()
  const [selectedIds, setSelectedIds] = useState<Set<number | string>>(new Set())
  const deleteCuration = useDeleteCuration()

  const { data: myCurations } = useGetCurations({
    sort: 'my',
    cursor: 0,
    size: 10,
  })

  const curations = useMemo(() => myCurations?.content ?? [], [myCurations])

  const publishedCurations = useMemo(
    () => curations.filter((c) => c.isDrafted === false) ?? [],
    [curations],
  )
  const draftCurations = useMemo(
    () => curations.filter((c) => c.isDrafted === true) ?? [],
    [curations],
  )

  const handleSelect = (id: number | string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: '추천사 삭제',
      description: `선택한 ${selectedIds.size}개의 추천사를 삭제하시겠습니까?\n삭제된 추천사는 복구할 수 없습니다.`,
      confirmText: '삭제',
      cancelText: '취소',
      variant: 'destructive',
    })

    if (confirmed) {
      const ids = Array.from(selectedIds)
      let successCount = 0
      let failCount = 0

      for (const id of ids) {
        try {
          await deleteCuration.mutateAsync(Number(id))
          successCount++
        } catch (error) {
          console.error(`큐레이션 ${id} 삭제 실패:`, error)
          failCount++
        }
      }

      if (failCount === 0) {
        toast.success(`${successCount}개의 추천사가 삭제되었습니다.`)
      } else {
        toast.error(`${successCount}개 삭제 성공, ${failCount}개 실패했습니다.`)
      }

      setSelectedIds(new Set())
    }
  }

  const handleCardClick = (id: number) => {
    navigate(`/curation/edit/${id}`)
  }

  return (
    <div className='flex flex-col gap-8 md:gap-[60px] my-6 md:my-10 xl:my-15'>
      {/* 페이지 제목 */}
      <div className='flex items-center justify-between'>
        <h2 className='font-title'>내 추천사 관리</h2>
      </div>

      {/* 탭 - 공개됨 / 임시저장 */}
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
            {/* 삭제 버튼 - 1개 이상 선택시에만 표시 */}
            {selectedIds.size > 0 && (
              <Button
                variant='text'
                size='default'
                onClick={handleDelete}
                className='flex items-center gap-2 ml-auto'
              >
                <Trash2 size={18} />
              </Button>
            )}
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
                  editMode={true}
                  isSelected={selectedIds.has(curation.curationId)}
                  onSelect={handleSelect}
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
                  d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
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
                  editMode={true}
                  isSelected={selectedIds.has(curation.curationId)}
                  onSelect={handleSelect}
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
                  d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
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
