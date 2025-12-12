import type {
  GetCommentsRequest,
  GetCommentsResponse,
  GetCommentByIdResponse,
  CreateCommentRequest,
  CreateCommentResponse,
  UpdateCommentRequest,
  UpdateCommentResponse,
  DeleteCommentResponse,
  LikeCurationResponse,
} from '../types/community.types'
import type { AxiosErrorResponse } from '@/shared/api/api.types'
import { createAxiosClient } from '@/shared/api/axiosClient'

const axios = createAxiosClient(import.meta.env.VITE_APP_BOOKPICK_API_URL)
const urlPrefix = '/api/v1'

export const communityApi = {
  /**
   * 1. 댓글 조회
   */
  getComments: async ({
    curationId,
    page = 1,
    size = 10,
  }: GetCommentsRequest): Promise<GetCommentsResponse> => {
    try {
      const response = await axios.get(`${urlPrefix}/curations/${curationId}/comments`, {
        params: { page, size },
      })
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse
      if (axiosError.response?.status === 404) {
        throw new Error('추천사를 찾을 수 없습니다.')
      }
      throw error
    }
  },

  /**
   * 2. 대댓글 조회
   */
  getCommentById: async (
    curationId: number,
    commentId: number,
  ): Promise<GetCommentByIdResponse> => {
    try {
      const response = await axios.get(`${urlPrefix}/curations/${curationId}/comments/${commentId}`)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse
      if (axiosError.response?.status === 404) {
        throw new Error('댓글을 찾을 수 없습니다.')
      }
      throw error
    }
  },

  /**
   * 3. 댓글 작성
   */
  createComment: async (
    curationId: number,
    request: CreateCommentRequest,
  ): Promise<CreateCommentResponse> => {
    try {
      const response = await axios.post(`${urlPrefix}/curations/${curationId}/comments`, request)
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
   * 4. 댓글 수정
   */
  updateComment: async (
    curationId: number,
    commentId: number,
    request: UpdateCommentRequest,
  ): Promise<UpdateCommentResponse> => {
    try {
      const response = await axios.patch(
        `${urlPrefix}/curations/${curationId}/comments/${commentId}`,
        request,
      )
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
        throw new Error('댓글을 찾을 수 없습니다.')
      }
      throw error
    }
  },

  /**
   * 5. 댓글 삭제
   */
  deleteComment: async (curationId: number, commentId: number): Promise<DeleteCommentResponse> => {
    try {
      const response = await axios.delete(
        `${urlPrefix}/curations/${curationId}/comments/${commentId}`,
      )
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse
      if (axiosError.response?.status === 403) {
        throw new Error('삭제 권한이 없습니다.')
      }
      if (axiosError.response?.status === 404) {
        throw new Error('댓글을 찾을 수 없습니다.')
      }
      throw error
    }
  },

  /**
   * 6. 큐레이션 좋아요
   */
  likeCuration: async (curationId: number): Promise<LikeCurationResponse> => {
    try {
      const response = await axios.post(`${urlPrefix}/curations/like/${curationId}`)
      return response.data
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse
      if (axiosError.response?.status === 404) {
        throw new Error('추천사를 찾을 수 없습니다.')
      }
      throw error
    }
  },
}
