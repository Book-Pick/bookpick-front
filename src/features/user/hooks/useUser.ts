import { useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { userApi } from '../api/user.api'
import type { CreateProfileRequest, UpdateProfileRequest } from '../types/user.types'

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
  return useMutation({
    mutationFn: async (request: CreateProfileRequest) => {
      const response = await userApi.createProfile(request)
      return response.data
    },
    onSuccess: () => {
      toast.success('프로필이 성공적으로 등록되었습니다.')
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
  return useMutation({
    mutationFn: async (request: UpdateProfileRequest) => {
      const response = await userApi.updateProfile(request)
      return response.data
    },
    onSuccess: (data) => {
      toast.success('프로필이 성공적으로 수정되었습니다.')
      console.log('프로필 수정 완료:', data)
    },
    onError: (error: Error) => {
      toast.error(error.message || '프로필 수정에 실패했습니다.')
    },
  })
}
