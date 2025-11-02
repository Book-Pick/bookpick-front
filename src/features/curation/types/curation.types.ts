/**
 * 큐레이션 관련 타입 정의
 */

import type { ApiResponse } from '@/shared/api/api.types'

type Book = {
  id: string
  title: string
  author: string
  image: string
  isbn: string
}

// 독서 취향 타입
export interface ReadingPreference {
  preferenceId?: number
  mbti?: string | null
  favoriteBooks?: string[]
  authors?: string[] // 추후 추가 예정 필드
  moods?: string[]
  readingHabits?: string[]
  genres?: string[]
  keywords?: string[]
  trends?: string[]
}

// 큐레이션 타입
export interface Curation {
  id: number
  userId?: number
  curator: string
  curatorId: number
  title: string
  description: string
  tags: string[]
  price: number
  thumbnailImage?: string | null
  thumbnailColor?: string | null
  likes: number
  comments: number
  views: number
  similarity?: number
  status: 'draft' | 'published'
  createdAt?: string
  updatedAt?: string | null
}

// API Request 타입들
export type SetReadingPreferenceRequest = ReadingPreference

export type UpdateReadingPreferenceRequest = Partial<ReadingPreference>

export interface GetCurationsByFieldRequest {
  field: string // ex: 'mbti', 'genre', 'keyword', etc.
  value: string // ex: 'INFJ', '소설', '위로', etc.
  page?: number
  limit?: number
}

export interface CreateCurationRequest {
  title: string
  description: string
  tags: string[]
  book: Book
  thumbnailImage?: string | null
  thumbnailColor?: string | null
}

export interface SaveCurationRequest extends CreateCurationRequest {
  isDraft: boolean // true: 임시저장, false: 일반저장
}

export interface UpdateCurationRequest extends Partial<CreateCurationRequest> {
  id: number
}

// 페이지네이션 포함 큐레이션 데이터
export interface PaginatedCurations {
  curations: Curation[]
  total: number
  page: number
  limit: number
}

// 책 검색 결과
export interface BookSearchResult {
  title: string
  author: string
  image: string
  isbn?: string // 서버에서 제공하지 않을 수 있음
}

export interface PageInfo {
  currentPage: number
  totalPages: number
  totalElements: number
  hasNext: boolean
}

export interface PaginatedBooks {
  books: BookSearchResult[]
  pageInfo: PageInfo
}

// API Response 타입들
export type SetReadingPreferenceResponse = ApiResponse<ReadingPreference>

export type GetReadingPreferenceResponse = ApiResponse<ReadingPreference | null>

export type UpdateReadingPreferenceResponse = ApiResponse<ReadingPreference>

export type GetCurationsResponse = ApiResponse<PaginatedCurations>

export type CreateCurationResponse = ApiResponse<Curation>

export type SaveCurationResponse = ApiResponse<Curation>

export type UpdateCurationResponse = ApiResponse<Curation>

export type DeleteCurationResponse = ApiResponse<null>

export type GetBooksResponse = ApiResponse<PaginatedBooks>
