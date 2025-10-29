import ProfileCard from '../components/ProfileCard'
import QuickLinksCard from '../components/QuickLinksCard'
import StatsGrid from '../components/StatsGrid'
import RecentFeedbackCard from '../components/RecentFeedbackCard'

// TODO: 실제 API 연동 시 데이터 교체
const mockUserData = {
  name: '감성큐레이터',
  favoriteGenres: ['에세이', '심리'],
  introduction: '"책과 함께하는 모든 순간을 사랑합니다."',
  avatarUrl: '',
}

const mockStats = {
  totalCurations: 34,
  totalViews: 12423,
  totalLikes: 12,
}

const mockFeedbacks = [
  {
    id: 1,
    content:
      '큐레이터님 덕분에 인생 책 만났어요! 정말 감사합니다. 마지막 문장이 계속 마음에 맴sdssd도.sdfasfsd',
    date: '2025-7-22',
  },
  {
    id: 2,
    content: '이런 책이 있는 줄도 몰랐네요. 신선한 경험이었습니다.',
    date: '2025-7-20',
  },
  {
    id: 3,
    content: '추천해주신 책 덕분에 힐링 되었어요. 감사합니다!',
    date: '2025-7-18',
  },
  {
    id: 4,
    content: '큐레이션 내용이 정말 자세하고 좋았습니다.',
    date: '2025-7-15',
  },
]

export default function MyDashboardPage() {
  return (
    <div className='flex flex-col gap-8 md:gap-[60px] my-6 md:my-10 xl:my-15'>
      {/* 페이지 제목 */}
      <h2 className='font-title'>마이페이지</h2>

      {/* 메인 콘텐츠 - 모바일: 1열, 데스크톱: 2열 Grid 레이아웃 */}
      <div className='flex flex-col gap-6 md:grid md:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] md:grid-rows-[2fr_3fr]'>
        {/* Row 1, Col 1: 프로필 카드 */}
        <ProfileCard
          name={mockUserData.name}
          favoriteGenres={mockUserData.favoriteGenres}
          introduction={mockUserData.introduction}
          avatarUrl={mockUserData.avatarUrl}
        />

        {/* Row 1, Col 2: 통계 카드 */}
        <StatsGrid
          totalCurations={mockStats.totalCurations}
          totalViews={mockStats.totalViews}
          totalLikes={mockStats.totalLikes}
        />

        {/* Row 2, Col 1: 바로 가기 */}
        <QuickLinksCard />

        {/* Row 2, Col 2: 새로운 피드백 */}
        <RecentFeedbackCard feedbacks={mockFeedbacks} />
      </div>
    </div>
  )
}
