import ProfileCard from '../components/ProfileCard'
import QuickLinksCard from '../components/QuickLinksCard'
import StatsGrid from '../components/StatsGrid'
import RecentFeedbackCard from '../components/RecentFeedbackCard'
import { useGetProfile } from '../hooks/useUser'
import { useGetCurations } from '@/features/curation/hooks/useCuration'

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
    content: '추천사 내용이 정말 자세하고 좋았습니다.',
    date: '2025-7-15',
  },
]

export default function MyDashboardPage() {
  const { data: profile } = useGetProfile()

  const { data: myCurations } = useGetCurations({
    sort: 'my',
    cursor: 0,
    size: 1000,
  })

  const { data: likedCurations } = useGetCurations({
    sort: 'liked',
    cursor: 0,
    size: 1000,
  })

  const myCurationsCount = myCurations?.content?.length ?? 0
  const totalViewCount =
    myCurations?.content?.reduce((acc, cur) => acc + (cur.viewCount ?? 0), 0) ?? 0
  const likedCurationsCount = likedCurations?.content?.length ?? 0

  return (
    <div className='flex flex-col gap-5 my-5 md:gap-[60px] md:my-10 xl:my-15'>
      {/* 페이지 제목 - 데스크톱만 표시 */}
      <h2 className='font-title hidden md:block'>마이페이지</h2>

      {/* 메인 콘텐츠 - 모바일: 1열, 데스크톱: 2열 Grid 레이아웃 */}
      <div className='flex flex-col gap-5 md:grid md:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] md:grid-rows-[auto_auto] md:gap-6'>
        {/* Row 1, Col 1: 프로필 카드 */}
        <ProfileCard
          name={profile?.nickName || ''}
          introduction={profile?.introduction || ''}
          avatarUrl={profile?.profileImage || ''}
        />

        {/* Row 1, Col 2: 통계 카드 */}
        <StatsGrid
          totalCurations={myCurationsCount}
          totalViews={totalViewCount}
          totalLikes={likedCurationsCount}
        />

        {/* Row 2, Col 1: 바로 가기 */}
        <QuickLinksCard />

        {/* Row 2, Col 2: 새로운 댓글 */}
        <RecentFeedbackCard feedbacks={mockFeedbacks} />
      </div>
    </div>
  )
}
