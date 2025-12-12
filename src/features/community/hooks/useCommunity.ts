import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { communityApi } from '../api/community.api'
import type {
  GetCommentsRequest,
  CreateCommentRequest,
  UpdateCommentRequest,
} from '../types/community.types'
import type {
  CurationLikeItem,
  InfiniteCurationsData,
  RegularCurationsData,
} from '@/features/curation/types/curation.types'

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
      // null 응답 시 기본값 반환
      return (
        response.data ?? {
          comments: [],
          pageInfo: {
            currentPage: pageParam,
            totalPages: 0,
            totalElements: 0,
            hasNext: false,
          },
        }
      )
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
    onMutate: async (newComment) => {
      // 1. 진행 중인 refetch 취소
      await queryClient.cancelQueries({ queryKey: ['comments', 'infinite', curationId] })

      // 2. 현재 캐시 백업
      const previousComments = queryClient.getQueryData(['comments', 'infinite', curationId])

      // 3. 현재 사용자 정보 가져오기
      const authData = JSON.parse(localStorage.getItem('bookpick-auth') || '{}')

      // 4. 낙관적으로 새 댓글 생성
      const optimisticComment = {
        commentId: Date.now(), // 임시 ID
        parentId: newComment.parentId || null,
        nickname: authData.user?.nickname || '나',
        profileImageUrl: authData.user?.profileImageUrl || null,
        content: newComment.content,
        createdAt: new Date().toISOString(),
        updatedAt: null,
      }

      // 5. 캐시에 낙관적 댓글 추가
      queryClient.setQueryData(['comments', 'infinite', curationId], (old: unknown) => {
        const oldData = old as
          | {
              pages: { comments: (typeof optimisticComment)[]; pageInfo: unknown }[]
              pageParams: unknown[]
            }
          | undefined

        if (!oldData?.pages?.length) return oldData

        const newPages = [...oldData.pages]
        newPages[0] = {
          ...newPages[0],
          comments: [optimisticComment, ...newPages[0].comments],
        }

        return {
          ...oldData,
          pages: newPages,
        }
      })

      return { previousComments }
    },
    onError: (_err, _newComment, context) => {
      // 에러 시 롤백
      if (context?.previousComments) {
        queryClient.setQueryData(['comments', 'infinite', curationId], context.previousComments)
      }
      toast.error('댓글 등록에 실패했습니다.')
    },
    onSuccess: () => {
      toast.success('댓글을 등록했습니다.')
    },
    onSettled: () => {
      // 서버 데이터와 동기화
      queryClient.invalidateQueries({ queryKey: ['comments', curationId] })
      queryClient.invalidateQueries({ queryKey: ['comments', 'infinite', curationId] })
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

/**
 * 좋아요 토글 로직 (공통)
 */
const toggleLike = (isLiked?: boolean, likeCount?: number | null) => {
  const newIsLiked = !isLiked
  const currentCount = likeCount ?? 0
  const newCount = newIsLiked ? currentCount + 1 : currentCount - 1
  return { isLiked: newIsLiked, likeCount: newCount }
}

/**
 * 6. Like curation
 */
export const useLikeCuration = () => {
  const queryClient = useQueryClient()

  /**
   * 무한 스크롤 캐시 업데이트 (pages 구조)
   */
  const updateInfiniteCache = (curationId: number) => {
    queryClient.setQueriesData<InfiniteCurationsData>(
      { queryKey: ['curations', 'infinite'] },
      (oldData) => {
        if (!oldData?.pages) return oldData

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            content: page.content.map((item) =>
              item.curationId === curationId
                ? { ...item, ...toggleLike(item.isLiked, item.likeCount) }
                : item,
            ),
          })),
        }
      },
    )
  }

  /**
   * 일반 쿼리 캐시 업데이트 (content 구조)
   */
  const updateRegularCache = (curationId: number) => {
    // liked, my 등의 sort 타입에 대한 캐시 업데이트
    const sortTypes = ['liked', 'my', 'similarity', 'popularity', 'latest']

    sortTypes.forEach((sort) => {
      queryClient.setQueriesData<RegularCurationsData>(
        { queryKey: ['curations', sort] },
        (oldData) => {
          if (!oldData?.content) return oldData

          return {
            ...oldData,
            content: oldData.content.map((item) =>
              item.curationId === curationId
                ? { ...item, ...toggleLike(item.isLiked, item.likeCount) }
                : item,
            ),
          }
        },
      )
    })
  }

  /**
   * 상세 페이지 캐시 업데이트
   */
  const updateDetailCache = (curationId: number) => {
    queryClient.setQueryData(
      ['curation', curationId],
      (oldData: (CurationLikeItem & Record<string, unknown>) | undefined) => {
        if (!oldData) return oldData
        return { ...oldData, ...toggleLike(oldData.isLiked, oldData.likeCount) }
      },
    )
  }

  return useMutation({
    mutationFn: async (curationId: number) => {
      const response = await communityApi.likeCuration(curationId)
      return response
    },
    onMutate: async (curationId: number) => {
      // 1. 진행 중인 refetch 취소
      await queryClient.cancelQueries({ queryKey: ['curation', curationId] })
      await queryClient.cancelQueries({ queryKey: ['curations'] })

      // 2. 현재 캐시 백업
      const previousCuration = queryClient.getQueryData(['curation', curationId])
      const previousCurations = queryClient.getQueriesData({ queryKey: ['curations'] })

      // 3. 낙관적 업데이트
      updateDetailCache(curationId)
      updateInfiniteCache(curationId)
      updateRegularCache(curationId)

      return { previousCuration, previousCurations, curationId }
    },
    onError: (_err, _curationId, context) => {
      // 에러 시 롤백
      if (context?.previousCuration) {
        queryClient.setQueryData(['curation', context.curationId], context.previousCuration)
      }
      if (context?.previousCurations) {
        context.previousCurations.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
      toast.error('좋아요에 실패했습니다.')
    },
  })
}
