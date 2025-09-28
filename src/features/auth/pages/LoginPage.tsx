import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Card, CardContent, CardFooter, CardTitle } from '@/shared/ui'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '../model/validationSchema'
import { useAuth } from '../hooks/useAuth'

export default function LoginPage() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })

  const { useLogin } = useAuth()
  const { mutateAsync: loginMutateAsync, isPending } = useLogin()

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutateAsync(data)
      // 약간의 딜레이 후 navigate (상태 업데이트 보장)
      setTimeout(() => {
        navigate('/onboarding')
      }, 100)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='max-w-md w-full space-y-8'>
      <Card className='px-4 py-10 rounded-2xl'>
        <CardTitle>
          <h2 className='text-2xl font-bold text-gray-900 px-6 mb-5'>로그인</h2>
        </CardTitle>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-2'>
              <label htmlFor='email' className='text-sm font-medium leading-none'>
                이메일 주소
              </label>
              <Input
                id='email'
                type='email'
                placeholder='이메일을 입력해주세요'
                {...register('email')}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && <p className='text-sm text-destructive'>{errors.email.message}</p>}
            </div>

            <div className='space-y-2'>
              <label htmlFor='password' className='text-sm font-medium leading-none'>
                비밀번호
              </label>
              <Input
                id='password'
                type='password'
                placeholder='비밀번호를 입력해주세요'
                {...register('password')}
                className={errors.password ? 'border-destructive' : ''}
              />
              {errors.password && (
                <p className='text-sm text-destructive'>{errors.password.message}</p>
              )}
            </div>

            <Button
              type='submit'
              variant='secondary'
              size='lg'
              className='w-full'
              disabled={isPending}
            >
              {isPending ? '로그인 중...' : '로그인'}
            </Button>
          </form>
        </CardContent>

        <CardFooter>
          <div className='w-full text-center space-y-2 mt-5'>
            <Link
              to='/forgot-password'
              className='text-sm text-gray-600 hover:text-gray-900 underline block'
            >
              비밀번호를 잊으셨나요?
            </Link>
            <Link
              to='/register'
              className='text-sm text-gray-600 hover:text-gray-900 underline block'
            >
              회원가입하기
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
