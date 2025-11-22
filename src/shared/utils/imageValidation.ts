/**
 * 이미지 파일 검증 유틸리티
 */

export interface ImageValidationOptions {
  maxSizeMB?: number // 최대 파일 크기 (MB)
  allowedTypes?: string[] // 허용된 MIME 타입
}

export interface ImageValidationResult {
  isValid: boolean
  error?: string
}

const DEFAULT_MAX_SIZE_MB = 5
const DEFAULT_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

/**
 * 이미지 파일의 유효성을 검증합니다.
 * @param file - 검증할 파일
 * @param options - 검증 옵션
 * @returns 검증 결과
 */
export const validateImageFile = (
  file: File,
  options: ImageValidationOptions = {},
): ImageValidationResult => {
  const { maxSizeMB = DEFAULT_MAX_SIZE_MB, allowedTypes = DEFAULT_ALLOWED_TYPES } = options

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: '이미지 파일만 업로드 가능합니다. (JPG, PNG, GIF, WEBP)',
    }
  }

  const maxSizeBytes = maxSizeMB * 1024 * 1024
  if (file.size > maxSizeBytes) {
    return {
      isValid: false,
      error: `파일 크기는 ${maxSizeMB}MB 이하여야 합니다.`,
    }
  }

  return { isValid: true }
}

/**
 * 파일을 Base64 Data URL로 변환합니다. (미리보기용)
 * @param file - 변환할 파일
 * @returns Base64 Data URL
 */
export const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      resolve(result)
    }
    reader.onerror = () => {
      reject(new Error('파일을 읽는데 실패했습니다.'))
    }
    reader.readAsDataURL(file)
  })
}
