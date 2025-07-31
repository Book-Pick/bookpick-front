import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Card } from '@/shared/ui'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // 입력 시 에러 메시지 초기화
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
      confirmPassword: '',
    }

    // 이메일 검증
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.'
    }

    // 비밀번호 검증
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.'
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다.'
    }

    // 비밀번호 확인 검증
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.'
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // 회원가입 로직 구현
      console.log('회원가입 데이터:', formData)
      // TODO: API 호출
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-gray-900'>회원가입</h2>
          <p className='mt-2 text-sm text-gray-600'>새로운 계정을 만들어보세요</p>
        </div>

        <Card variant='default' className='p-8'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                이메일 주소
              </label>
              <Input
                id='email'
                type='email'
                placeholder='이메일을 입력해주세요'
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                state={errors.email ? 'error' : undefined}
                errorMessage={errors.email}
              />
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>
                비밀번호
              </label>
              <Input
                id='password'
                type='password'
                placeholder='비밀번호를 입력해주세요'
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                state={errors.password ? 'error' : undefined}
                errorMessage={errors.password}
              />
            </div>

            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                비밀번호 확인
              </label>
              <Input
                id='confirmPassword'
                type='password'
                placeholder='비밀번호를 다시 입력해주세요'
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                state={errors.confirmPassword ? 'error' : undefined}
                errorMessage={errors.confirmPassword}
              />
            </div>

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
