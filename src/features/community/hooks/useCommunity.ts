import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { communityApi } from '../api/community.api'
import type {
  GetCommentsRequest,
  CreateCommentRequest,
  UpdateCommentRequest,
} from '../types/community.types'

/**
 * 1. Get comments list
 */
export const useGetComments = ({ curationId, page = 1, size = 10 }: GetCommentsRequest) => {
  return useQuery({
    queryKey: ['comments', curationId, page, size],
    queryFn: async () => {
      const response = await communityApi.getComments({ curationId, page, size })
      return response.data
    },
    enabled: !!curationId,
  })
}

/**
 * 1-1. Get comments with infinite scroll
 */
export const useGetInfiniteComments = (curationId: number, size: number = 10) => {
  return useInfiniteQuery({
    queryKey: ['comments', 'infinite', curationId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await communityApi.getComments({ curationId, page: pageParam, size })
      return response.data
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.pageInfo?.hasNext) {
        return lastPage.pageInfo.currentPage + 1
      }
      return undefined
    },
    initialPageParam: 1,
    enabled: !!curationId,
  })
}

/**
 * 2. Get single comment
 */
export const useGetCommentById = (curationId: number, commentId: number) => {
  return useQuery({
    queryKey: ['comment', curationId, commentId],
    queryFn: async () => {
      const response = await communityApi.getCommentById(curationId, commentId)
      return response.data
    },
    enabled: !!curationId && !!commentId,
  })
}

/**
 * 3. Create comment (including replies)
 */
export const useCreateComment = (curationId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: CreateCommentRequest) => {
      const response = await communityApi.createComment(curationId, request)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', curationId] })
      queryClient.invalidateQueries({ queryKey: ['comments', 'infinite', curationId] })
      toast.success('댓글을 등록했습니다.')
    },
    onError: (error: Error) => {
      toast.error(error.message || '댓글 등록에 실패했습니다.')
    },
  })
}

/**
 * 4. Update comment
 */
export const useUpdateComment = (curationId: number, commentId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: UpdateCommentRequest) => {
      const response = await communityApi.updateComment(curationId, commentId, request)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', curationId] })
      queryClient.invalidateQueries({ queryKey: ['comments', 'infinite', curationId] })
      queryClient.invalidateQueries({ queryKey: ['comment', curationId, commentId] })
      toast.success('댓글을 수정했습니다.')
    },
    onError: (error: Error) => {
      toast.error(error.message || '댓글 수정에 실패했습니다.')
    },
  })
}

/**
 * 5. Delete comment
 */
export const useDeleteComment = (curationId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (commentId: number) => {
      const response = await communityApi.deleteComment(curationId, commentId)
      return response
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['comments', curationId] })
      queryClient.invalidateQueries({ queryKey: ['comments', 'infinite', curationId] })
      toast.success(response.message || '댓글을 삭제했습니다.')
    },
    onError: (error: Error) => {
      toast.error(error.message || '댓글 삭제에 실패했습니다.')
    },
  })
}
