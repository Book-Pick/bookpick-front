/**
 * Fisher-Yates 알고리즘으로 배열을 랜덤하게 섞기
 * @param array - 섞을 배열
 * @returns 새로운 섞인 배열 (원본 배열은 변경되지 않음)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
