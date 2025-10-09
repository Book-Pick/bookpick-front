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
  { name: 'Red 100', value: '#FEE2E2', class: 'bg-red-100' },
  { name: 'Red 200', value: '#FECACA', class: 'bg-red-200' },
  { name: 'Red 300', value: '#FCA5A5', class: 'bg-red-300' },
  { name: 'Red 400', value: '#F87171', class: 'bg-red-400' },

  // Orange
  { name: 'Orange 100', value: '#FFEDD5', class: 'bg-orange-100' },
  { name: 'Orange 200', value: '#FED7AA', class: 'bg-orange-200' },
  { name: 'Orange 300', value: '#FDBA74', class: 'bg-orange-300' },
  { name: 'Orange 400', value: '#FB923C', class: 'bg-orange-400' },

  // Yellow
  { name: 'Yellow 100', value: '#FEF3C7', class: 'bg-yellow-100' },
  { name: 'Yellow 200', value: '#FDE68A', class: 'bg-yellow-200' },
  { name: 'Yellow 300', value: '#FCD34D', class: 'bg-yellow-300' },
  { name: 'Yellow 400', value: '#FACC15', class: 'bg-yellow-400' },

  // Lime
  { name: 'Lime 100', value: '#ECFCCB', class: 'bg-lime-100' },
  { name: 'Lime 200', value: '#D9F99D', class: 'bg-lime-200' },
  { name: 'Lime 300', value: '#BEF264', class: 'bg-lime-300' },
  { name: 'Lime 400', value: '#A3E635', class: 'bg-lime-400' },

  // Emerald
  { name: 'Emerald 100', value: '#D1FAE5', class: 'bg-emerald-100' },
  { name: 'Emerald 200', value: '#A7F3D0', class: 'bg-emerald-200' },
  { name: 'Emerald 300', value: '#6EE7B7', class: 'bg-emerald-300' },
  { name: 'Emerald 400', value: '#34D399', class: 'bg-emerald-400' },

  // Cyan
  { name: 'Cyan 100', value: '#CFFAFE', class: 'bg-cyan-100' },
  { name: 'Cyan 200', value: '#A5F3FC', class: 'bg-cyan-200' },
  { name: 'Cyan 300', value: '#67E8F9', class: 'bg-cyan-300' },
  { name: 'Cyan 400', value: '#22D3EE', class: 'bg-cyan-400' },

  // Blue
  { name: 'Blue 100', value: '#DBEAFE', class: 'bg-blue-100' },
  { name: 'Blue 200', value: '#BFDBFE', class: 'bg-blue-200' },
  { name: 'Blue 300', value: '#93C5FD', class: 'bg-blue-300' },
  { name: 'Blue 400', value: '#60A5FA', class: 'bg-blue-400' },

  // Violet
  { name: 'Violet 100', value: '#EDE9FE', class: 'bg-violet-100' },
  { name: 'Violet 200', value: '#DDD6FE', class: 'bg-violet-200' },
  { name: 'Violet 300', value: '#C4B5FD', class: 'bg-violet-300' },
  { name: 'Violet 400', value: '#A78BFA', class: 'bg-violet-400' },

  // Pink
  { name: 'Pink 100', value: '#FCE7F3', class: 'bg-pink-100' },
  { name: 'Pink 200', value: '#FBCFE8', class: 'bg-pink-200' },
  { name: 'Pink 300', value: '#F9A8D4', class: 'bg-pink-300' },
  { name: 'Pink 400', value: '#F472B6', class: 'bg-pink-400' },

  // Gray
  { name: 'Gray 100', value: '#F3F4F6', class: 'bg-gray-100' },
  { name: 'Gray 200', value: '#E5E7EB', class: 'bg-gray-200' },
  { name: 'Gray 300', value: '#D1D5DB', class: 'bg-gray-300' },
  { name: 'Gray 400', value: '#9CA3AF', class: 'bg-gray-400' },
] as const

// 타입 정의
export type DraftCuration = (typeof DRAFT_CURATIONS)[number]
export type SearchBook = (typeof SEARCH_BOOKS)[number]
export type ColorOption = (typeof COLOR_PALETTE)[number]
