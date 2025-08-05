import { Link } from 'react-router-dom'
import { Button, Input, Card } from '@/shared/ui'
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

        <Card variant='default' className='p-8'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <Input
              id='email'
              type='email'
              label='이메일 주소'
              placeholder='이메일을 입력해주세요'
              {...register('email')}
              state={errors.email ? 'error' : undefined}
              errorMessage={errors.email?.message}
            />

            <Input
              id='password'
              type='password'
              label='비밀번호'
              placeholder='비밀번호를 입력해주세요'
              {...register('password')}
              state={errors.password ? 'error' : undefined}
              errorMessage={errors.password?.message}
            />

            <Input
              id='confirmPassword'
              type='password'
              label='비밀번호 확인'
              placeholder='비밀번호를 다시 입력해주세요'
              {...register('confirmPassword')}
              state={errors.confirmPassword ? 'error' : undefined}
              errorMessage={errors.confirmPassword?.message}
            />

            <Button type='submit' variant='primary' size='lg' className='w-full'>
              회원가입
            </Button>
          </form>

          <div className='mt-6 text-center space-y-2'>
            <Link to='/login' className='text-sm text-gray-600 hover:text-gray-900 underline'>
              이미 계정이 있으신가요? 로그인하기
            </Link>
            <br />
            <Link to='/' className='text-sm text-gray-600 hover:text-gray-900 underline'>
              홈으로 돌아가기
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
