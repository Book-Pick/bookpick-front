import { useCallback } from 'react'
import { useAuth as useAuthContext } from '@/app/providers'
import { authApi } from '../api/auth.api'

/**
 * 인증 관련 비즈니스 로직을 처리하는 커스텀 훅
 * API 호출과 Context 상태 업데이트를 담당
 */
export const useAuth = () => {
  const { user, token, isAuthenticated, isLoading, setAuthState, updateUser } = useAuthContext()

  /**
   * 로그인
   */
  const login = useCallback(
    async (email: string, password: string) => {
      setAuthState((prev) => ({ ...prev, isLoading: true }))

      try {
        const response = await authApi.login({ email, password })

        const authData = {
          isLogin: 'true',
          token: response.token,
          user: response.user,
        }

        console.log('auth', authData)

        localStorage.setItem('auth', JSON.stringify(authData))

        setAuthState({
          user: response.user,
          token: response.token,
          isAuthenticated: true,
          isLoading: false,
        })
      } catch (error) {
        setAuthState((prev) => ({ ...prev, isLoading: false }))
        throw error
      }
    },
    [setAuthState],
  )

  /**
   * 회원가입
   */
  const register = useCallback(
    async (email: string, password: string, name: string) => {
      setAuthState((prev) => ({ ...prev, isLoading: true }))

      try {
        const response = await authApi.register({ email, password, name })

        const authData = {
          isLogin: 'true',
          token: response.token,
          user: response.user,
        }

        localStorage.setItem('auth', JSON.stringify(authData))

        setAuthState({
          user: response.user,
          token: response.token,
          isAuthenticated: true,
          isLoading: false,
        })
      } catch (error) {
        setAuthState((prev) => ({ ...prev, isLoading: false }))
        throw error
      }
    },
    [setAuthState],
  )

  /**
   * 로그아웃
   */
  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Logout API error:', error)
      // API 에러가 있어도 로컬 로그아웃은 진행
    } finally {
      localStorage.removeItem('auth')
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }
  }, [setAuthState])

  /**
   * 사용자 정보 업데이트
   */
  const updateUserInfo = useCallback(
    (userData: Partial<NonNullable<typeof user>>) => {
      if (!user) return

      const updatedUser = { ...user, ...userData }
      const authData = {
        isLogin: 'true',
        token,
        user: updatedUser,
      }

      localStorage.setItem('auth', JSON.stringify(authData))
      updateUser(userData)
    },
    [user, token, updateUser],
  )

  /**
   * 토큰 갱신
   */
  const refreshToken = useCallback(async () => {
    if (!token) return

    try {
      const response = await authApi.refreshToken()

      const authData = {
        isLogin: 'true',
        token: response.token,
        user,
      }

      localStorage.setItem('auth', JSON.stringify(authData))

      setAuthState((prev) => ({
        ...prev,
        token: response.token,
      }))
    } catch (error) {
      // 토큰 갱신 실패 시 로그아웃
      await logout()
      throw error
    }
  }, [token, user, setAuthState, logout])

  return {
    // 상태
    user,
    token,
    isAuthenticated,
    isLoading,

    // 메서드
    login,
    register,
    logout,
    updateUser: updateUserInfo,
    refreshToken,
  }
}
