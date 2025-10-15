export interface ApiResponse<T> {
  status: number
  data: T
  message?: string
}

export interface AxiosErrorResponse {
  response?: {
    status?: number
    data?: {
      message?: string
    }
  }
}
