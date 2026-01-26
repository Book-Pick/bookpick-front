import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { userApi } from '../api/user.api'
import { useAuth } from '@/app/providers'
import type {
  CreateProfileRequest,
  UpdateProfileRequest,
  SubscribeRequest,
  GetSubscriptionsRequest,
} from '../types/user.types'

/**
 * 1. 프로필 조회
 */
export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await userApi.getProfile()
      return response.data
    },
  })
}

/**
 * 2. 프로필 등록
 */
export const useCreateProfile = () => {
  const queryClient = useQueryClient()
  const { updateUser } = useAuth()

  return useMutation({
    mutationFn: async (request: CreateProfileRequest) => {
      const response = await userApi.createProfile(request)
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      updateUser({
        nickname: data?.nickName ?? '',
        bio: data?.introduction ?? '',
        profileImageUrl: data?.profileImage ?? '',
      })
    },
    onError: (error: Error) => {
      toast.error(error.message || '프로필 등록에 실패했습니다.')
    },
  })
}

/**
 * 3. 프로필 수정
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient()
  const { updateUser } = useAuth()

  return useMutation({
    mutationFn: async (request: UpdateProfileRequest) => {
      const response = await userApi.updateProfile(request)
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      toast.success('프로필이 성공적으로 수정되었습니다.')
      updateUser({
        nickname: data?.nickName ?? '',
        bio: data?.introduction ?? '',
        profileImageUrl: data?.profileImage ?? '',
      })
    },
    onError: (error: Error) => {
      toast.error(error.message || '프로필 수정에 실패했습니다.')
    },
  })
}

/**
 * 4. 큐레이터 구독/취소 (토글)
 */
export const useSubscribe = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: SubscribeRequest) => {
      const response = await userApi.subscribe(request)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] })
    },
    onError: (error: Error) => {
      toast.error(error.message || '구독 처리에 실패했습니다.')
    },
  })
}

/**
 * 5. 구독한 큐레이터 리스트 조회
 */
export const useGetSubscriptions = (request: GetSubscriptionsRequest = { page: 0, size: 1000 }) => {
  return useQuery({
    queryKey: ['subscriptions', request.page, request.size],
    queryFn: async () => {
      const response = await userApi.getSubscriptions(request)
      return response.data
    },
  })
}
