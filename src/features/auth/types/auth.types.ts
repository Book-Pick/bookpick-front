import type { ApiResponse } from '@/shared/api/api.types'

export interface User {
  userId: number
  email: string
  nickname?: string | null
  bio?: string | null
  profileImageUrl?: string | null
  role?: 'user' | 'curator' | 'admin' // 필요할지 논의 필요
}

export interface Token {
  accessToken: string
  grantType?: string
  refreshToken?: string
}

// Request Type
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
}

// Result Type
export interface LoginResult extends User {
  accessToken: string
}

export interface RegisterResult {
  userId: number
}

export interface AuthResponse {
  user: User
  token: Token
}

// Response Type
export type RegisterResponse = ApiResponse<RegisterResult>
export type LoginResponse = ApiResponse<LoginResult>
