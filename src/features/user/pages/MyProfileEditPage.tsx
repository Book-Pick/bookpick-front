import { useState, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Textarea, Avatar, AvatarImage, AvatarFallback } from '@/shared/ui'
import toast from 'react-hot-toast'
import ReadingPreferenceForm from '@/features/curation/components/ReadingPreferenceForm'
import { useReadingPreferenceForm } from '@/features/curation/hooks/useReadingPreferenceForm'
import {
  useGetReadingPreference,
  useUpdateReadingPreference,
} from '@/features/curation/hooks/useCuration'

// Todo: 이 페이지가 첫 프로필 설정, 독서 취향 설정일 경우 고려 필요! =>
// 프로필 수정 버튼에서부터 프로필 정보/독서 취향 정보가 없으면 프로필 세팅 페이지로 보내는게 나을 것 같음(/onboarding)

export default function MyProfileEditPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 프로필 상태
  const [nickname, setNickname] = useState('')
  const [introduction, setIntroduction] = useState('')
  const [profileImage, setProfileImage] = useState<string>('')

  const { data: readingPreference } = useGetReadingPreference()
  const { mutate: updateReadingPreferenceMutate, isPending } = useUpdateReadingPreference()

  const initialFormData = useMemo(
    () => ({
      mbti: readingPreference?.mbti || '',
      // 임시 처리
      selectedLifeBooks:
        readingPreference?.favoriteBooks?.map((title) => ({
          id: title,
          title: title,
          author: '알 수 없음',
          isbn: '',
        })) || [],
      selectedAuthors: readingPreference?.authors || [],
      readingMoods: readingPreference?.moods || [],
      readingHabits: readingPreference?.readingHabits || [],
      genres: readingPreference?.genres || [],
      keywords: readingPreference?.keywords || [],
      readingStyles: readingPreference?.trends || [],
    }),
    [readingPreference],
  )

  const { formData, handlers } = useReadingPreferenceForm(initialFormData)

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setProfileImage(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    // Todo: 1. 프로필 저장
    // 2. 독서 취향 설정
    updateReadingPreferenceMutate(
      {
        mbti: formData.mbti || null,
        favoriteBooks: formData.selectedLifeBooks.map((book) => book.title),
        // authors: formData.selectedAuthors,
        moods: formData.readingMoods,
        readingHabits: formData.readingHabits,
        genres: formData.genres,
        keywords: formData.keywords,
        trends: formData.readingStyles,
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
      <div className='max-w-[700px] mx-auto w-full'>
        <h2 className='font-title mb-8 md:mb-10 text-center'>프로필 설정</h2>
        <div className='grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-6 items-start'>
          {/* 프로필 이미지 설정 - 모바일에서는 상단, 데스크톱에서는 좌측 40% */}
          <div className='md:col-span-2 space-y-4'>
            {/* 프로필 이미지 */}
            <div className='flex flex-col items-center space-y-3 md:space-y-4 mt-4'>
              <div
                className='cursor-pointer hover:opacity-80 transition-opacity'
                onClick={handleImageClick}
              >
                <Avatar className='w-20 h-20 md:w-24 md:h-24'>
                  {profileImage ? (
                    <AvatarImage src={profileImage} alt='프로필 이미지' />
                  ) : (
                    <AvatarFallback className='text-2xl md:text-3xl bg-muted'>👤</AvatarFallback>
                  )}
                </Avatar>
              </div>
              <div className='text-center'>
                <p className='font-medium text-base md:text-lg'>프로필 이미지</p>
                <p className='text-xs md:text-sm text-muted-foreground mt-1'>
                  이미지를 클릭하여 변경하세요
                </p>
              </div>
            </div>
          </div>

          {/* 입력 필드들 - 모바일에서는 하단, 데스크톱에서는 우측 60% */}
          <div className='md:col-span-3 space-y-4 md:space-y-5'>
            {/* 닉네임 */}
            <div className='space-y-2'>
              <label htmlFor='nickname' className='text-sm font-medium'>
                닉네임
              </label>
              <Input
                id='nickname'
                placeholder='닉네임을 입력하세요'
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                maxLength={20}
              />
            </div>

            {/* 한 줄 소개 */}
            <div className='space-y-2'>
              <label htmlFor='introduction' className='text-sm font-medium'>
                한 줄 소개
              </label>
              <Textarea
                id='introduction'
                placeholder='당신을 소개하는 한 줄을 작성해주세요 (최대 100자)'
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                maxLength={100}
                className='min-h-[80px] resize-none'
              />
              <div className='text-right text-xs text-muted-foreground'>
                {introduction.length}/100
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className='w-full h-px bg-border' />

      {/* 독서 취향 설정 */}
      <ReadingPreferenceForm formData={formData} handlers={handlers} />

      {/* 하단 버튼 */}
      <div className='flex justify-center gap-4 pt-8 mb-10'>
        <Button variant='outline' size='lg' onClick={handleCancel} className='flex-1 sm:flex-none'>
          취소하기
        </Button>
        <Button
          variant='secondary'
          size='lg'
          onClick={handleSave}
          className='flex-1 sm:flex-none'
          disabled={isPending}
        >
          {isPending ? '저장 중...' : '저장하기'}
        </Button>
      </div>

      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        onChange={handleFileChange}
        className='hidden'
      />
    </div>
  )
}
