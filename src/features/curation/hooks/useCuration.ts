import { useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { curationApi } from '../api/curation.api'
import type {
  SetReadingPreferenceRequest,
  UpdateReadingPreferenceRequest,
  GetCurationsByFieldRequest,
  CreateCurationRequest,
  SaveCurationRequest,
  UpdateCurationRequest,
} from '../types/curation.types'

/**
 * 큐레이션 관련 쿼리 훅
 */
export const useCuration = () => {
  /**
   * 1. 독서 취향 설정
   */
  const useSetReadingPreference = () => {
    return useMutation({
      mutationFn: async (request: SetReadingPreferenceRequest) => {
        const response = await curationApi.setReadingPreference(request)
        return response.data
      },
      onError: (error: Error) => {
        toast.error(error.message || '독서 취향 설정에 실패했습니다.')
      },
    })
  }

  /**
   * 2. 독서 취향 조회
   */
  const useGetReadingPreference = () => {
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
  const useUpdateReadingPreference = () => {
    return useMutation({
      mutationFn: async (request: UpdateReadingPreferenceRequest) => {
        const response = await curationApi.updateReadingPreference(request)
        return response.data
      },
      onSuccess: (data) => {
        toast.success('독서 취향이 성공적으로 수정되었습니다.')
        console.log('독서 취향 수정 완료:', data)
      },
      onError: (error: Error) => {
        toast.error(error.message || '독서 취향 수정에 실패했습니다.')
      },
    })
  }

  /**
   * 4. 큐레이션 전체 조회
   */
  const useGetAllCurations = (page: number = 1, limit: number = 10) => {
    return useQuery({
      queryKey: ['curations', 'all', page, limit],
      queryFn: async () => {
        const response = await curationApi.getAllCurations(page, limit)
        return response.data
      },
    })
  }

  /**
   * 5. 사용자 취향에 맞는 큐레이션 조회
   */
  const useGetPersonalizedCurations = (page: number = 1, limit: number = 10) => {
    return useQuery({
      queryKey: ['curations', 'personalized', page, limit],
      queryFn: async () => {
        const response = await curationApi.getPersonalizedCurations(page, limit)
        return response.data
      },
    })
  }

  /**
   * 6. 특정 필드로 큐레이션 조회
   */
  const useGetCurationsByField = (request: GetCurationsByFieldRequest) => {
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
  const useCreateCuration = () => {
    return useMutation({
      mutationFn: async (request: CreateCurationRequest) => {
        const response = await curationApi.createCuration(request)
        return response.data
      },
      onSuccess: (data) => {
        toast.success('큐레이션이 성공적으로 작성되었습니다.')
        console.log('큐레이션 작성 완료:', data)
      },
      onError: (error: Error) => {
        toast.error(error.message || '큐레이션 작성에 실패했습니다.')
      },
    })
  }

  /**
   * 8. 큐레이션 저장 (임시저장/일반저장)
   */
  const useSaveCuration = () => {
    return useMutation({
      mutationFn: async (request: SaveCurationRequest) => {
        const response = await curationApi.saveCuration(request)
        return response
      },
      onSuccess: (response) => {
        toast.success(response.message || '큐레이션이 저장되었습니다.')
        console.log('큐레이션 저장 완료:', response.data)
      },
      onError: (error: Error) => {
        toast.error(error.message || '큐레이션 저장에 실패했습니다.')
      },
    })
  }

  /**
   * 9. 큐레이션 수정
   */
  const useUpdateCuration = () => {
    return useMutation({
      mutationFn: async (request: UpdateCurationRequest) => {
        const response = await curationApi.updateCuration(request)
        return response.data
      },
      onSuccess: (data) => {
        toast.success('큐레이션이 성공적으로 수정되었습니다.')
        console.log('큐레이션 수정 완료:', data)
      },
      onError: (error: Error) => {
        toast.error(error.message || '큐레이션 수정에 실패했습니다.')
      },
    })
  }

  /**
   * 10. 내가 쓴 큐레이션 목록 조회
   */
  const useGetMyCurations = (page: number = 1, limit: number = 10) => {
    return useQuery({
      queryKey: ['curations', 'my', page, limit],
      queryFn: async () => {
        const response = await curationApi.getMyCurations(page, limit)
        return response.data
      },
    })
  }

  /**
   * 11. 내가 쓴 임시저장 큐레이션 목록 조회
   */
  const useGetMyDraftCurations = (page: number = 1, limit: number = 10) => {
    return useQuery({
      queryKey: ['curations', 'my', 'drafts', page, limit],
      queryFn: async () => {
        const response = await curationApi.getMyDraftCurations(page, limit)
        return response.data
      },
    })
  }

  /**
   * 12. 큐레이션 삭제
   */
  const useDeleteCuration = () => {
    return useMutation({
      mutationFn: async (curationId: number) => {
        const response = await curationApi.deleteCuration(curationId)
        return response
      },
      onSuccess: (response) => {
        toast.success(response.message || '큐레이션이 삭제되었습니다.')
      },
      onError: (error: Error) => {
        toast.error(error.message || '큐레이션 삭제에 실패했습니다.')
      },
    })
  }

  /**
   * 13. 인기순 큐레이션 조회 (likes 기준 정렬)
   */
  const useGetPopularCurations = (page: number = 1, limit: number = 10) => {
    return useQuery({
      queryKey: ['curations', 'popular', page, limit],
      queryFn: async () => {
        const response = await curationApi.getPopularCurations(page, limit)
        return response.data
      },
    })
  }

  /**
   * 14. 최신순 큐레이션 조회 (createdAt 기준 정렬)
   */
  const useGetRecentCurations = (page: number = 1, limit: number = 10) => {
    return useQuery({
      queryKey: ['curations', 'recent', page, limit],
      queryFn: async () => {
        const response = await curationApi.getRecentCurations(page, limit)
        return response.data
      },
    })
  }

  return {
    // Mutations
    useSetReadingPreference,
    useUpdateReadingPreference,
    useCreateCuration,
    useSaveCuration,
    useUpdateCuration,
    useDeleteCuration,

    // Queries
    useGetReadingPreference,
    useGetAllCurations,
    useGetPersonalizedCurations,
    useGetCurationsByField,
    useGetMyCurations,
    useGetMyDraftCurations,
    useGetPopularCurations,
    useGetRecentCurations,
  }
}
