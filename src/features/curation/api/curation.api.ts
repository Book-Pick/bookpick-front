import type {
  SetReadingPreferenceRequest,
  SetReadingPreferenceResponse,
  GetReadingPreferenceResponse,
  UpdateReadingPreferenceRequest,
  UpdateReadingPreferenceResponse,
  GetCurationsResponse,
  GetCurationsByIdsResponse,
  GetCurationByIdResponse,
  GetCurationForEditResponse,
  GetCurationsRequest,
  CreateCurationRequest,
  CreateCurationResponse,
  UpdateCurationRequest,
  UpdateCurationResponse,
  DeleteCurationResponse,
  DeleteCurationsRequest,
  DeleteCurationsResponse,
  GetBooksRequest,
  GetBooksResponse,
  GetCurationBookPurchaseLinkResponse,
} from '../types/curation.types'
import type { AxiosErrorResponse } from '@/shared/api/api.types'
import { createAxiosClient } from '@/shared/api/axiosClient'
import { getApiBaseUrl } from '@/shared/api/apiConfig'

const axios = createAxiosClient(getApiBaseUrl())
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
      } else {
        throw new Error('독서 취향 설정에 실패했습니다.')
      }
    }
  },

  /**
   * 2. 독서 취향 조회 - 확인
   */
  getReadingPreference: async (): Promise<GetReadingPreferenceResponse> => {
    try {
      const response = await axios.get(`${urlPrefix}/reading-preference`)
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
   * 4. 추천사 단건 조회 - 확인
   */
  getCurationById: async (curationId: number): Promise<GetCurationByIdResponse> => {
    try {
      const response = await axios.get(`${urlPrefix}/curations/${curationId}`)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse
      console.error('추천사 조회 에러:', axiosError)
      throw error
    }
  },

  /**
   * 4-1. 추천사 단건 조회(수정용)
   */
  getCurationForEdit: async (curationId: number): Promise<GetCurationForEditResponse> => {
    try {
      const response = await axios.get(`${urlPrefix}/curations/${curationId}/edit`)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse
      if (axiosError.response?.status === 403) {
        throw new Error('수정 권한이 없습니다.')
      }
      if (axiosError.response?.status === 404) {
        throw new Error('추천사를 찾을 수 없습니다.')
      }
      throw error
    }
  },

  /**
   * 5. 추천사 목록 조회(취향 유사도순, 인기순, 최신순 정렬) - 확인
   */
  getCurations: async ({
    sort,
    cursor,
    size,
    draft,
  }: GetCurationsRequest): Promise<GetCurationsResponse> => {
    try {
      const params: { sort: string; size: number; cursor?: number; draft?: boolean } = {
        sort,
        size,
      }
      if (cursor !== undefined) {
        params.cursor = cursor
      }
      if (draft !== undefined) {
        params.draft = draft
      }
      const response = await axios.get(`${urlPrefix}/curations`, { params })
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse
      if (axiosError.response?.status === 404) {
        throw new Error('독서 취향을 먼저 설정해주세요.')
      }
      throw error
    }
  },

  /**
   * 6. 큐레이션 ID 목록으로 조회 (에디터픽용)
   */
  getCurationsByIds: async (curationIds: number[]): Promise<GetCurationsByIdsResponse> => {
    try {
      const response = await axios.post(`${urlPrefix}/curations/by-ids`, { curationIds })
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse
      console.error('getCurationsByIds error:', axiosError.response)
      throw error
    }
  },

  /**
   * 7. 추천사 작성
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
   * 9. 추천사 수정
   */
  updateCuration: async (request: UpdateCurationRequest): Promise<UpdateCurationResponse> => {
    try {
      const { id, ...body } = request
      const response = await axios.patch(`${urlPrefix}/curations/${id}`, body)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse
      if (axiosError.response?.status === 400) {
        throw new Error('잘못된 요청입니다.')
      }
      if (axiosError.response?.status === 403) {
        throw new Error('수정 권한이 없습니다.')
      }
      if (axiosError.response?.status === 404) {
        throw new Error('추천사를 찾을 수 없습니다.')
      }
      throw error
    }
  },

  /**
   * 10. 추천사 삭제
   */
  deleteCuration: async (curationId: number): Promise<DeleteCurationResponse> => {
    try {
      const response = await axios.delete(`${urlPrefix}/curations/${curationId}`)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse
      if (axiosError.response?.status === 403) {
        throw new Error('삭제 권한이 없습니다.')
      }
      if (axiosError.response?.status === 404) {
        throw new Error('추천사를 찾을 수 없습니다.')
      }
      throw error
    }
  },

  /**
   * 10. 추천사 리스트 삭제
   */
  deleteCurations: async (request: DeleteCurationsRequest): Promise<DeleteCurationsResponse> => {
    try {
      const response = await axios.delete(`${urlPrefix}/curations`, { data: request })
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse
      if (axiosError.response?.status === 403) {
        throw new Error('삭제 권한이 없습니다.')
      }
      if (axiosError.response?.status === 404) {
        throw new Error('추천사를 찾을 수 없습니다.')
      }
      throw error
    }
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

  /** 12. 큐레이션 책 구매 링크 제공 */
  getCurationBookPurchaseLink: async (
    curationId: number,
  ): Promise<GetCurationBookPurchaseLinkResponse> => {
    try {
      const response = await axios.get(`${urlPrefix}/curations/${curationId}/book-link`)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse
      console.error('큐레이션 책 구매 링크 제공 에러:', axiosError)
      throw error
    }
  },
}
