/**
 * 큐레이션 작성 페이지에 사용되는 mockup 데이터
 */

// 임시 저장된 글 목록
export const DRAFT_CURATIONS = [
  {
    id: '1',
    title: '위로가 필요한 날 읽는 책',
    content: '힘든 하루를 보내고 집에 돌아왔을 때...',
    createdAt: '2024-01-15',
    thumbnail: null,
  },
  {
    id: '2',
    title: '새해 목표를 세우고 싶다면',
    content: '새해가 되면 많은 사람들이 목표를 세우는데...',
    createdAt: '2024-01-10',
    thumbnail: null,
  },
  {
    id: '3',
    title: '철학적 사고를 키우는 책들',
    content: '일상에서 깊이 있는 사고를 하고 싶다면...',
    createdAt: '2024-01-05',
    thumbnail: null,
  },
] as const

// 책 검색 결과 mockup
export const SEARCH_BOOKS = [
  {
    id: '1',
    title: '마음의 평정',
    author: '마크 윌리엄스',
    image: '/images/book1.jpg',
    isbn: '9788934981234',
  },
  {
    id: '2',
    title: '지적 대화를 위한 넓고 얕은 지식',
    author: '채사장',
    image: '/images/book2.jpg',
    isbn: '9788934985678',
  },
] as const

// 색상 팔레트 옵션
export const COLOR_PALETTE = [
  // Red
  { name: 'Red 100', value: '#FEE2E2' },
  { name: 'Red 200', value: '#FECACA' },
  { name: 'Red 300', value: '#FCA5A5' },
  { name: 'Red 400', value: '#E85660' },

  // Orange
  { name: 'Orange 100', value: '#FFEDD5' },
  { name: 'Orange 200', value: '#FED7AA' },
  { name: 'Orange 300', value: '#FDBA74' },
  { name: 'Orange 400', value: '#F67152' },

  // Yellow
  { name: 'Yellow 100', value: '#FEF3C7' },
  { name: 'Yellow 200', value: '#FDE68A' },
  { name: 'Yellow 300', value: '#FCD34D' },
  { name: 'Yellow 400', value: '#F9CC4C' },

  // Lime
  { name: 'Lime 100', value: '#ECFCCB' },
  { name: 'Lime 200', value: '#D9F99D' },
  { name: 'Lime 300', value: '#BEF264' },
  { name: 'Lime 400', value: '#9ED464' },

  // Emerald
  { name: 'Emerald 100', value: '#D1FAE5' },
  { name: 'Emerald 200', value: '#A7F3D0' },
  { name: 'Emerald 300', value: '#6EE7B7' },
  { name: 'Emerald 400', value: '#45CCAB' },

  // Cyan
  { name: 'Cyan 100', value: '#CFFAFE' },
  { name: 'Cyan 200', value: '#A5F3FC' },
  { name: 'Cyan 300', value: '#67E8F9' },
  { name: 'Cyan 400', value: '#48C4E0' },

  // Blue
  { name: 'Blue 100', value: '#DBEAFE' },
  { name: 'Blue 200', value: '#BFDBFE' },
  { name: 'Blue 300', value: '#93C5FD' },
  { name: 'Blue 400', value: '#5B9AE7' },

  // Violet
  { name: 'Violet 100', value: '#EDE9FE' },
  { name: 'Violet 200', value: '#DDD6FE' },
  { name: 'Violet 300', value: '#C4B5FD' },
  { name: 'Violet 400', value: '#A891E9' },

  // Pink
  { name: 'Pink 100', value: '#FCE7F3' },
  { name: 'Pink 200', value: '#FBCFE8' },
  { name: 'Pink 300', value: '#F9A8D4' },
  { name: 'Pink 400', value: '#EA65AC' },

  // Gray
  { name: 'Gray 100', value: '#F3F4F6' },
  { name: 'Gray 200', value: '#E5E7EB' },
  { name: 'Gray 300', value: '#D1D5DB' },
  { name: 'Gray 400', value: '#636D76' },
] as const

// 타입 정의
export type DraftCuration = (typeof DRAFT_CURATIONS)[number]
export type SearchBook = (typeof SEARCH_BOOKS)[number]
export type ColorOption = (typeof COLOR_PALETTE)[number]
