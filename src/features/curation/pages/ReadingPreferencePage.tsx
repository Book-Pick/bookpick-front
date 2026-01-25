import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button } from '@/shared/ui'
import ReadingPreferenceForm from '../components/ReadingPreferenceForm'
import { useReadingPreferenceForm } from '../hooks/useReadingPreferenceForm'
import { useUpdateReadingPreference, useGetReadingPreference } from '../hooks/useCuration'
import { useGetProfile } from '@/features/user/hooks/useUser'

export default function ReadingPreferencePage() {
  const navigate = useNavigate()
  const { data: profile } = useGetProfile()
  const { mutate: updateReadingPreferenceMutate, isPending } = useUpdateReadingPreference()
  const { data: readingPreference } = useGetReadingPreference()

  const existingReadingPreference = useMemo(() => {
    return {
      mbti: readingPreference?.mbti || '',
      selectedLifeBooks: readingPreference?.favoriteBooks || [],
      selectedAuthors: readingPreference?.favoriteAuthors?.map((author) => author.name) || [],
      readingMoods: readingPreference?.moods || [],
      readingHabits: readingPreference?.readingHabits || [],
      genres: readingPreference?.genres || [],
      keywords: readingPreference?.keywords || [],
      readingStyles: readingPreference?.readingStyles || [],
    }
  }, [readingPreference])

  const { formData, handlers } = useReadingPreferenceForm(existingReadingPreference)

  useEffect(() => {
    if (profile?.userId && !profile?.nickName) {
      toast.error('프로필 설정 단계를 먼저 완료해주세요.')
      navigate('/onboarding')
    }
  }, [profile?.userId, profile?.nickName, navigate])

  const handleSubmit = () => {
    if (!readingPreference?.preferenceId) return

    updateReadingPreferenceMutate(
      {
        preferenceId: readingPreference?.preferenceId,
        mbti: formData.mbti || null,
        favoriteBooks: formData.selectedLifeBooks,
        favoriteAuthors: formData.selectedAuthors.map((author) => ({ name: author })),
        moods: formData.readingMoods,
        readingHabits: formData.readingHabits,
        genres: formData.genres,
        keywords: formData.keywords,
        readingStyles: formData.readingStyles,
      },
      {
        onSuccess: () => {
          toast.success('독서 취향이 성공적으로 설정되었습니다.')
          navigate('/')
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

      <div className='flex flex-col sm:flex-row justify-center gap-4 pt-8 mb-10'>
        <Button onClick={handleSubmit} disabled={isPending} className='w-full sm:w-auto'>
          {isPending ? '저장 중...' : '설정 완료하기'}
        </Button>
        <Button
          variant='outline'
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
