/**
 * Community (Comment) related type definitions
 */

import type { ApiResponse } from '@/shared/api/api.types'

// Basic comment type
export interface Comment {
  commentId: number
  parentId: number | null
  curationId?: number
  userId?: number
  nickname: string
  profileImageUrl: string | null
  content: string
  createdAt: string
  updatedAt: string | null
}

// Page info type
export interface PageInfo {
  currentPage: number
  totalPages: number
  totalElements: number
  hasNext: boolean
}

// Paginated comments list
export interface PaginatedComments {
  comments: Comment[]
  pageInfo: PageInfo
}

// API Request types

/**
 * Get comments list request
 */
export interface GetCommentsRequest {
  curationId: number
  page?: number
  size?: number
}

/**
 * Create comment request
 */
export interface CreateCommentRequest {
  parentId?: number | null
  content: string
}

/**
 * Update comment request
 */
export interface UpdateCommentRequest {
  content: string
}

// API Response types

/**
 * Get comments list response
 */
export type GetCommentsResponse = ApiResponse<PaginatedComments>

/**
 * Get single comment response
 */
export type GetCommentByIdResponse = ApiResponse<Comment>

/**
 * Create comment response
 */
export type CreateCommentResponse = ApiResponse<{
  commentId: number
}>

/**
 * Update comment response
 */
export type UpdateCommentResponse = ApiResponse<{
  commentId: number
  parentId: number | null
  content: string
  nickname: string
  profileImage: string | null
  updatedAt: string
}>

/**
 * Delete comment response
 */
export type DeleteCommentResponse = ApiResponse<{
  commentId: number
  deletedAt: string
}>

/**
 * Like curation response
 */
export type LikeCurationResponse = ApiResponse<string>
