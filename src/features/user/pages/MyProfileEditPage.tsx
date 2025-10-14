import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
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

export default function MyProfileEditPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 상태 관리
  const [nickname, setNickname] = useState('')
  const [introduction, setIntroduction] = useState('')
  const [profileImage, setProfileImage] = useState<string>('')

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

  const handleComplete = () => {
    toast.success('프로필 설정이 완료되었습니다.')
    console.log('프로필 설정 완료:', { nickname, introduction, profileImage })
    navigate('/')
  }

  const handleSkip = () => {
    navigate('/')
  }

  return (
    <div className='w-[900px] mx-auto space-y-12'>
      {/* 상단 안내 문구 */}
      <div className='text-center space-y-4 my-15'>
        <h1 className='font-title'>이제 당신을 표현할 차례예요!</h1>
        <p className='text-lg text-muted-foreground leading-normal'>
          닉네임과 한 줄 소개로 당신만의 개성을 드러내 보세요.
        </p>
      </div>

      {/* 통합 프로필 설정 카드 */}
      <Card className='rounded-3xl'>
        <CardHeader className='text-center pb-6 py-6'>
          <CardTitle className='text-2xl font-semibold'>프로필 설정</CardTitle>
        </CardHeader>
        <CardContent className='p-8 pt-0'>
          <div className='grid grid-cols-5 gap-8 items-start'>
            {/* 좌측 40% - 프로필 이미지 설정 */}
            <div className='col-span-2 space-y-4'>
              {/* 프로필 이미지 */}
              <div className='flex flex-col items-center space-y-4'>
                <div
                  className='cursor-pointer hover:opacity-80 transition-opacity'
                  onClick={handleImageClick}
                >
                  <Avatar className='w-24 h-24'>
                    {profileImage ? (
                      <AvatarImage src={profileImage} alt='프로필 이미지' />
                    ) : (
                      <AvatarFallback className='text-3xl bg-muted'>👤</AvatarFallback>
                    )}
                  </Avatar>
                </div>
                <div className='text-center'>
                  <p className='font-medium text-lg'>프로필 이미지</p>
                  <p className='text-sm text-muted-foreground mt-1'>이미지를 클릭하여 변경하세요</p>
                </div>
              </div>
            </div>

            {/* 우측 60% - 입력 필드들 */}
            <div className='col-span-3 space-y-6'>
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

              {/* 우측 하단 버튼 */}
              <div className='flex w-full gap-2 pt-4'>
                <Button variant='outline' onClick={handleSkip} className='flex-1'>
                  건너뛰기
                </Button>
                <Button variant='secondary' onClick={handleComplete} className='flex-1'>
                  시작하기
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
