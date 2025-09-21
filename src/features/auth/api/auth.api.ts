import type { User, LoginRequest, AuthResponse, RegisterRequest } from '../types/auth.types'

// Mock API 함수들
export const authApi = {
  /**
   * 로그인 API
   */
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    // TODO: 실제 API 호출로 대체
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // })
    // return response.json()

    // Mock 데이터 반환
    await new Promise((resolve) => setTimeout(resolve, 1000)) // 네트워크 지연 시뮬레이션

    const mockUser: User = {
      id: '1',
      email: data.email,
      name: data.email.split('@')[0],
      role: 'user',
    }

    return {
      user: mockUser,
      token: 'mock-jwt-token',
    }
  },

  /**
   * 회원가입 API
   */
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    // TODO: 실제 API 호출로 대체
    // const response = await fetch('/api/auth/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // })
    // return response.json()

    // Mock 데이터 반환
    await new Promise((resolve) => setTimeout(resolve, 1000)) // 네트워크 지연 시뮬레이션

    const mockUser: User = {
      id: '1',
      email: data.email,
      name: data.name,
      role: 'user',
    }

    return {
      user: mockUser,
      token: 'mock-jwt-token',
    }
  },

  /**
   * 토큰 갱신 API
   */
  refreshToken: async (): Promise<{ token: string }> => {
    // TODO: 실제 API 호출로 대체
    // const response = await fetch('/api/auth/refresh', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // })
    // return response.json()

    // Mock 데이터 반환
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      token: 'new-mock-jwt-token',
    }
  },

  /**
   * 로그아웃 API
   */
  logout: async (): Promise<void> => {
    // TODO: 실제 API 호출로 대체
    // await fetch('/api/auth/logout', {
    //   method: 'POST',
    //   headers: { 'Authorization': `Bearer ${token}` }
    // })

    // Mock 데이터 반환
    await new Promise((resolve) => setTimeout(resolve, 300))
  },
}
