/**
 * 큐레이션 관련 타입 정의
 */

import type { ApiResponse } from '@/shared/api/api.types'

// 확인
export type Book = {
  id?: string
  title: string
  author: string
  image?: string
  isbn?: string
}

export type AuthorRequest = {
  name: string
}

// BookSearchSection에서 사용하는 별칭
export type BookSearchResult = Book

// 독서 취향 타입 (확정)
export interface ReadingPreference {
  preferenceId?: number
  mbti?: string | null
  favoriteBooks?: Book[]
  favoriteAuthors?: AuthorRequest[]
  moods?: string[]
  readingHabits?: string[]
  genres?: string[]
  keywords?: string[]
  readingStyles?: string[]
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

export type Thumbnail = {
  imageUrl: string | null
  imageColor: string | null
}

export interface RecommendTags {
  moods?: string[]
  genres?: string[]
  keywords?: string[]
  styles?: string[]
}

// 확인완료
export interface CurationItem {
  curationId: number
  id?: number
  title: string
  userId: number
  nickName: string
  thumbnail: Thumbnail
  summary?: string
  review: string
  book: {
    title: string
    author: string
    image?: string
    isbn?: string
  }
  likeCount?: number | null
  commentCount?: number
  viewCount?: number
  similarity?: number | null
  matched?: string
  popularityScore?: number
  isDrafted?: boolean
  createdAt?: string
  updatedAt?: string | null
  recommend?: RecommendTags
  profileImageUrl?: string | null
  introduction?: string | null
}

export interface PaginatedCurations {
  sortType: SortType
  description: string
  content: CurationItem[]
  size: number
  hasNext: boolean
  nextCursor: number
}

export interface PageInfo {
  currentPage: number
  totalPages: number
  totalElements: number
  hasNext: boolean
}

export interface PaginatedBooks {
  books: Book[]
  pageInfo: PageInfo
}

// 확인완료
export type SortType = 'similarity' | 'popularity' | 'latest' | 'liked' | 'my'

// API Request 타입들
// 확인완료
export interface GetBooksRequest {
  keyword: string
  page?: number
}

// 확인완료
export type SetReadingPreferenceRequest = ReadingPreference

export type UpdateReadingPreferenceRequest = Partial<ReadingPreference>

// 확인완료
export interface GetCurationsRequest {
  sort: SortType
  cursor?: number
  size: number
}

// 보류
export interface GetCurationsByFieldRequest {
  field: string // ex: 'mbti', 'genre', 'keyword', etc.
  value: string // ex: 'INFJ', '소설', '위로', etc.
  page?: number
  limit?: number
}

// 확인
export interface CreateCurationRequest {
  title?: string
  thumbnail: Thumbnail
  book: Book
  review: string
  recommend: RecommendTags
}

// API Response 타입들
// 확인완료
export type SetReadingPreferenceResponse = ApiResponse<ReadingPreference>

// 확인완료
export type GetReadingPreferenceResponse = ApiResponse<ReadingPreference | null>

// 확인완료
export type UpdateReadingPreferenceResponse = ApiResponse<ReadingPreference>

// 확인완료
export type GetCurationsResponse = ApiResponse<PaginatedCurations>

// 확인완료
export type GetCurationByIdResponse = ApiResponse<CurationItem>

export type CreateCurationResponse = ApiResponse<Curation>

export type SaveCurationResponse = ApiResponse<Curation>

export type UpdateCurationResponse = ApiResponse<Curation>

export type DeleteCurationResponse = ApiResponse<null>

export type GetBooksResponse = ApiResponse<PaginatedBooks>
