import { Link } from 'react-router-dom'
import { Button, Input, Card, CardContent, CardFooter, CardTitle } from '@/shared/ui'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterFormData } from '../model/validationSchema'
import { useAuth } from '../hooks/useAuth.ts'

export default function RegisterPage() {
  const { useRegister } = useAuth()
  const { mutate: registerMutate } = useRegister()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema), mode: 'onTouched' })

  const onSubmit = (data: RegisterFormData) => {
    registerMutate({
      email: data.email,
      password: data.password,
    })
  }

  return (
    <div className='max-w-md w-full space-y-8'>
      <Card className='px-4 py-10 rounded-2xl border-0 bg-transparent sm:border sm:bg-card'>
        <CardTitle>
          <h2 className='text-2xl px-0 sm:px-6 mb-5'>회원가입</h2>
        </CardTitle>
        <CardContent className='px-0 sm:px-6'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-2'>
              <label htmlFor='email' className='text-sm font-medium leading-none'>
                이메일 주소
              </label>
              <Input
                id='email'
                type='text'
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

            <Button type='submit' variant='secondary' size='lg' className='w-full'>
              회원가입
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
