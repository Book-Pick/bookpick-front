import { shuffleArray } from '@/shared/utils/array'

interface RecommendTags {
  moods?: string[]
  genres?: string[]
  keywords?: string[]
  styles?: string[]
}

/**
 * recommend 객체의 모든 태그를 합쳐서 랜덤하게 섞은 후 최대 N개 반환
 * @param recommend - moods, genres, keywords, styles를 포함하는 객체
 * @param maxCount - 최대 반환 개수 (기본값: 5)
 * @returns 랜덤하게 섞인 태그 배열
 */
export function getRandomTags(
  recommend: RecommendTags | null | undefined,
  maxCount: number = 5,
): string[] {
  if (!recommend) return []

  const allTags = [
    ...(recommend.moods || []),
    ...(recommend.genres || []),
    ...(recommend.keywords || []),
    ...(recommend.styles || []),
  ]

  return shuffleArray(allTags).slice(0, maxCount)
}
