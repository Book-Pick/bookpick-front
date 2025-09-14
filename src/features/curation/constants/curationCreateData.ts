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
  { name: '따뜻한 베이지', value: '#F5F1EB', class: 'bg-[#F5F1EB]' },
  { name: '차분한 블루', value: '#E8F4FD', class: 'bg-[#E8F4FD]' },
  { name: '신선한 그린', value: '#E8F5E8', class: 'bg-[#E8F5E8]' },
  { name: '우아한 퍼플', value: '#F0E8F5', class: 'bg-[#F0E8F5]' },
  { name: '따뜻한 오렌지', value: '#FFF2E8', class: 'bg-[#FFF2E8]' },
  { name: '로맨틱 핑크', value: '#FCE8F0', class: 'bg-[#FCE8F0]' },
  { name: '클래식 그레이', value: '#F5F5F5', class: 'bg-[#F5F5F5]' },
  { name: '따뜻한 옐로우', value: '#FFFCE8', class: 'bg-[#FFFCE8]' },
] as const

// 타입 정의
export type DraftCuration = (typeof DRAFT_CURATIONS)[number]
export type SearchBook = (typeof SEARCH_BOOKS)[number]
export type ColorOption = (typeof COLOR_PALETTE)[number]
