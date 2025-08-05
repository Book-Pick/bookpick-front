import { z } from 'zod'

export const registerSchema = z
  .object({
    email: z.email({ message: '유효한 이메일을 입력하세요' }),
    password: z.string().min(8, { message: '비밀번호는 8자 이상이어야 합니다' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  })

export type RegisterFormData = z.infer<typeof registerSchema>
