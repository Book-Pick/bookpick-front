import { useNavigate } from 'react-router-dom'

interface QuickLink {
  label: string
  path: string
}

const quickLinks: QuickLink[] = [
  { label: '좋아요 한 추천사', path: '/mypage/liked-curations' },
  { label: '내 추천사 관리', path: '/mypage/curation' },
  { label: '주문 내역', path: '/order/history' },
  { label: '읽은 책 관리', path: '/mypage/reading-history' },
]

export default function QuickLinksCard() {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col gap-5 md:gap-7.5 border border-border rounded-xl p-5 md:p-7.5 md:h-full'>
      <h3 className='text-lg md:text-xl font-semibold'>바로 가기</h3>
      {/* 모바일: 가로 스크롤 칩, 데스크톱: 세로 리스트 */}
      <div className='flex flex-row md:flex-col gap-2.5 md:gap-4 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 -mx-1 px-1 scrollbar-hide'>
        {quickLinks.map((link, index) => (
          <button
            key={index}
            onClick={() => navigate(link.path)}
            className='flex-shrink-0 md:flex-shrink py-3 px-5 md:py-2.5 md:px-2.5 text-sm md:text-base font-medium bg-card md:bg-transparent hover:bg-muted rounded-full md:rounded transition-colors border border-border md:border-0 whitespace-nowrap md:text-left'
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  )
}
