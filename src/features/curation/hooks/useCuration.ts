import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { curationApi } from '../api/curation.api'
import type {
  SetReadingPreferenceRequest,
  UpdateReadingPreferenceRequest,
  GetBooksRequest,
  GetCurationsRequest,
  CreateCurationRequest,
  CreateCurationResult,
  UpdateCurationRequest,
  DeleteCurationsRequest,
} from '../types/curation.types'

/**
 * 1. 독서 취향 설정
 */
export const useSetReadingPreference = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: SetReadingPreferenceRequest) => {
      const response = await curationApi.setReadingPreference(request)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['readingPreference'] })
    },
    onError: (error: Error) => {
      toast.error(error.message || '독서 취향 설정에 실패했습니다.')
    },
  })
}

/**
 * 2. 독서 취향 조회
 */
export const useGetReadingPreference = () => {
  return useQuery({
    queryKey: ['readingPreference'],
    queryFn: async () => {
      const response = await curationApi.getReadingPreference()
      return response.data
    },
  })
}

/**
 * 3. 독서 취향 수정
 */
export const useUpdateReadingPreference = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: UpdateReadingPreferenceRequest) => {
      const response = await curationApi.updateReadingPreference(request)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['readingPreference'] })
    },
    onError: (error: Error) => {
      toast.error(error.message || '독서 취향 수정에 실패했습니다.')
    },
  })
}

/**
 * 4. 추천사 단건 조회
 */
export const useGetCurationById = (curationId: number) => {
  return useQuery({
    queryKey: ['curation', curationId],
    queryFn: async () => {
      const response = await curationApi.getCurationById(curationId)
      return response.data
    },
    enabled: !!curationId,
  })
}

/**
 * 4-1. 추천사 단건 조회(수정용)
 */
export const useGetCurationForEdit = (curationId: number) => {
  return useQuery({
    queryKey: ['curation', 'edit', curationId],
    queryFn: async () => {
      const response = await curationApi.getCurationForEdit(curationId)
      return response.data
    },
    enabled: !!curationId,
  })
}

/**
 * 5. 추천사 목록 조회 (정렬: similarity, popular, latest, liked, my)
 */
export const useGetCurations = ({
  sort = 'similarity',
  cursor = 0,
  size = 10,
  draft,
}: GetCurationsRequest) => {
  return useQuery({
    queryKey: ['curations', sort, cursor, size, draft],
    queryFn: async () => {
      const response = await curationApi.getCurations({ sort, cursor, size, draft })
      return response.data
    },
  })
}

/**
 * 5-1. 추천사 목록 무한 스크롤 조회
 */
export const useGetInfiniteCurations = ({
  sort = 'similarity',
  size = 10,
  draft,
}: Omit<GetCurationsRequest, 'cursor'>) => {
  return useInfiniteQuery({
    queryKey: ['curations', 'infinite', sort, size, draft],
    queryFn: async ({ pageParam }) => {
      const response = await curationApi.getCurations({
        sort,
        cursor: pageParam,
        size,
        draft,
      })
      // null 응답 시 기본값 반환
      return (
        response.data ?? {
          sortType: sort,
          description: '',
          content: [],
          size: 0,
          hasNext: false,
          nextCursor: 0,
        }
      )
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage?.hasNext) {
        return lastPage.nextCursor
      }
      return undefined
    },
  })
}

/**
 * 7. 추천사 작성
 */
export const useCreateCuration = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: CreateCurationRequest) => {
      const response = await curationApi.createCuration(request)
      return response.data
    },
    onSuccess: (data: CreateCurationResult) => {
      queryClient.invalidateQueries({ queryKey: ['curations'] })
      if (data?.isDrafted) {
        toast.success('추천사가 임시저장되었습니다.')
      } else {
        toast.success('추천사가 발행되었습니다.')
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || '추천사 저장에 실패했습니다.')
    },
  })
}

/**
 * 9. 추천사 수정
 */
export const useUpdateCuration = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: UpdateCurationRequest) => {
      const response = await curationApi.updateCuration(request)
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['curations'] })
      queryClient.invalidateQueries({ queryKey: ['curation'] })
      if (data?.isDrafted) {
        toast.success('추천사가 임시저장되었습니다.')
      } else {
        toast.success('추천사가 수정되었습니다.')
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || '추천사 수정에 실패했습니다.')
    },
  })
}

/**
 * 10. 추천사 삭제
 */
export const useDeleteCuration = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (curationId: number) => {
      const response = await curationApi.deleteCuration(curationId)
      return response
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['curations'] })
      toast.success(response.message || '추천사가 삭제되었습니다.')
    },
    onError: (error: Error) => {
      toast.error(error.message || '추천사 삭제에 실패했습니다.')
    },
  })
}

export const useDeleteCurations = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: DeleteCurationsRequest) => {
      const response = await curationApi.deleteCurations(request)
      return response
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['curations'] })
      toast.success(response.message || '추천사가 삭제되었습니다.')
    },
    onError: (error: Error) => {
      toast.error(error.message || '추천사 삭제에 실패했습니다.')
    },
  })
}

/**
 * 11. 책 검색
 */
export const useSearchBooks = () => {
  return useMutation({
    mutationFn: async ({ keyword, page }: GetBooksRequest) => {
      const response = await curationApi.searchBooks({ keyword, page })
      return response.data
    },
    onError: (error: Error) => {
      toast.error(error.message || '책 검색에 실패했습니다.')
    },
  })
}

/**
 * 12. 큐레이션 책 구매 링크 제공
 */
export const useGetCurationBookPurchaseLink = (
  curationId: number,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: ['curation', 'book-purchase-link', curationId],
    queryFn: async () => {
      const response = await curationApi.getCurationBookPurchaseLink(curationId)
      return response.data
    },
    enabled: options?.enabled ?? true,
  })
}
