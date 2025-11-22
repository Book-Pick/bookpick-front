/**
 * 이미지 업로드 API
 */

export type ImageType = 'profile' | 'curation'

export interface ImageUploadResponse {
  data: {
    filePath: string // S3에 저장된 이미지 URL
  }
}

interface ImageUploadConfig {
  profile: {
    endpoint: string
    formKey: string
  }
  curation: {
    endpoint: string
    formKey: string
  }
}

const IMAGE_UPLOAD_CONFIG: ImageUploadConfig = {
  profile: {
    endpoint: '/bookpick/profile-image',
    formKey: 'profileImage',
  },
  curation: {
    endpoint: '/bookpick/curation-image',
    formKey: 'curationImage',
  },
}

/**
 * 이미지를 S3에 업로드합니다.
 * @param file - 업로드할 이미지 파일
 * @param type - 이미지 타입 ('profile' | 'curation')
 * @returns S3에 저장된 이미지 URL
 */
export const uploadImage = async (file: File, type: ImageType = 'profile'): Promise<string> => {
  const config = IMAGE_UPLOAD_CONFIG[type]
  const formData = new FormData()
  formData.append(config.formKey, file)

  // 개발 환경에서는 proxy 사용, 프로덕션에서는 실제 URL 사용
  const uploadUrl = import.meta.env.DEV
    ? config.endpoint
    : `${import.meta.env.VITE_IMAGE_UPLOAD_URL}${config.endpoint}`

  if (!uploadUrl) {
    throw new Error('이미지 업로드 URL이 설정되지 않았습니다.')
  }

  const response = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => '알 수 없는 오류')
    console.error('Image upload failed:', {
      status: response.status,
      statusText: response.statusText,
      error: errorText,
    })
    throw new Error(`이미지 업로드 실패 (${response.status}): ${errorText}`)
  }

  const result: ImageUploadResponse = await response.json()
  return result.data.filePath
}
