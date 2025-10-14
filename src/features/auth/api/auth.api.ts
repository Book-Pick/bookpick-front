import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../types/auth.types'
import { createAxiosClient } from '@/shared/api/axiosClient'

const axios = createAxiosClient(import.meta.env.VITE_APP_BOOKPICK_API_URL)

export const authApi = {
  /**
   * 로그인 API
   */
  login: async (request: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await axios.post('/api/v1/auth/login', request)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as { response?: { status?: number } }
      if (axiosError.response?.status === 400) {
        throw new Error('이메일 혹은 비밀번호를 다시 확인해주세요.')
      }
      throw error
    }
  },

  /**
   * 회원가입 API
   */
  register: async (request: RegisterRequest): Promise<RegisterResponse> => {
    try {
      const response = await axios.post('/api/v1/auth/signup', request)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as { response?: { status?: number } }
      if (axiosError.response?.status === 409) {
        throw new Error('이미 가입된 이메일입니다.')
      }
      throw error
    }
  },

  /**
   * 로그아웃 API
   */
  logout: async (): Promise<void> => {
    const response = await axios.post('/api/v1/auth/logout')
    console.log('로그아웃', response)
  },
}
