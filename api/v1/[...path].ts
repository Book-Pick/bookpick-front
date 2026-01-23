import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { path } = req.query
  const backendUrl = process.env.API_BASE_URL || 'http://bookpick-test.duckdns.org'

  // 경로 배열을 문자열로 변환
  const apiPath = Array.isArray(path) ? path.join('/') : path || ''
  const targetUrl = `${backendUrl}/api/v1/${apiPath}`

  try {
    // 쿼리 파라미터 추가 (path 제외)
    const queryParams = { ...req.query }
    delete queryParams.path // path는 URL 경로에 사용되므로 쿼리에서 제거

    const queryString = new URLSearchParams(
      Object.entries(queryParams).reduce(
        (acc, [key, value]) => {
          if (typeof value === 'string') {
            acc[key] = value
          } else if (Array.isArray(value)) {
            acc[key] = value.join(',')
          }
          return acc
        },
        {} as Record<string, string>,
      ),
    ).toString()

    const fullUrl = queryString ? `${targetUrl}?${queryString}` : targetUrl

    // 요청 헤더 복사 (인증 토큰 등)
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (req.headers.authorization) {
      headers.Authorization = req.headers.authorization as string
    }

    // HTTP 백엔드로 요청 전달
    const response = await fetch(fullUrl, {
      method: req.method,
      headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    })

    const data = await response.json()
    const status = response.status

    // 응답 헤더 복사
    response.headers.forEach((value, key) => {
      res.setHeader(key, value)
    })

    res.status(status).json(data)
  } catch (error) {
    console.error('Proxy error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
