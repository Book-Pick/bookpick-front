import { useRef } from 'react'
import { Input, Textarea, Avatar, AvatarImage } from '@/shared/ui'
import toast from 'react-hot-toast'
import { useImageUpload } from '@/shared/hooks'
import { validateImageFile, fileToDataURL } from '@/shared/utils/imageValidation'
import Thumbnail from '@/shared/components/Thumbnail'

interface ProfileRegisterFormProps {
  nickname: string
  introduction: string
  profileImage: string
  onNicknameChange: (value: string) => void
  onIntroductionChange: (value: string) => void
  onProfileImageChange: (imageUrl: string) => void
  nicknameError?: string
}

export default function ProfileRegisterForm({
  nickname,
  introduction,
  profileImage,
  onNicknameChange,
  onIntroductionChange,
  onProfileImageChange,
  nicknameError,
}: ProfileRegisterFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 이미지 업로드 훅
  const { mutate: uploadImageMutate, isPending: isImageUploading } = useImageUpload()

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
      onProfileImageChange(dataUrl)
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
          onProfileImageChange(imageUrl)
          toast.success('이미지가 업로드되었습니다.')
        },
        onError: (error) => {
          console.error(error)
          toast.error(error.message || '이미지 업로드에 실패했습니다.')
          onProfileImageChange('') // 실패 시 초기화
        },
      },
    )
  }

  return (
    <div className='max-w-[700px] mx-auto w-full'>
      <h2 className='font-title mb-8 md:mb-10 text-center'>프로필 설정</h2>
      <div className='grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-6 items-start'>
        {/* 프로필 이미지 설정 - 모바일에서는 상단, 데스크톱에서는 좌측 40% */}
        <div className='md:col-span-2 space-y-4'>
          {/* 프로필 이미지 */}
          <div className='flex flex-col items-center space-y-3 md:space-y-4 mt-4'>
            <div
              className='relative cursor-pointer hover:opacity-80 transition-opacity'
              onClick={handleImageClick}
            >
              {profileImage ? (
                <Avatar className='w-20 h-20 md:w-24 md:h-24'>
                  <AvatarImage src={profileImage} alt='프로필 이미지' className='object-cover' />
                </Avatar>
              ) : (
                <Thumbnail className='w-20 h-20 md:w-24 md:h-24 rounded-full' />
              )}
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
        <div className='md:col-span-3 space-y-4 md:space-y-5'>
          {/* 닉네임 */}
          <div className='space-y-2'>
            <label htmlFor='nickname' className='text-sm font-medium'>
              닉네임 <span className='text-destructive'>*</span>
            </label>
            <Input
              id='nickname'
              placeholder='닉네임을 입력하세요'
              value={nickname}
              onChange={(e) => onNicknameChange(e.target.value)}
              className={nicknameError ? 'border-destructive' : ''}
              maxLength={20}
            />
            {nicknameError && <p className='text-sm text-destructive'>{nicknameError}</p>}
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
              onChange={(e) => onIntroductionChange(e.target.value)}
              maxLength={100}
              className='min-h-[80px] resize-none'
            />
            <div className='text-right text-xs text-muted-foreground'>
              {introduction.length}/100
            </div>
          </div>
        </div>
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
