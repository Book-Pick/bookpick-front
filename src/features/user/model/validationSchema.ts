import { z } from 'zod'

// 프로필 설정 폼 스키마
export const profileSettingsSchema = z.object({
  nickname: z
    .string()
    .min(2, '닉네임은 최소 2자 이상이어야 합니다')
    .max(20, '닉네임은 최대 20자까지 입력 가능합니다')
    .regex(/^[가-힣a-zA-Z0-9_]+$/, '닉네임은 한글, 영문, 숫자, 언더스코어만 사용 가능합니다'),
  introduction: z.string().max(100, '한 줄 소개는 최대 100자까지 입력 가능합니다'),
})

export type ProfileSettingsFormData = z.infer<typeof profileSettingsSchema>
