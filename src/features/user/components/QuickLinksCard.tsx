import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

interface QuickLink {
  label: string
  path: string
}

const quickLinks: QuickLink[] = [
  { label: '좋아요 한 추천사', path: '/mypage/likes' },
  { label: '내 추천사 관리', path: '/mypage/curation' },
  // { label: '주문 내역', path: '/order/history' },
  { label: '읽은 책 관리', path: '/mypage/reading-history' },
]

export default function QuickLinksCard() {
  const navigate = useNavigate()

  const handleLinkClick = (path: string) => {
    if (path === '/mypage/curation') {
      navigate(path)
    } else {
      toast('서비스 준비 중입니다.', {
        icon: '⏳',
      })
    }
  }

  return (
    <div className='flex flex-col gap-4 md:gap-7.5 md:border md:border-border md:rounded-xl md:p-7.5'>
      <h3 className='text-base font-semibold md:text-xl'>바로 가기</h3>
      <div className='flex flex-col gap-0 md:gap-4'>
        {quickLinks.map((link, index) => (
          <button
            key={index}
            onClick={() => handleLinkClick(link.path)}
            className='py-2.5 px-2.5 text-base font-medium text-left hover:bg-muted transition-colors'
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  )
}
