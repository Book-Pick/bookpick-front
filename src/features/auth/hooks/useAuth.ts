import { useAuth as useAuthContext } from '@/app/providers'
import { authApi } from '../api/auth.api'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type { RegisterRequest, LoginRequest } from '../types/auth.types'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const { user, token, isAuthenticated, isLoading, setAuthState } = useAuthContext()

  /**
   * 로그인
   */
  const useLogin = () => {
    return useMutation({
      mutationFn: async (request: LoginRequest) => {
        setAuthState((prev) => ({ ...prev, isLoading: true }))
        const response = await authApi.login(request)
        return response.data
      },
      onSuccess: (data) => {
        if (data.userId && data.accessToken) {
          const authData = {
            user: {
              userId: data.userId,
              email: data.email,
              nickname: data.nickname,
              bio: data.bio,
              profileImageUrl: data.profileImageUrl,
            },
            token: {
              accessToken: data.accessToken,
            },
          }

          localStorage.setItem('bookpick-auth', JSON.stringify(authData))

          setAuthState({
            user: authData.user,
            token: authData.token,
            isAuthenticated: true,
            isLoading: false,
          })
        } else {
          setAuthState((prev) => ({ ...prev, isLoading: false }))
        }
      },
      onError: (error) => {
        localStorage.removeItem('bookpick-auth')
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        })
        toast.error(error.message || '로그인에 실패했습니다.')
      },
    })
  }

  /**
   * 회원가입
   */
  const useRegister = () => {
    const navigate = useNavigate()
    return useMutation({
      mutationFn: async (request: RegisterRequest) => {
        const response = await authApi.register(request)
        return response.data
      },
      onSuccess: (data) => {
        if (data?.userId) {
          toast.success('회원가입이 완료되었습니다.')
          navigate('/login')
        }
      },
      onError: (error) => {
        toast.error(error.message || '회원가입에 실패했습니다.')
      },
    })
  }

  /**
   * 로그아웃
   */
  const useLogout = () => {
    return useMutation({
      mutationFn: async () => {
        await authApi.logout()
      },
      onSuccess: () => {
        toast.success('로그아웃 되었습니다.')
        location.href = '/'
      },
      onError: (error: Error) => {
        toast.error(error.message || '로그아웃에 실패했습니다.')
      },
      onSettled: () => {
        localStorage.removeItem('bookpick-auth')
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        })
      },
    })
  }

  return {
    // State
    user,
    token,
    isAuthenticated,
    isLoading,

    // Method
    useLogin,
    useRegister,
    useLogout,
  }
}
