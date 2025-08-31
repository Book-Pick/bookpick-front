import { Link } from 'react-router-dom'
import { Button, Input, Card, CardContent, CardFooter } from '@/shared/ui'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterFormData } from '../model/validationSchema'

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) })

  const onSubmit = (data: RegisterFormData) => console.log(data)

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-gray-900'>회원가입</h2>
          <p className='mt-2 text-sm text-gray-600'>새로운 계정을 만들어보세요</p>
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

              <div className='space-y-2'>
                <label htmlFor='confirmPassword' className='text-sm font-medium leading-none'>
                  비밀번호 확인
                </label>
                <Input
                  id='confirmPassword'
                  type='password'
                  placeholder='비밀번호를 다시 입력해주세요'
                  {...register('confirmPassword')}
                  className={errors.confirmPassword ? 'border-destructive' : ''}
                />
                {errors.confirmPassword && (
                  <p className='text-sm text-destructive'>{errors.confirmPassword.message}</p>
                )}
              </div>

              <Button type='submit' variant='default' size='lg' className='w-full'>
                회원가입
              </Button>
            </form>
          </CardContent>

          <CardFooter>
            <div className='w-full text-center space-y-2'>
              <Link
                to='/login'
                className='text-sm text-gray-600 hover:text-gray-900 underline block'
              >
                이미 계정이 있으신가요? 로그인하기
              </Link>
              <Link to='/' className='text-sm text-gray-600 hover:text-gray-900 underline block'>
                홈으로 돌아가기
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
