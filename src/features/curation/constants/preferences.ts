/**
 * 독서 취향 설정에 사용되는 상수들
 */

export const MBTI_TYPES = [
  'INTJ',
  'INTP',
  'ENTJ',
  'ENTP',
  'INFJ',
  'INFP',
  'ENFJ',
  'ENFP',
  'ISTJ',
  'ISFJ',
  'ESTJ',
  'ESFJ',
  'ISTP',
  'ISFP',
  'ESTP',
  'ESFP',
] as const

export const READING_MOODS = [
  '퇴근 후',
  '따뜻한 차 한잔',
  '비 오는 날',
  '지하철',
  '카페',
  '침대에서',
  '공원',
  '도서관',
  '새벽 시간',
  '주말 오후',
] as const

export const GENRES = [
  '소설',
  '에세이',
  '역사',
  '예술',
  '자기개발',
  '경제',
  '심리학',
  '사회',
  '교육',
  '과학',
  '철학',
  '종교',
] as const

export const KEYWORDS = [
  '위로',
  '성장',
  '사랑',
  '공감',
  '지식',
  '유머',
  '추리',
  '모험',
  '판타지',
  '현실',
  '미래',
  '과거',
] as const

// 타입 정의
export type MBTIType = (typeof MBTI_TYPES)[number]
export type ReadingMood = (typeof READING_MOODS)[number]
export type Genre = (typeof GENRES)[number]
export type Keyword = (typeof KEYWORDS)[number]
