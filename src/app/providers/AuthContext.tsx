import React, { createContext, useContext } from 'react'
import type { User, Token } from '@/features/auth/types/auth.types'

export interface AuthState {
  user: User | null
  token: Token | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface AuthContextType extends AuthState {
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>
  updateUser: (userData: Partial<User>) => void
  clearAuth: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
