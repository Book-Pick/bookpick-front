import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { curationApi } from '../api/curation.api'
import type {
  SetReadingPreferenceRequest,
  UpdateReadingPreferenceRequest,
  GetBooksRequest,
  GetCurationsRequest,
  GetCurationsByFieldRequest,
  CreateCurationRequest,
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
 * 4. 큐레이션 단건 조회
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
 * 5. 큐레이션 목록 조회 (정렬: similarity, popularity, latest, liked, my)
 */
export const useGetCurations = ({
  sort = 'similarity',
  cursor = 0,
  size = 10,
}: GetCurationsRequest) => {
  return useQuery({
    queryKey: ['curations', sort, cursor, size],
    queryFn: async () => {
      const response = await curationApi.getCurations({ sort, cursor, size })
      return response.data
    },
  })
}

/**
 * 5-1. 큐레이션 목록 무한 스크롤 조회
 */
export const useGetInfiniteCurations = ({
  sort = 'similarity',
  size = 10,
}: Omit<GetCurationsRequest, 'cursor'>) => {
  return useInfiniteQuery({
    queryKey: ['curations', 'infinite', sort, size],
    queryFn: async ({ pageParam }) => {
      const response = await curationApi.getCurations({
        sort,
        cursor: pageParam,
        size,
      })
      return response.data
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNext) {
        return lastPage.nextCursor
      }
      return undefined
    },
  })
}

/**
 * 6. 특정 필드로 큐레이션 조회
 */
export const useGetCurationsByField = (request: GetCurationsByFieldRequest) => {
  return useQuery({
    queryKey: ['curations', 'field', request.field, request.value, request.page, request.limit],
    queryFn: async () => {
      const response = await curationApi.getCurationsByField(request)
      return response.data
    },
    enabled: !!request.field && !!request.value,
  })
}

/**
 * 7. 큐레이션 작성
 */
export const useCreateCuration = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: CreateCurationRequest) => {
      const response = await curationApi.createCuration(request)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['curations'] })
      toast.success('큐레이션이 등록되었습니다.')
    },
    onError: (error: Error) => {
      toast.error(error.message || '큐레이션 저장에 실패했습니다.')
    },
  })
}

export const useCreateCurationDraft = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (request: CreateCurationRequest) => {
      const response = await curationApi.createCurationDraft(request)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['curations'] })
      toast.success('큐레이션이 임시저장되었습니다.')
    },
    onError: (error: Error) => {
      toast.error(error.message || '큐레이션 임시저장에 실패했습니다.')
    },
  })
}

/**
 * 10. 큐레이션 삭제
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
      toast.success(response.message || '큐레이션이 삭제되었습니다.')
    },
    onError: (error: Error) => {
      toast.error(error.message || '큐레이션 삭제에 실패했습니다.')
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
