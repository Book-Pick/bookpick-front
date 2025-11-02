import StatCard from './StatCard'

interface StatsGridProps {
  totalCurations: number
  totalViews: number
  totalLikes: number
}

export default function StatsGrid({ totalCurations, totalViews, totalLikes }: StatsGridProps) {
  return (
    <div className='grid grid-cols-3 gap-3 md:gap-7.5 md:h-full'>
      <StatCard label='내가 쓴 추천사 수' value={totalCurations} />
      <StatCard label='총 조회수' value={totalViews.toLocaleString()} />
      <StatCard label='총 좋아요 수' value={totalLikes} />
    </div>
  )
}
