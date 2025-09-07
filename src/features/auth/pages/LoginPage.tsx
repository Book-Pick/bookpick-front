import { Link } from 'react-router-dom'
import { Button, Input, Card, CardContent, CardFooter } from '@/shared/ui'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '../model/validationSchema'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })

  const navigate = useNavigate()

  const onSubmit = (data: LoginFormData) => {
    console.log('login', data)
    navigate('/onboarding')
  }

  return (
    <div className='max-w-md w-full space-y-8'>
      <div className='text-center'>
        <h2 className='text-3xl font-bold text-gray-900'>로그인</h2>
        <p className='mt-2 text-sm text-gray-600'>계정에 로그인해주세요</p>
      </div>

      <Card>
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

            <div className='text-right'>
              <Link
                to='/forgot-password'
                className='text-sm text-primary hover:text-primary/80 underline'
              >
                비밀번호를 잊으셨나요?
              </Link>
            </div>

            <Button type='submit' variant='default' size='lg' className='w-full'>
              로그인
            </Button>
          </form>
        </CardContent>

        <CardFooter>
          <div className='w-full text-center space-y-2'>
            <p className='text-sm text-gray-600'>
              북픽 회원이 아니신가요?{' '}
              <Link
                to='/register'
                className='text-primary hover:text-primary/80 underline font-medium'
              >
                지금 가입하세요
              </Link>
            </p>
            <Link to='/' className='text-sm text-gray-600 hover:text-gray-900 underline block'>
              홈으로 돌아가기
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
