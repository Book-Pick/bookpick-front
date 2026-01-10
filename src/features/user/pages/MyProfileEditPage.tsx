import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/shared/ui'
import ReadingPreferenceForm from '@/features/curation/components/ReadingPreferenceForm'
import { useReadingPreferenceForm } from '@/features/curation/hooks/useReadingPreferenceForm'
import {
  useGetReadingPreference,
  useUpdateReadingPreference,
} from '@/features/curation/hooks/useCuration'
import ProfileRegisterForm from '@/features/user/components/ProfileRegisterForm'
import { useGetProfile, useUpdateProfile } from '@/features/user/hooks/useUser'
import { profileSettingsSchema, type ProfileSettingsFormData } from '../model/validationSchema'

export default function MyProfileEditPage() {
  const navigate = useNavigate()

  const [profileImage, setProfileImage] = useState<string>('')

  // react-hook-form 설정
  const {
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileSettingsFormData>({
    resolver: zodResolver(profileSettingsSchema),
    mode: 'onTouched',
    defaultValues: {
      nickname: '',
      introduction: '',
    },
  })

  const { data: profile } = useGetProfile()
  const { mutate: updateProfileMutate, isPending: isUpdateProfilePending } = useUpdateProfile()
  const { data: readingPreference } = useGetReadingPreference()
  const { mutate: updateReadingPreferenceMutate, isPending: isUpdateReadingPreferencePending } =
    useUpdateReadingPreference()

  // 프로필 데이터가 로드되면 폼에 세팅
  useEffect(() => {
    if (profile) {
      reset({
        nickname: profile.nickName || '',
        introduction: profile.introduction || '',
      })
      setProfileImage(profile.profileImage || '')
    }
  }, [profile, reset])

  const initialFormData = useMemo(
    () => ({
      mbti: readingPreference?.mbti || '',
      selectedLifeBooks:
        readingPreference?.favoriteBooks?.map((book) => ({
          id: book.id || book.isbn,
          title: book.title,
          author: book.author,
          imageUrl: book.imageUrl,
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

  const onSubmit = (data: ProfileSettingsFormData) => {
    updateProfileMutate({
      nickName: data.nickname,
      introduction: data.introduction,
      profileImage: profileImage,
    })

    // 2. 독서 취향 업데이트
    updateReadingPreferenceMutate(
      {
        mbti: formData.mbti || null,
        favoriteBooks: formData.selectedLifeBooks.map((book) => ({
          id: book.id,
          title: book.title,
          author: book.author,
          imageUrl: book.imageUrl,
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
          navigate('/mypage/dashboard')
        },
      },
    )
  }

  const handleCancel = () => {
    navigate('/mypage/dashboard')
  }

  const onError = () => {
    const nicknameInput = document.getElementById('nickname')
    nicknameInput?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const nickname = watch('nickname')
  const introduction = watch('introduction')

  return (
    <div className='flex flex-col gap-[60px] my-10 max-w-[800px] mx-auto'>
      {/* 프로필 설정 섹션 */}
      <ProfileRegisterForm
        nickname={nickname}
        introduction={introduction}
        profileImage={profileImage}
        onNicknameChange={(value) => setValue('nickname', value, { shouldValidate: true })}
        onIntroductionChange={(value) => setValue('introduction', value)}
        onProfileImageChange={setProfileImage}
        nicknameError={errors.nickname?.message}
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
        <Button
          size='lg'
          onClick={handleSubmit(onSubmit, onError)}
          className='flex-1 sm:flex-none'
          disabled={isUpdateProfilePending || isUpdateReadingPreferencePending}
        >
          {isUpdateProfilePending || isUpdateReadingPreferencePending ? '저장 중...' : '저장하기'}
        </Button>
      </div>
    </div>
  )
}
