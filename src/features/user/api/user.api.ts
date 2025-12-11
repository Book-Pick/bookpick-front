import type {
  GetProfileResponse,
  CreateProfileRequest,
  CreateProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  SubscribeRequest,
  SubscribeResponse,
  GetSubscriptionsRequest,
  GetSubscriptionsResponse,
} from '../types/user.types'
import type { AxiosErrorResponse } from '@/shared/api/api.types'
import { createAxiosClient } from '@/shared/api/axiosClient'

const axios = createAxiosClient(import.meta.env.VITE_APP_BOOKPICK_API_URL)
const urlPrefix = '/api/v1'

export const userApi = {
  /**
   * 프로필 조회
   */
  getProfile: async (): Promise<GetProfileResponse> => {
    try {
      const response = await axios.get(`${urlPrefix}/profiles/me`)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse
      console.error('getProfile error', axiosError.response)
      throw error
    }
  },

  /**
   * 프로필 등록
   */
  createProfile: async (request: CreateProfileRequest): Promise<CreateProfileResponse> => {
    try {
      const response = await axios.patch(`${urlPrefix}/profiles/me`, request)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse
      if (axiosError.response?.status === 400) {
        throw new Error('잘못된 요청입니다.')
      } else if (axiosError.response?.status === 409) {
        throw new Error('이미 프로필이 존재합니다.')
      }
      throw error
    }
  },

  /**
   * 프로필 수정
   */
  updateProfile: async (request: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
    try {
      const response = await axios.patch(`${urlPrefix}/profiles/me`, request)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse
      if (axiosError.response?.status === 400) {
        throw new Error('잘못된 요청입니다.')
      }
      if (axiosError.response?.status === 404) {
        throw new Error('프로필을 찾을 수 없습니다.')
      }
      throw error
    }
  },

  /**
   * 큐레이터 구독/취소 (토글)
   */
  subscribe: async (request: SubscribeRequest): Promise<SubscribeResponse> => {
    try {
      const response = await axios.post(`${urlPrefix}/subscribe`, request)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse
      if (axiosError.response?.status === 400) {
        throw new Error('잘못된 요청입니다.')
      }
      if (axiosError.response?.status === 404) {
        throw new Error('추천사를 찾을 수 없습니다.')
      }
      throw error
    }
  },

  /**
   * 구독한 큐레이터 리스트 조회
   */
  getSubscriptions: async (request: GetSubscriptionsRequest): Promise<GetSubscriptionsResponse> => {
    try {
      const response = await axios.get(`${urlPrefix}/subscribe/curators`, {
        params: {
          page: request.page ?? 1,
          size: request.size ?? 10,
        },
      })
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse
      console.error('getSubscriptions error', axiosError.response)
      throw error
    }
  },
}
