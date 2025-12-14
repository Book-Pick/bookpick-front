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
  '눈 오는 날',
  '지하철·버스',
  '카페',
  '침대에서',
  '공원',
  '도서관',
  '서점에서',
  '새벽 시간',
  '주말 오후',
  '점심시간',
  '늦은 밤',
  '잠들기 전',
  '혼자만의 시간',
  '창가에서',
  '음악과 함께',
  '여행 중',
  '휴가 중',
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
  '공포',
  '모험',
  '판타지',
  '현실',
  '미래',
  '과거',
] as const

export const READING_HABITS = [
  '한 번에 완독하는 편',
  '밑줄 긋거나 형광펜으로 표시하는 편',
  '여러 권을 동시에 읽는 편',
  '책갈피를 많이 사용하는 편',
  '읽은 내용을 메모하는 편',
  '소리 내어 읽는 편',
  '조용한 곳에서만 읽는 편',
  '음악을 들으며 읽는 편',
  '읽은 책을 다시 읽는 편',
  '독서 모임에 참여하는 편',
] as const

export const READING_STYLES = [
  '속독형',
  '몰입형',
  '정독형',
  '취향 탐색형',
  '스토리 중심',
  '지식 위주',
  '감성적',
  '논리적',
  '창의적',
  '실용적',
  '비평적',
  '상상력 중시',
  '느긋한 독서',
  '깊이 있는 사색',
  '가볍게 즐기기',
] as const

// 좋아하는 작가 목록 (검색용 mockup 데이터)
export const FAVORITE_AUTHORS = [
  '무라카미 하루키',
  '김영하',
  '공지영',
  '은희경',
  '신경숙',
  '정유정',
  '김훈',
  '이외수',
  '박완서',
  '조정래',
  '황석영',
  '이문열',
  '최인훈',
  '윤흥길',
  '서하진',
  '김별아',
  '정이현',
  '백가흠',
  '천선란',
  '정세랑',
] as const

// 타입 정의
export type MBTIType = (typeof MBTI_TYPES)[number]
export type ReadingMood = (typeof READING_MOODS)[number]
export type Genre = (typeof GENRES)[number]
export type Keyword = (typeof KEYWORDS)[number]
export type ReadingHabit = (typeof READING_HABITS)[number]
export type ReadingStyle = (typeof READING_STYLES)[number]
export type FavoriteAuthor = (typeof FAVORITE_AUTHORS)[number]
