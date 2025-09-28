import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import toast from 'react-hot-toast'

export const createAxiosClient = (
  baseURL: string,
  extraHeaders?: Record<string, string> | Record<string, object>,
  config?: AxiosRequestConfig,
): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
    ...config,
  })

  instance.interceptors.request.use(
    (config) => {
      const authData = localStorage.getItem('bookpick-auth')
      if (authData) {
        try {
          const parsed = JSON.parse(authData)
          if (parsed.token?.accessToken) {
            config.headers.Authorization = `Bearer ${parsed.token.accessToken}`
          }
        } catch (error) {
          console.error('Failed to parse auth data:', error)
        }
      }
      return config
    },
    (error) => Promise.reject(error),
  )

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response } = error
      const status = response?.status
      const message = response?.message

      const redirectToLogin = () => {
        localStorage.removeItem('bookpick-auth')
        window.location.href = '/login'
      }

      if (!response) {
        toast.error('네트워크 오류가 발생했습니다.')
        return Promise.reject(error)
      }

      switch (status) {
        case 401:
          if (message.toUpperCase() === 'UNAUTHORIZED') {
            toast.error('로그인 정보가 유효하지 않습니다.')
            redirectToLogin()
          }
          break
        case 403:
          if (message.toUpperCase() === 'FORBIDDEN') {
            toast.error('서비스 접근 권한이 없습니다.')
            localStorage.removeItem('bookpick-auth')
            window.location.href = '/login'
          }
          break
        case 400:
          toast.error('잘못된 요청입니다.')
          return Promise.reject(error)
        case 500:
          window.location.href = '/error'
          toast.error('서버 오류가 발생했습니다.')
          break
        case 409:
          // 409 에러는 API 레벨에서 커스텀 처리하도록 에러를 그대로 전달
          return Promise.reject(error)
        default:
          toast.error(message || '알 수 없는 오류가 발생했습니다.')
      }
    },
  )

  return instance
}
