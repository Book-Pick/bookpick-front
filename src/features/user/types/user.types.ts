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

// 큐레이터 정보 타입
export interface Curator {
  curatorId: number
  nickname: string
  profileImageUrl: string
  bio: string
}

// 페이지 정보 타입
export interface PageInfo {
  currentPage: number
  totalPages: number
  totalElements: number
  hasNext: boolean
}

// 구독 리스트 데이터 타입
export interface SubscriptionListData {
  curators: Curator[]
  pageInfo: PageInfo
}

// API Request 타입들
export interface CreateProfileRequest {
  nickName: string
  introduction: string
  profileImage?: string
}

export type UpdateProfileRequest = Partial<Profile>

export interface SubscribeRequest {
  curatorId: number
}

export interface SubscribeResult {
  curatorId: number
  subscribed: boolean
}

export interface GetSubscriptionsRequest {
  page?: number
  size?: number
}

// API Response 타입들
export type GetProfileResponse = ApiResponse<Profile | null>

export type CreateProfileResponse = ApiResponse<Profile>

export type UpdateProfileResponse = ApiResponse<Profile>

export type SubscribeResponse = ApiResponse<SubscribeResult>

export type GetSubscriptionsResponse = ApiResponse<SubscriptionListData>
