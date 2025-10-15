import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../types/auth.types'
import type { AxiosErrorResponse } from '@/shared/api/api.types'
import { createAxiosClient } from '@/shared/api/axiosClient'

const axios = createAxiosClient(import.meta.env.VITE_APP_BOOKPICK_API_URL)

const urlPrefix = '/api/v1/auth'

export const authApi = {
  login: async (request: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await axios.post(`${urlPrefix}/login`, request)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse
      if (axiosError.response?.status === 401) {
        throw new Error('이메일 혹은 비밀번호를 다시 확인해주세요.')
      }
      throw error
    }
  },
  register: async (request: RegisterRequest): Promise<RegisterResponse> => {
    try {
      const response = await axios.post(`${urlPrefix}/signup`, request)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse
      if (axiosError.response?.status === 409) {
        throw new Error('이미 가입된 이메일입니다.')
      }
      throw error
    }
  },
  logout: async (): Promise<void> => {
    const response = await axios.post(`${urlPrefix}/logout`)
    console.log('로그아웃', response)
  },
}
