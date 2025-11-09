import type {
  SetReadingPreferenceRequest,
  SetReadingPreferenceResponse,
  GetReadingPreferenceResponse,
  UpdateReadingPreferenceRequest,
  UpdateReadingPreferenceResponse,
  GetCurationsResponse,
  GetCurationByIdResponse,
  GetCurationsRequest,
  GetCurationsByFieldRequest,
  CreateCurationRequest,
  CreateCurationResponse,
  SaveCurationRequest,
  SaveCurationResponse,
  UpdateCurationRequest,
  UpdateCurationResponse,
  DeleteCurationResponse,
  GetBooksRequest,
  GetBooksResponse,
} from '../types/curation.types'
import type { AxiosErrorResponse } from '@/shared/api/api.types'
import { createAxiosClient } from '@/shared/api/axiosClient'

// 목업 데이터 import
import {
  mockGetCurationsByFieldResponse,
  mockSaveCurationResponse,
  mockUpdateCurationResponse,
  mockDeleteCurationResponse,
  // mockGetCurationsResponse,
  // mockGetPopularCurationsResponse,
  // mockGetRecentCurationsResponse,
  // mockGetCurationByIdResponse,
} from './mockCurationApiData'

const axios = createAxiosClient(import.meta.env.VITE_APP_BOOKPICK_API_URL)
const urlPrefix = '/api/v1'

export const curationApi = {
  /**
   * 1. 독서 취향 설정 - 확인
   */
  setReadingPreference: async (
    request: SetReadingPreferenceRequest,
  ): Promise<SetReadingPreferenceResponse> => {
    try {
      const response = await axios.post(`${urlPrefix}/reading-preference`, request)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse
      if (axiosError.response?.status === 400) {
        throw new Error('잘못된 요청입니다.')
      } else if (axiosError.response?.status === 409) {
        throw new Error('이미 독서 취향이 설정되어 있습니다.')
      }
      throw error
    }
  },

  /**
   * 2. 독서 취향 조회 - 확인
   */
  getReadingPreference: async (): Promise<GetReadingPreferenceResponse> => {
    try {
      const response = await axios.get(`${urlPrefix}/reading-preference`)
      // TODO: authors 필드가 없으면 빈 배열로 추가 (추후 추가 예정 필드)
      const data = response.data.data
      if (data && !data.authors) {
        data.authors = []
      }

      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse
      if (axiosError.response?.status === 404) {
        // 404는 데이터가 없는 경우로 처리 (에러가 아님)
        return {
          status: 404,
          message: '독서 취향 데이터가 없습니다.',
          data: null,
        }
      }
      throw error
    }
  },

  /**
   * 3. 독서 취향 수정 - 확인
   */
  updateReadingPreference: async (
    request: UpdateReadingPreferenceRequest,
  ): Promise<UpdateReadingPreferenceResponse> => {
    try {
      const response = await axios.patch(`${urlPrefix}/reading-preference`, request)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse
      if (axiosError.response?.status === 400) {
        throw new Error('잘못된 요청입니다.')
      }
      if (axiosError.response?.status === 404) {
        throw new Error('독서 취향을 찾을 수 없습니다.')
      }
      throw error
    }
  },

  /**
   * 4. 큐레이션 단건 조회 - 확인
   */
  getCurationById: async (curationId: number): Promise<GetCurationByIdResponse> => {
    try {
      const response = await axios.get(`${urlPrefix}/curations/${curationId}`)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse
      console.error('큐레이션 조회 에러:', axiosError)
      throw error
    }

    // 목업 데이터 반환
    // console.log('큐레이션 단건 조회 요청:', curationId)
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(mockGetCurationByIdResponse)
    //   }, 500)
    // })
  },

  /**
   * 5. 큐레이션 목록 조회(취향 유사도순, 인기순, 최신순 정렬) - 확인
   */
  getCurations: async ({
    sort,
    cursor,
    size,
  }: GetCurationsRequest): Promise<GetCurationsResponse> => {
    try {
      const response = await axios.get(`${urlPrefix}/curations`, {
        params: { sort, cursor, size },
      })
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse
      if (axiosError.response?.status === 404) {
        throw new Error('독서 취향을 먼저 설정해주세요.')
      }
      throw error
    }
    // 목업 데이터 반환
    // console.log('큐레이션 목록 조회 요청:', { sort, cursor, size })
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     // sort 파라미터에 따라 적절한 목업 데이터 반환
    //     switch (sort) {
    //       case 'popularity':
    //         resolve(mockGetPopularCurationsResponse)
    //         break
    //       case 'latest':
    //         resolve(mockGetRecentCurationsResponse)
    //         break
    //       case 'similarity':
    //       default:
    //         resolve(mockGetCurationsResponse)
    //         break
    //     }
    //   }, 500)
    // })
  },

  /**
   * 6. 특정 필드로 큐레이션 조회(보류: 큐레이션 필터링 기능 추가 시 사용)
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
    try {
      const response = await axios.post(`${urlPrefix}/curations`, request)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse
      if (axiosError.response?.status === 400) {
        throw new Error('잘못된 요청입니다.')
      }
      throw error
    }
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
   * 10. 큐레이션 삭제
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

  /**
   * 11. 책 검색
   */
  searchBooks: async (request: GetBooksRequest): Promise<GetBooksResponse> => {
    try {
      const response = await axios.post(`${urlPrefix}/book/search`, {
        keyword: request.keyword,
        page: request.page || 1,
      })
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse
      console.error('책 검색 에러:', axiosError)
      throw error
    }
  },
}
