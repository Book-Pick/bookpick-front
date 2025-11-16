/**
 * 프로필 관련 타입 정의
 */

import type { ApiResponse } from '@/shared/api/api.types'

// 프로필 데이터 타입
export interface Profile {
  userId: number
  email: string
  passWord?: string
  nickName: string | null
  introduction?: string
  profileImage?: string | null
  role?: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: string | null
  deleted?: boolean
}

// API Request 타입들
export interface CreateProfileRequest {
  nickName: string
  introduction: string
  profileImage?: string
}

export type UpdateProfileRequest = Partial<Profile>

// API Response 타입들
export type GetProfileResponse = ApiResponse<Profile | null>

export type CreateProfileResponse = ApiResponse<Profile>

export type UpdateProfileResponse = ApiResponse<Profile>
