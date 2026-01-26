import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Card, CardContent, CardFooter, CardTitle } from '@/shared/ui'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { registerSchema, type RegisterFormData } from '../model/validationSchema'
import { useAuth } from '../hooks/useAuth.ts'
import { useCreateProfile } from '@/features/user/hooks/useUser'
import { generateRandomNickname } from '@/features/user/constants/nicknameGenerator'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { useRegister, useLogin } = useAuth()
  const { mutateAsync: registerAsync } = useRegister()
  const { mutateAsync: loginAsync } = useLogin()
  const { mutateAsync: createProfileAsync } = useCreateProfile()
  const [isProcessing, setIsProcessing] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema), mode: 'onTouched' })

  const onSubmit = async (data: RegisterFormData) => {
    setIsProcessing(true)
    try {
      // 1. 회원가입
      const result = await registerAsync({ email: data.email, password: data.password })
      if (!result?.userId) throw new Error('회원가입 실패')

      toast.success('회원가입이 완료되었습니다.')

      // 2. 자동 로그인
      await loginAsync({ email: data.email, password: data.password })

      // 3. 랜덤 닉네임으로 기본 프로필 생성
      const randomNickname = generateRandomNickname()
      await createProfileAsync({
        nickName: randomNickname,
        introduction: '',
        profileImage: '',
      })

      // 4. 홈으로 이동
      navigate('/')
    } catch (error) {
      console.error('회원가입 프로세스 실패:', error)
      navigate('/login') // 실패 시 로그인 페이지로 폴백
    } finally {
      setIsProcessing(false)
    }
  }

  const isLoading = isProcessing

  return (
    <div className='max-w-md w-full space-y-8'>
      <Link to='/' className='block text-center mb-6'>
        <h1 className='text-3xl font-wanted font-bold'>BOOKPICK</h1>
      </Link>
      <Card className='px-4 py-10 rounded-2xl border-0 bg-transparent sm:border sm:bg-card'>
        <CardTitle>
          <h2 className='text-2xl px-0 sm:px-6 mb-5'>회원가입</h2>
        </CardTitle>
        <CardContent className='px-0 sm:px-6'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <Input
                id='email'
                type='text'
                placeholder='이메일'
                {...register('email')}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && <p className='text-sm text-destructive'>{errors.email.message}</p>}
            </div>

            <div>
              <Input
                id='password'
                type='password'
                placeholder='비밀번호'
                {...register('password')}
                className={errors.password ? 'border-destructive' : ''}
              />
              {errors.password && (
                <p className='text-sm text-destructive'>{errors.password.message}</p>
              )}
            </div>

            <div>
              <Input
                id='confirmPassword'
                type='password'
                placeholder='비밀번호 확인'
                {...register('confirmPassword')}
                className={errors.confirmPassword ? 'border-destructive' : ''}
              />
              {errors.confirmPassword && (
                <p className='text-sm text-destructive'>{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? '회원가입 중...' : '회원가입'}
            </Button>
          </form>
        </CardContent>

        <CardFooter>
          <div className='w-full text-center space-y-2 mt-5'>
            <Link to='/login' className='text-sm text-gray-600 hover:text-gray-900 underline block'>
              로그인 화면으로 가기
            </Link>
            <Link to='/' className='text-sm text-gray-600 hover:text-gray-900 underline block'>
              홈으로 돌아가기
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
