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

      const redirectToLogin = () => {
        localStorage.removeItem('bookpick-auth')
        setTimeout(() => {
          window.location.href = '/login'
        }, 1500)
      }

      if (!response) {
        toast.error('네트워크 오류가 발생했습니다.', { id: 'network-error' })
        return Promise.reject(error)
      }

      if (message) {
        switch (status) {
          case 401: {
            const isAuthEndpoint =
              error.config?.url?.includes('/login') || error.config?.url?.includes('/register')

            if (!isAuthEndpoint) {
              toast.error('유효하지 않은 인증 정보입니다. 다시 로그인하세요.', {
                id: 'auth-required',
              })
              redirectToLogin()
            }
            break
          }
          case 403:
            toast.error(message, { id: 'forbidden' })
            redirectToLogin()
            break
          case 500:
            if (exceptionType?.includes('JwtTokenExpiredException')) {
              toast.error(message, { id: 'token-expired' })
              redirectToLogin()
            } else if (exceptionType?.includes('InvalidTokenTypeException')) {
              toast.error(message, { id: 'invalid-token' })
              redirectToLogin()
            } else {
              toast.error(message, { id: 'server-error' })
            }
            break
        }
      }

      return Promise.reject(error)
    },
  )

  return instance
}
