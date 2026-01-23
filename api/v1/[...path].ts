import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS preflight 요청 처리
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.status(200).end()
    return
  }

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

    // 요청 헤더 복사
    const headers: Record<string, string> = {}

    // Content-Type 헤더 복사
    if (req.headers['content-type']) {
      headers['Content-Type'] = req.headers['content-type'] as string
    }

    // Authorization 헤더 복사
    if (req.headers.authorization) {
      headers.Authorization = req.headers.authorization as string
    }

    // 요청 본문 처리
    let body: string | undefined
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      if (req.body) {
        // 이미 객체로 파싱된 경우 JSON.stringify, 문자열인 경우 그대로 사용
        body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body)
      }
    }

    // HTTP 백엔드로 요청 전달
    const response = await fetch(fullUrl, {
      method: req.method,
      headers,
      body,
    })

    const data = await response.json()
    const status = response.status

    // CORS 헤더 추가
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    // 응답 헤더 복사
    response.headers.forEach((value, key) => {
      // CORS 헤더는 이미 설정했으므로 제외
      if (!key.toLowerCase().startsWith('access-control-')) {
        res.setHeader(key, value)
      }
    })

    res.status(status).json(data)
  } catch (error) {
    console.error('Proxy error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
