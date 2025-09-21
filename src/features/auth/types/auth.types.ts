export interface User {
  id: string
  email: string
  name: string
  profileImage?: string
  role: 'user' | 'curator' | 'admin'
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface RefreshTokenRequest {
  token: string
}
