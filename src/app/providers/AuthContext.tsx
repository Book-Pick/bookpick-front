import React, { createContext, useContext } from 'react'
import type { User } from '@/features/auth/types/auth.types'

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface AuthContextType extends AuthState {
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>
  햣: (userData: Partial<User>) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
