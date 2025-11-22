import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Input,
  Textarea,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/ui'
import toast from 'react-hot-toast'
import { useCreateProfile } from '../hooks/useUser'
import { profileSettingsSchema, type ProfileSettingsFormData } from '../model/validationSchema'
import { generateRandomNickname } from '../constants/nicknameGenerator'
import { useImageUpload } from '@/shared/hooks'
import { validateImageFile, fileToDataURL } from '@/shared/utils/imageValidation'

export default function MyProfileSettingsPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [profileImage, setProfileImage] = useState<string>('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProfileSettingsFormData>({
    resolver: zodResolver(profileSettingsSchema),
    mode: 'onTouched',
    defaultValues: {
      nickname: '',
      introduction: '',
    },
  })

  useEffect(() => {
    const randomNickname = generateRandomNickname()
    setValue('nickname', randomNickname)
  }, [setValue])

  const { mutateAsync: createProfileMutateAsync, isPending } = useCreateProfile()

  // 이미지 업로드 훅
  const { mutate: uploadImageMutate, isPending: isImageUploading } = useImageUpload()

  const introduction = watch('introduction')

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // 1. 이미지 파일 검증
    const validation = validateImageFile(file, { maxSizeMB: 5 })
    if (!validation.isValid) {
      toast.error(validation.error || '유효하지 않은 파일입니다.')
      return
    }

    // 2. 로컬 미리보기 (즉시 표시)
    try {
      const dataUrl = await fileToDataURL(file)
      setProfileImage(dataUrl)
    } catch (error) {
      console.error(error)
      toast.error('이미지를 불러오는데 실패했습니다.')
      return
    }

    // 3. S3에 업로드 (백그라운드)
    uploadImageMutate(
      { file, type: 'profile' },
      {
        onSuccess: (imageUrl) => {
          setProfileImage(imageUrl)
          toast.success('이미지가 업로드되었습니다.')
        },
        onError: (error) => {
          console.error(error)
          toast.error(error.message || '이미지 업로드에 실패했습니다.')
          setProfileImage('') // 실패 시 초기화
        },
      },
    )
  }

  const onSubmit = async (data: ProfileSettingsFormData) => {
    try {
      const response = await createProfileMutateAsync({
        nickName: data.nickname,
        introduction: data.introduction,
        profileImage: profileImage,
      })
      if (response?.userId) {
        navigate(`/onboarding/reading-preference`)
      }
    } catch (error) {
      console.error(error)
      toast.error('프로필 설정에 실패했습니다.')
    }
  }

  return (
    <div className='max-w-[900px] w-full mx-auto space-y-8 md:space-y-12 px-4 md:px-6'>
      {/* 상단 안내 문구 */}
      <div className='text-center space-y-3 md:space-y-4 my-8 md:my-15'>
        <h1 className='font-title text-2xl md:text-4xl'>이제 당신을 표현할 차례예요!</h1>
        <p className='text-base md:text-lg text-muted-foreground leading-normal'>
          닉네임과 한 줄 소개로 당신만의 개성을 드러내 보세요.
        </p>
      </div>

      {/* 통합 프로필 설정 카드 */}
      <Card className='rounded-2xl md:rounded-3xl'>
        <CardHeader className='text-center pb-4 md:pb-6 py-4 md:py-6'>
          <CardTitle className='text-xl md:text-2xl font-semibold'>프로필 설정</CardTitle>
        </CardHeader>
        <CardContent className='p-4 md:p-8 pt-0'>
          <div className='grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-start'>
            {/* 프로필 이미지 설정  */}
            <div className='md:col-span-2 space-y-4'>
              <div className='flex flex-col items-center space-y-3 md:space-y-4'>
                <div
                  className='relative cursor-pointer hover:opacity-80 transition-opacity'
                  onClick={handleImageClick}
                >
                  <Avatar className='w-20 h-20 md:w-24 md:h-24'>
                    {profileImage ? (
                      <AvatarImage src={profileImage} alt='프로필 이미지' />
                    ) : (
                      <AvatarFallback className='text-2xl md:text-3xl bg-muted'>👤</AvatarFallback>
                    )}
                  </Avatar>
                  {/* 업로드 중 표시 */}
                  {isImageUploading && (
                    <div className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-full'>
                      <span className='text-white text-xs'>업로드 중...</span>
                    </div>
                  )}
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
            <div className='md:col-span-3 space-y-5 md:space-y-6'>
              <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 md:space-y-6'>
                {/* 닉네임 */}
                <div className='space-y-2'>
                  <label htmlFor='nickname' className='text-sm font-medium'>
                    닉네임 <span className='text-destructive'>*</span>
                  </label>
                  <Input
                    id='nickname'
                    placeholder='닉네임을 입력하세요'
                    {...register('nickname')}
                    className={errors.nickname ? 'border-destructive' : ''}
                    maxLength={20}
                  />
                  {errors.nickname && (
                    <p className='text-sm text-destructive'>{errors.nickname.message}</p>
                  )}
                </div>

                {/* 한 줄 소개 */}
                <div className='space-y-2'>
                  <label htmlFor='introduction' className='text-sm font-medium'>
                    한 줄 소개
                  </label>
                  <Textarea
                    id='introduction'
                    placeholder='당신을 소개하는 한 줄을 작성해주세요 (최대 100자)'
                    {...register('introduction')}
                    className={`min-h-[80px] resize-none ${errors.introduction ? 'border-destructive' : ''}`}
                    maxLength={100}
                  />
                  <div className='flex justify-between items-center'>
                    {errors.introduction && (
                      <p className='text-sm text-destructive'>{errors.introduction.message}</p>
                    )}
                    <div
                      className={`text-xs text-muted-foreground ${errors.introduction ? '' : 'ml-auto'}`}
                    >
                      {introduction?.length || 0}/100
                    </div>
                  </div>
                </div>

                <div className='flex w-full pt-2 md:pt-4'>
                  <Button type='submit' className='flex-1' disabled={isPending || isImageUploading}>
                    {isPending
                      ? '저장 중...'
                      : isImageUploading
                        ? '이미지 업로드 중...'
                        : '독서 취향 설정 하러가기'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 이미지 업로드 */}
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
