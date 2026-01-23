/**
 * API Base URL 설정
 * - 개발 환경: VITE_APP_BOOKPICK_API_URL이 설정되어 있으면 사용, 없으면 빈 문자열 (Vite 프록시 사용)
 * - 프로덕션 환경: 빈 문자열 (Vercel 서버리스 함수 사용)
 */
export const getApiBaseUrl = (): string => {
  // 프로덕션 환경에서는 항상 상대 경로 사용 (서버리스 함수를 거치도록)
  if (import.meta.env.PROD) {
    return ''
  }

  // 개발 환경에서는 환경변수가 있으면 사용, 없으면 빈 문자열 (Vite 프록시 사용)
  return import.meta.env.VITE_APP_BOOKPICK_API_URL || ''
}
