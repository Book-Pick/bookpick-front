import type {
  SetReadingPreferenceRequest,
  SetReadingPreferenceResponse,
  GetReadingPreferenceResponse,
  UpdateReadingPreferenceRequest,
  UpdateReadingPreferenceResponse,
  GetCurationsResponse,
  GetCurationsByFieldRequest,
  CreateCurationRequest,
  CreateCurationResponse,
  SaveCurationRequest,
  SaveCurationResponse,
  UpdateCurationRequest,
  UpdateCurationResponse,
  DeleteCurationResponse,
} from '../types/curation.types'
// import type { AxiosErrorResponse } from '@/shared/api/api.types'
// import { createAxiosClient } from '@/shared/api/axiosClient'

// 목업 데이터 import
import {
  mockSetReadingPreferenceResponse,
  mockGetReadingPreferenceResponse,
  mockUpdateReadingPreferenceResponse,
  mockGetCurationsResponse,
  mockGetPersonalizedCurationsResponse,
  mockGetCurationsByFieldResponse,
  mockCreateCurationResponse,
  mockSaveCurationResponse,
  mockUpdateCurationResponse,
  mockGetMyCurationsResponse,
  mockGetMyDraftCurationsResponse,
  mockDeleteCurationResponse,
} from './mockCurationApiData'

// const axios = createAxiosClient(import.meta.env.VITE_APP_BOOKPICK_API_URL)
// const urlPrefix = '/api/v1/curation'

