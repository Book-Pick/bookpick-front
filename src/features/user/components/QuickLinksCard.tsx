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
    <div className='flex flex-col gap-7.5 border border-border rounded-xl p-7.5 h-full'>
      <h3 className='font-subtitle'>바로 가기</h3>
      <div className='flex flex-col gap-4'>
        {quickLinks.map((link, index) => (
          <button
            key={index}
            onClick={() => navigate(link.path)}
            className='flex items-center py-2.5 px-2.5 font-label hover:bg-muted rounded transition-colors text-left'
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  )
}
