import { useParams, useNavigate } from 'react-router-dom'
import CurationList from '../components/CurationList'
import { ContentsLayout } from '@/app/layout'
import { useGetCurationsByIds } from '../hooks/useCuration'
import { editorPickData } from '../constants/editorPick'

export default function EditorPickCurationPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const editorPick = id ? editorPickData[id] : null
  const curationIds = editorPick?.curationIds ?? []

  const { data: curations, isLoading, error } = useGetCurationsByIds(curationIds)

  const handleCardClick = (curationId: number) => {
    navigate(`/curation/detail/${curationId}`)
  }

  if (!editorPick) {
    return (
      <ContentsLayout>
        <div className='flex flex-col justify-center items-center min-h-[400px] gap-4'>
          <p className='text-muted-foreground'>에디터픽을 찾을 수 없습니다.</p>
          <button
            onClick={() => navigate(-1)}
            className='px-4 py-2 bg-primary text-primary-foreground rounded-md'
          >
            뒤로 가기
          </button>
        </div>
      </ContentsLayout>
    )
  }

  if (isLoading) {
    return (
      <ContentsLayout>
        <div className='flex justify-center items-center min-h-[400px]'>
          <p className='text-muted-foreground'>로딩 중...</p>
        </div>
      </ContentsLayout>
    )
  }

  if (error) {
    return (
      <ContentsLayout>
        <div className='flex flex-col justify-center items-center min-h-[400px] gap-4'>
          <p className='text-destructive'>큐레이션을 불러오는데 실패했습니다.</p>
          <button
            onClick={() => navigate(-1)}
            className='px-4 py-2 bg-primary text-primary-foreground rounded-md'
          >
            뒤로 가기
          </button>
        </div>
      </ContentsLayout>
    )
  }

  return (
    <ContentsLayout>
      <div className='my-[-10px]'>
        <div className='mb-8'>
          <h1 className='text-2xl md:text-3xl font-bold mb-2'>{editorPick.title}</h1>
          <p className='text-muted-foreground'>{editorPick.description}</p>
        </div>

        {curations && curations.length > 0 ? (
          <CurationList curations={curations} onCardClick={handleCardClick} />
        ) : (
          <div className='flex justify-center items-center min-h-[200px]'>
            <p className='text-muted-foreground'>큐레이션이 없습니다.</p>
          </div>
        )}
      </div>
    </ContentsLayout>
  )
}
