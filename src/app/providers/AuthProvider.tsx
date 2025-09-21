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
  })

  // 초기 로드 시 localStorage에서 인증 정보 복원
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const authData = localStorage.getItem('auth')
        if (authData) {
          const parsedAuth = JSON.parse(authData)
          if (parsedAuth.isLogin === 'true' && parsedAuth.token) {
            setAuthState({
              user: parsedAuth.user || null,
              token: parsedAuth.token,
              isAuthenticated: true,
              isLoading: false,
            })
            return
          }
        }
      } catch (error) {
        console.error('Failed to parse auth data:', error)
        localStorage.removeItem('auth')
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
        isLogin: 'true',
        token: prev.token,
        user: updatedUser,
      }

      localStorage.setItem('auth', JSON.stringify(authData))

      return {
        ...prev,
        user: updatedUser,
      }
    })
  }, [])

  const contextValue = {
    ...authState,
    setAuthState,
    updateUser,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
