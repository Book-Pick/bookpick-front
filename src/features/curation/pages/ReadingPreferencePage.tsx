import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button } from '@/shared/ui'
import ReadingPreferenceForm from '../components/ReadingPreferenceForm'
import { useReadingPreferenceForm } from '../hooks/useReadingPreferenceForm'
import { useCuration } from '../hooks/useCuration'
import { useAuth } from '@/app/providers'

export default function ReadingPreferencePage() {
  const navigate = useNavigate()
  const { isFirstLogin } = useAuth()
  const { useSetReadingPreference } = useCuration()
  const { mutate: setReadingPreferenceMutate, isPending } = useSetReadingPreference()

  // 빈 폼으로 시작
  const { formData, handlers, getFormData } = useReadingPreferenceForm()

  const handleSubmit = () => {
    const data = getFormData()
    console.log('독서 취향', data)
    setReadingPreferenceMutate(
      {
        mbti: data.mbti || null,
        favoriteBooks: data.selectedLifeBooks.map((book) => book.title),
        // authors: data.selectedAuthors,
        moods: data.readingMoods,
        readingHabits: data.readingHabits,
        genres: data.genres,
        keywords: data.keywords,
        trends: data.readingStyles,
      },
      {
        onSuccess: () => {
          toast.success('독서 취향이 성공적으로 설정되었습니다.')
          if (isFirstLogin) {
            navigate('/mypage/profile')
          } else {
            navigate('/')
          }
        },
      },
    )
  }

  const handleSkip = () => {
    navigate('/')
  }

  return (
    <div className='max-w-[800px] mx-auto'>
      <div className='text-center space-y-5 my-15'>
        <h2 className='font-title'>독서 취향 설정</h2>
        <div className='space-y-4'>
          <p className='text-lg font-semibold leading-normal'>
            당신의 독서 페르소나를 완성해 보세요!
            <br />
            아래 정보를 입력하면, 나와 꼭 맞는 책과 사람들을 만날 수 있어요
          </p>
          <div className='text-2xl font-semibold text-muted-foreground mt-2'>
            더 정확한 추천을 위해, 당신의 독서 취향을 알려주세요.
            <p className='text-sm text-muted-foreground'>
              (이 단계는 건너뛸 수 있으며, 나중에 마이페이지에서 설정 가능합니다)
            </p>
          </div>
        </div>
      </div>
      <ReadingPreferenceForm formData={formData} handlers={handlers} />

      {/* 하단 버튼 */}
      <div className='flex flex-col sm:flex-row justify-center gap-4 pt-8 mb-10'>
        <Button
          size='lg'
          variant='secondary'
          onClick={handleSubmit}
          disabled={isPending}
          className='w-full sm:w-auto'
        >
          {isPending ? '저장 중...' : '설정 완료하기'}
        </Button>
        <Button
          variant='outline'
          size='lg'
          onClick={handleSkip}
          disabled={isPending}
          className='w-full sm:w-auto'
        >
          건너뛰기
        </Button>
      </div>
    </div>
  )
}
