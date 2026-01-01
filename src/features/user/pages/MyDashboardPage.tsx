import { useMemo } from 'react'
import ProfileCard from '../components/ProfileCard'
import QuickLinksCard from '../components/QuickLinksCard'
import StatsGrid from '../components/StatsGrid'
import RecentFeedbackCard from '../components/RecentFeedbackCard'
import { useGetProfile } from '../hooks/useUser'
import { useGetCurations } from '@/features/curation/hooks/useCuration'
import { useGetMyComments } from '@/features/community/hooks/useCommunity'

export default function MyDashboardPage() {
  const { data: profile } = useGetProfile()

  const { data: myCurations } = useGetCurations({
    sort: 'my',
    cursor: 0,
    size: 1000,
    draft: false,
  })

  const { data: likedCurations } = useGetCurations({
    sort: 'liked',
    cursor: 0,
    size: 1000,
    draft: false,
  })

  const { data: myComments } = useGetMyComments()

  console.log('myComments', myComments)

  const recentComments = useMemo(() => myComments?.comments?.slice(0, 3) ?? [], [myComments])
  console.log('recentComments', recentComments)

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
        <RecentFeedbackCard feedbacks={recentComments} />
      </div>
    </div>
  )
}
