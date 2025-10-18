/**
 * 큐레이션 API 목업 데이터 - API 연결 후 삭제 예정
 */

import type {
  ReadingPreference,
  Curation,
  SetReadingPreferenceResponse,
  GetReadingPreferenceResponse,
  UpdateReadingPreferenceResponse,
  GetCurationsResponse,
  CreateCurationResponse,
  SaveCurationResponse,
  UpdateCurationResponse,
  DeleteCurationResponse,
} from '../types/curation.types'

// 목업 독서 취향 데이터
export const mockReadingPreference: ReadingPreference = {
  userId: 1,
  mbti: 'INFJ',
  favoriteBooks: [
    {
      id: '1',
      title: '데미안',
      author: '헤르만 헤세',
      image: '/images/demian_thumbnail.jpeg',
      isbn: '9788937461002',
    },
    {
      id: '2',
      title: '어린왕자',
      author: '생텍쥐페리',
      image: '/images/little_prince_thumbnail.jpeg',
      isbn: '9788937460109',
    },
  ],
  authors: ['무라카미 하루키', '김영하'],
  mood: ['퇴근 후', '카페', '침대에서'],
  readingHabits: ['한 번에 완독하는 편', '밑줄 긋거나 형광펜으로 표시하는 편'],
  preferredGenres: ['소설', '에세이', '심리학'],
  keywords: ['위로', '성장', '공감'],
  readingStyles: ['몰입형', '감성적', '깊이 있는 사색'],
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z',
}

// 목업 큐레이션 데이터
export const mockCurations: Curation[] = [
  {
    id: 1,
    userId: 1,
    similarity: 95,
    title:
      '회사 다니면서 읽은 철학책들이 제 인생을 바꿔놨어요. 진짜 우울했던 시절에 도움된 책 추천해드려요',
    description:
      '저 정말 2년 전만 해도 매일 지하철에서 핸드폰만 보고, 점심시간엔 그냥 유튜브 보면서 시간 때우고 살았거든요. 그런데 우연히 도서관에서 집어든 철학책 한 권이 제 삶을 완전 바꿔놨어요.',
    curator: '사유하는 직장인',
    curatorId: 1,
    likes: 24,
    comments: 8,
    views: 127,
    tags: ['철학', '일상', '에세이'],
    price: 18500,
    thumbnailImage: '/images/sample_image_01.jpeg',
    thumbnailColor: null,
    status: 'published',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 2,
    userId: 2,
    similarity: 92,
    title: '이별 후 울었던 밤들에 위로가 되어준 에세이 모음집',
    description:
      '작년에 3년 사귄었던 연인과 헤어지고 나서 정말 힘들었어요. 매일 밤에 울고, 아침에 일어나서도 아무거도 하기 싫고... 그럴 때 친구가 추천해준 에세이들이 정말 도움이 되더라고요.',
    curator: '감성큐레이터',
    curatorId: 2,
    likes: 18,
    comments: 5,
    views: 89,
    tags: ['힐링', '에세이', '감성'],
    price: 15900,
    thumbnailImage: null,
    thumbnailColor: '#FEE2E2',
    status: 'published',
    createdAt: '2024-01-12T10:00:00Z',
    updatedAt: '2024-01-12T10:00:00Z',
  },
  {
    id: 3,
    userId: 1,
    similarity: 89,
    title: '[임시저장] 읽고 있는 자기계발서',
    description: '아직 작성 중인 큐레이션입니다.',
    curator: '사유하는 직장인',
    curatorId: 1,
    likes: 0,
    comments: 0,
    views: 0,
    tags: ['자기계발'],
    price: 0,
    thumbnailImage: null,
    thumbnailColor: null,
    status: 'draft',
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z',
  },
]

// API 응답 목업 데이터
export const mockSetReadingPreferenceResponse: SetReadingPreferenceResponse = {
  status: 200,
  message: '독서 취향이 성공적으로 설정되었습니다.',
  data: mockReadingPreference,
}

export const mockGetReadingPreferenceResponse: GetReadingPreferenceResponse = {
  status: 200,
  data: mockReadingPreference,
}

export const mockUpdateReadingPreferenceResponse: UpdateReadingPreferenceResponse = {
  status: 200,
  message: '독서 취향이 성공적으로 수정되었습니다.',
  data: mockReadingPreference,
}

export const mockGetCurationsResponse: GetCurationsResponse = {
  status: 200,
  data: {
    curations: mockCurations.filter((c) => c.status === 'published'),
    total: 2,
    page: 1,
    limit: 10,
  },
}

export const mockGetPersonalizedCurationsResponse: GetCurationsResponse = {
  status: 200,
  data: {
    curations: mockCurations.filter((c) => c.status === 'published'),
    total: 2,
    page: 1,
    limit: 10,
  },
}

export const mockGetCurationsByFieldResponse: GetCurationsResponse = {
  status: 200,
  data: {
    curations: mockCurations.filter((c) => c.status === 'published').slice(0, 1),
    total: 1,
    page: 1,
    limit: 10,
  },
}

export const mockCreateCurationResponse: CreateCurationResponse = {
  status: 201,
  message: '큐레이션이 성공적으로 작성되었습니다.',
  data: mockCurations[0],
}

export const mockSaveCurationResponse: SaveCurationResponse = {
  status: 200,
  message: '큐레이션이 성공적으로 저장되었습니다.',
  data: mockCurations[0],
}

export const mockUpdateCurationResponse: UpdateCurationResponse = {
  status: 200,
  message: '큐레이션이 성공적으로 수정되었습니다.',
  data: mockCurations[0],
}

export const mockGetMyCurationsResponse: GetCurationsResponse = {
  status: 200,
  data: {
    curations: mockCurations.filter((c) => c.userId === 1 && c.status === 'published'),
    total: 1,
    page: 1,
    limit: 10,
  },
}

export const mockGetMyDraftCurationsResponse: GetCurationsResponse = {
  status: 200,
  data: {
    curations: mockCurations.filter((c) => c.userId === 1 && c.status === 'draft'),
    total: 1,
    page: 1,
    limit: 10,
  },
}

export const mockDeleteCurationResponse: DeleteCurationResponse = {
  status: 200,
  message: '큐레이션이 성공적으로 삭제되었습니다.',
  data: null,
}
