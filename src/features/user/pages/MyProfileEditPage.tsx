import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/ui'
import toast from 'react-hot-toast'
import ReadingPreferenceForm from '@/features/curation/components/ReadingPreferenceForm'
import { useReadingPreferenceForm } from '@/features/curation/hooks/useReadingPreferenceForm'
import {
  useGetReadingPreference,
  useUpdateReadingPreference,
} from '@/features/curation/hooks/useCuration'
import ProfileRegisterForm from '@/features/user/components/ProfileRegisterForm'
import { useAuth } from '@/app/providers/AuthContext'

export default function MyProfileEditPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  // 프로필 상태
  const [nickname, setNickname] = useState('')
  const [introduction, setIntroduction] = useState('')
  const [profileImage, setProfileImage] = useState<string>('')

  // 프로필/독서 취향 정보 유무에 따라 api 호출 방식 결정(생성/수정)
  const isEmptyProfile = useMemo(() => {
    return user?.nickname === null || user?.profileImageUrl === null
  }, [user?.nickname, user?.profileImageUrl])

  const { data: readingPreference } = useGetReadingPreference()
  const { mutate: updateReadingPreferenceMutate, isPending } = useUpdateReadingPreference()

  const initialFormData = useMemo(
    () => ({
      mbti: readingPreference?.mbti || '',
      // 임시 처리
      selectedLifeBooks:
        readingPreference?.favoriteBooks?.map((book) => ({
          id: book.isbn || '',
          title: book.title,
          author: book.authors.join(', '),
          isbn: book.isbn || '',
        })) || [],
      selectedAuthors: readingPreference?.favoriteAuthors?.map((author) => author.name) || [],
      readingMoods: readingPreference?.moods || [],
      readingHabits: readingPreference?.readingHabits || [],
      genres: readingPreference?.genres || [],
      keywords: readingPreference?.keywords || [],
      readingStyles: readingPreference?.readingStyles || [],
    }),
    [readingPreference],
  )

  const { formData, handlers } = useReadingPreferenceForm(initialFormData)

  const handleSave = () => {
    // Todo: 1. 프로필 저장
    console.log('isEmptyProfile이 true면 생성 아니면 업데이트', isEmptyProfile)

    // 2. 독서 취향 설정
    updateReadingPreferenceMutate(
      {
        mbti: formData.mbti || null,
        favoriteBooks: formData.selectedLifeBooks.map((book) => ({
          title: book.title,
          authors: [book.author],
          isbn: book.isbn,
        })),
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
        },
      },
    )
  }

  const handleCancel = () => {
    navigate('/mypage/dashboard')
  }

  return (
    <div className='flex flex-col gap-[60px] my-10 max-w-[800px] mx-auto'>
      {/* 프로필 설정 섹션 */}
      <ProfileRegisterForm
        nickname={nickname}
        introduction={introduction}
        profileImage={profileImage}
        onNicknameChange={setNickname}
        onIntroductionChange={setIntroduction}
        onProfileImageChange={setProfileImage}
      />

      {/* Divider */}
      <div className='w-full h-px bg-border' />

      {/* 독서 취향 설정 */}
      <ReadingPreferenceForm formData={formData} handlers={handlers} />

      {/* 하단 버튼 */}
      <div className='flex justify-center gap-4 pt-8 mb-10'>
        <Button variant='outline' size='lg' onClick={handleCancel} className='flex-1 sm:flex-none'>
          취소하기
        </Button>
        <Button size='lg' onClick={handleSave} className='flex-1 sm:flex-none' disabled={isPending}>
          {isPending ? '저장 중...' : '저장하기'}
        </Button>
      </div>
    </div>
  )
}
