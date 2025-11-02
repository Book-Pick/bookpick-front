import React, { useState, useEffect, useCallback } from 'react'
import { AuthContext } from './AuthContext'
import type { AuthState } from './AuthContext'
import type { User } from '@/features/auth/types/auth.types'

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    isFirstLogin: false,
  })

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const authData = localStorage.getItem('bookpick-auth')
        if (authData) {
          const parsedAuth = JSON.parse(authData)
          if (parsedAuth.user?.userId && parsedAuth.token?.accessToken) {
            setAuthState({
              user: parsedAuth.user,
              token: parsedAuth.token,
              isAuthenticated: true,
              isLoading: false,
              isFirstLogin: false,
            })
            return
          }
        }
      } catch (error) {
        console.error('Failed to parse auth data:', error)
        localStorage.removeItem('bookpick-auth')
      }
      setAuthState((prev) => ({ ...prev, isLoading: false }))
    }

    initializeAuth()
  }, [])

  const updateUser = useCallback((userData: Partial<User>) => {
    setAuthState((prev) => {
      if (!prev.user) return prev

      const updatedUser = { ...prev.user, ...userData }
      const authData = {
        user: updatedUser,
        token: prev.token,
      }

      localStorage.setItem('bookpick-auth', JSON.stringify(authData))

      return {
        ...prev,
        user: updatedUser,
      }
    })
  }, [])

  /**
   * 모든 인증 정보를 완전히 초기화
   */
  const clearAuth = useCallback(() => {
    localStorage.removeItem('bookpick-auth')
    // sessionStorage도 확인하여 제거 (혹시 있을 수 있는 세션 데이터)
    sessionStorage.removeItem('bookpick-auth')

    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      isFirstLogin: false,
    })
  }, [])

  const contextValue = {
    ...authState,
    setAuthState,
    updateUser,
    clearAuth,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
