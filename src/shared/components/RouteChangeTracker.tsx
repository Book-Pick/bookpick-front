import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ReactGA from 'react-ga4'

const RouteChangeTracker = () => {
  const location = useLocation()
  const [initialized, setInitialized] = useState(false)

  // 프로덕션 환경에서만 구글 애널리틱스 초기화
  useEffect(() => {
    const gaId = import.meta.env.VITE_APP_GOOGLE_ANALYTICS_ID
    if (import.meta.env.PROD && gaId) {
      ReactGA.initialize(gaId)
      setInitialized(true)
    }
  }, [])

  // location 변경 감지시 pageview 이벤트 전송
  useEffect(() => {
    if (initialized) {
      ReactGA.set({ page: location.pathname })
      ReactGA.send('pageview')
    }
  }, [initialized, location])

  // 페이지 이동 시 스크롤을 맨 위로 초기화
  // 모바일 Safari 등 모든 브라우저에서 확실하게 작동하도록 여러 방법 사용
  useEffect(() => {
    window.scrollTo(0, 0)

    // document 요소의 scrollTop 직접 설정 (iOS Safari 대응)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [location.pathname])

  return null
}

export default RouteChangeTracker
