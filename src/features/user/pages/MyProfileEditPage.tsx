import { useState } from 'react'
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
  CardTitle,
} from '@/shared/ui'

export default function MyProfileEditPage() {
  const navigate = useNavigate()

  // 상태 관리
  const [nickname, setNickname] = useState('')
  const [introduction, setIntroduction] = useState('')
  const [profileImage, setProfileImage] = useState<string>('')

  const handleImageUpload = () => {
    console.log('이미지 업로드')
  }

  const handleComplete = () => {
    console.log('프로필 설정 완료:', { nickname, introduction, profileImage })
    navigate('/')
  }

  const handleSkip = () => {
    navigate('/')
  }

  return (
    <div className='w-[900px] mx-auto space-y-12'>
      {/* 상단 안내 문구 */}
      <div className='text-center space-y-4'>
        <h1 className='font-title'>이제 당신을 표현할 차례예요!</h1>
        <p className='text-lg text-muted-foreground leading-normal'>
          닉네임과 한 줄 소개로 당신만의 개성을 드러내 보세요.
        </p>
      </div>

      {/* 중앙 프로필 정보 입력 */}
      <Card className='rounded-3xl'>
        <CardContent className='p-8'>
          <div className='grid grid-cols-5 gap-8 items-center'>
            {/* 좌측 40% - 제목 */}
            <div className='col-span-2 flex items-center'>
              <CardTitle className='text-2xl font-semibold'>프로필 설정</CardTitle>
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
                <Button onClick={handleComplete} className='flex-1'>
                  시작하기
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 하단 프로필 이미지 설정 */}
      <Card className='rounded-3xl'>
        <CardContent className='p-8'>
          <div className='flex items-center justify-between'>
            {/* 좌측 - 프로필 이미지와 안내 */}
            <div className='flex items-center gap-6'>
              <Avatar className='w-20 h-20'>
                {profileImage ? (
                  <AvatarImage src={profileImage} alt='프로필 이미지' />
                ) : (
                  <AvatarFallback className='text-2xl bg-muted'>👤</AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className='font-medium text-lg'>기본 프로필 이미지</p>
                <p className='text-sm text-muted-foreground mt-1'>프로필 이미지를 설정해 주세요.</p>
              </div>
            </div>

            {/* 우측 - 이미지 변경 버튼 */}
            <Button onClick={handleImageUpload}>이미지 변경</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