export const curationApi = {
  /**
   * 1. 독서 취향 설정
   */
  setReadingPreference: async (
    request: SetReadingPreferenceRequest,
  ): Promise<SetReadingPreferenceResponse> => {
    // try {
    //   const response = await axios.post(`${urlPrefix}/preferences`, request)
    //   return response.data
    // } catch (error: unknown) {
    //   const axiosError = error as AxiosErrorResponse
    //   if (axiosError.response?.status === 400) {
    //     throw new Error('잘못된 요청입니다.')
    //   }
    //   throw error
    // }

    // 목업 데이터 반환
    console.log('독서 취향 설정 요청:', request)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockSetReadingPreferenceResponse)
      }, 500)
    })
  },

  /**
   * 2. 독서 취향 조회
   */
  getReadingPreference: async (): Promise<GetReadingPreferenceResponse> => {
    // try {
    //   const response = await axios.get(`${urlPrefix}/preferences`)
    //   return response.data
    // } catch (error: unknown) {
    //   const axiosError = error as AxiosErrorResponse
    //   if (axiosError.response?.status === 404) {
    //     throw new Error('독서 취향을 찾을 수 없습니다.')
    //   }
    //   throw error
    // }

    // 목업 데이터 반환
    console.log('독서 취향 조회 요청')
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockGetReadingPreferenceResponse)
      }, 500)
    })
  },

  /**
   * 3. 독서 취향 수정
   */
  updateReadingPreference: async (
    request: UpdateReadingPreferenceRequest,
  ): Promise<UpdateReadingPreferenceResponse> => {
    // try {
    //   const response = await axios.put(`${urlPrefix}/preferences`, request)
    //   return response.data
    // } catch (error: unknown) {
    //   const axiosError = error as AxiosErrorResponse
    //   if (axiosError.response?.status === 400) {
    //     throw new Error('잘못된 요청입니다.')
    //   }
    //   if (axiosError.response?.status === 404) {
    //     throw new Error('독서 취향을 찾을 수 없습니다.')
    //   }
    //   throw error
    // }

    // 목업 데이터 반환
    console.log('독서 취향 수정 요청:', request)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUpdateReadingPreferenceResponse)
      }, 500)
    })
  },

  /**
   * 4. 큐레이션 전체 조회
   */
  getAllCurations: async (page: number = 1, limit: number = 10): Promise<GetCurationsResponse> => {
    // try {
    //   const response = await axios.get(`${urlPrefix}/curations`, {
    //     params: { page, limit },
    //   })
    //   return response.data
    // } catch (error: unknown) {
    //   const axiosError = error as AxiosErrorResponse
    //   throw error
    // }

    // 목업 데이터 반환
    console.log('큐레이션 전체 조회 요청:', { page, limit })
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockGetCurationsResponse)
      }, 500)
    })
  },

  /**
   * 5. 사용자 취향에 맞는 큐레이션 조회
   */
  getPersonalizedCurations: async (
    page: number = 1,
    limit: number = 10,
  ): Promise<GetCurationsResponse> => {
    // try {
    //   const response = await axios.get(`${urlPrefix}/curations/personalized`, {
    //     params: { page, limit },
    //   })
    //   return response.data
    // } catch (error: unknown) {
    //   const axiosError = error as AxiosErrorResponse
    //   if (axiosError.response?.status === 404) {
    //     throw new Error('독서 취향을 먼저 설정해주세요.')
    //   }
    //   throw error
    // }

    // 목업 데이터 반환
    console.log('사용자 취향 맞춤 큐레이션 조회 요청:', { page, limit })
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockGetPersonalizedCurationsResponse)
      }, 500)
    })
  },

  /**
   * 6. 특정 필드로 큐레이션 조회
   */
  getCurationsByField: async (
    request: GetCurationsByFieldRequest,
  ): Promise<GetCurationsResponse> => {
    // try {
    //   const response = await axios.get(`${urlPrefix}/curations/filter`, {
    //     params: {
    //       field: request.field,
    //       value: request.value,
    //       page: request.page || 1,
    //       limit: request.limit || 10,
    //     },
    //   })
    //   return response.data
    // } catch (error: unknown) {
    //   const axiosError = error as AxiosErrorResponse
    //   if (axiosError.response?.status === 400) {
    //     throw new Error('잘못된 필터 조건입니다.')
    //   }
    //   throw error
    // }

    // 목업 데이터 반환
    console.log('특정 필드로 큐레이션 조회 요청:', request)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockGetCurationsByFieldResponse)
      }, 500)
    })
  },

  /**
   * 7. 큐레이션 작성
   */
  createCuration: async (request: CreateCurationRequest): Promise<CreateCurationResponse> => {
    // try {
    //   const response = await axios.post(`${urlPrefix}/curations`, request)
    //   return response.data
    // } catch (error: unknown) {
    //   const axiosError = error as AxiosErrorResponse
    //   if (axiosError.response?.status === 400) {
    //     throw new Error('잘못된 요청입니다.')
    //   }
    //   throw error
    // }

    // 목업 데이터 반환
    console.log('큐레이션 작성 요청:', request)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCreateCurationResponse)
      }, 500)
    })
  },

  /**
   * 8. 큐레이션 저장 (임시저장/일반저장)
   */
  saveCuration: async (request: SaveCurationRequest): Promise<SaveCurationResponse> => {
    // try {
    //   const response = await axios.post(`${urlPrefix}/curations/save`, request)
    //   return response.data
    // } catch (error: unknown) {
    //   const axiosError = error as AxiosErrorResponse
    //   if (axiosError.response?.status === 400) {
    //     throw new Error('잘못된 요청입니다.')
    //   }
    //   throw error
    // }

    // 목업 데이터 반환
    console.log('큐레이션 저장 요청:', request)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 200,
          message: request.isDraft
            ? '큐레이션이 임시저장되었습니다.'
            : '큐레이션이 저장되었습니다.',
          data: mockSaveCurationResponse.data,
        })
      }, 500)
    })
  },

  /**
   * 9. 큐레이션 수정
   */
  updateCuration: async (request: UpdateCurationRequest): Promise<UpdateCurationResponse> => {
    // try {
    //   const response = await axios.put(`${urlPrefix}/curations/${request.id}`, request)
    //   return response.data
    // } catch (error: unknown) {
    //   const axiosError = error as AxiosErrorResponse
    //   if (axiosError.response?.status === 400) {
    //     throw new Error('잘못된 요청입니다.')
    //   }
    //   if (axiosError.response?.status === 403) {
    //     throw new Error('수정 권한이 없습니다.')
    //   }
    //   if (axiosError.response?.status === 404) {
    //     throw new Error('큐레이션을 찾을 수 없습니다.')
    //   }
    //   throw error
    // }

    // 목업 데이터 반환
    console.log('큐레이션 수정 요청:', request)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUpdateCurationResponse)
      }, 500)
    })
  },

  /**
   * 10. 내가 쓴 큐레이션 목록 조회
   */
  getMyCurations: async (page: number = 1, limit: number = 10): Promise<GetCurationsResponse> => {
    // try {
    //   const response = await axios.get(`${urlPrefix}/curations/my`, {
    //     params: { page, limit },
    //   })
    //   return response.data
    // } catch (error: unknown) {
    //   const axiosError = error as AxiosErrorResponse
    //   throw error
    // }

    // 목업 데이터 반환
    console.log('내가 쓴 큐레이션 목록 조회 요청:', { page, limit })
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockGetMyCurationsResponse)
      }, 500)
    })
  },

  /**
   * 11. 내가 쓴 임시저장 큐레이션 목록 조회
   */
  getMyDraftCurations: async (
    page: number = 1,
    limit: number = 10,
  ): Promise<GetCurationsResponse> => {
    // try {
    //   const response = await axios.get(`${urlPrefix}/curations/my/drafts`, {
    //     params: { page, limit },
    //   })
    //   return response.data
    // } catch (error: unknown) {
    //   const axiosError = error as AxiosErrorResponse
    //   throw error
    // }

    // 목업 데이터 반환
    console.log('내가 쓴 임시저장 큐레이션 목록 조회 요청:', { page, limit })
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockGetMyDraftCurationsResponse)
      }, 500)
    })
  },

  /**
   * 12. 큐레이션 삭제
   */
  deleteCuration: async (curationId: number): Promise<DeleteCurationResponse> => {
    // try {
    //   const response = await axios.delete(`${urlPrefix}/curations/${curationId}`)
    //   return response.data
    // } catch (error: unknown) {
    //   const axiosError = error as AxiosErrorResponse
    //   if (axiosError.response?.status === 403) {
    //     throw new Error('삭제 권한이 없습니다.')
    //   }
    //   if (axiosError.response?.status === 404) {
    //     throw new Error('큐레이션을 찾을 수 없습니다.')
    //   }
    //   throw error
    // }

    // 목업 데이터 반환
    console.log('큐레이션 삭제 요청:', curationId)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockDeleteCurationResponse)
      }, 500)
    })
  },
}
