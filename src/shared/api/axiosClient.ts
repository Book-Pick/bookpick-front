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
      const message = response?.data?.message
      const exceptionType = response?.data?.exception

      const redirectToLogin = (message?: string) => {
        localStorage.removeItem('bookpick-auth')
        toast.error(message || '다시 로그인 하세요.')
        setTimeout(() => {
          window.location.href = '/login'
        }, 1500)
      }

      if (!response) {
        toast.error('네트워크 오류가 발생했습니다.')
        return Promise.reject(error)
      }

      if (message) {
        switch (status) {
          case 401: {
            const isAuthEndpoint =
              error.config?.url?.includes('/login') || error.config?.url?.includes('/register')

            if (!isAuthEndpoint) {
              redirectToLogin(message || '인증이 필요합니다.')
            }
            break
          }
          case 403:
            toast.error(message)
            redirectToLogin()
            break
          // case 400:
          //   toast.error(message)
          //   break
          case 500:
            if (exceptionType?.includes('JwtTokenExpiredException')) {
              redirectToLogin(message || '로그인 토큰이 만료되었습니다.')
            } else if (exceptionType?.includes('InvalidTokenTypeException')) {
              redirectToLogin(message || ' 유효하지않은 토큰 타입입니다.')
            } else {
              toast.error(message)
              // window.location.href = '/error'
            }
            break
          // case 409:
          //   toast.error(message)
          //   break
          // default:
          //   toast.error(message)
        }
      }

      return Promise.reject(error)
    },
  )

  return instance
}
