import type { Comment } from '@/features/community/types/community.types'
import { formatRelativeTime } from '@/shared/utils/dateFormat'
import { Badge } from '@/shared/ui'
import { useNavigate } from 'react-router-dom'

interface RecentFeedbackCardProps {
  feedbacks: Comment[]
}

export default function RecentFeedbackCard({ feedbacks }: RecentFeedbackCardProps) {
  const navigate = useNavigate()

  const displayFeedbacks = feedbacks.slice(0, 3)

  const hasRecentFeedback = feedbacks.some((feedback) => {
    if (!feedback.updatedAt) return false
    const date = new Date(feedback.updatedAt)
    const now = new Date()
    const diffDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    return diffDays <= 3
  })

  const handleCommentClick = (curationId: number) => {
    navigate(`/curation/detail/${curationId}`)
  }

  return (
    <div className='flex flex-col gap-5 border border-border rounded-lg p-5 md:gap-9 md:rounded-xl md:p-10'>
      <div className='flex items-center gap-2'>
        <h3 className='text-lg font-semibold md:text-xl'>새로운 댓글</h3>
        {hasRecentFeedback && <Badge size='sm'>New</Badge>}
      </div>
      <div className='flex flex-col gap-2 md:gap-[26px]'>
        {displayFeedbacks.length > 0 ? (
          displayFeedbacks.map((feedback, index) => (
            <div
              key={feedback.commentId}
              onClick={() => handleCommentClick(feedback.curationId)}
              className='cursor-pointer'
            >
              <div className='flex flex-col gap-0.5 md:flex-row md:justify-between md:items-center md:gap-2.5'>
                <p className='text-xs font-normal text-foreground flex-1 min-w-0 line-clamp-2 md:text-base md:truncate'>
                  {feedback.content}
                </p>
                <span className='text-[10px] font-normal text-foreground/60 whitespace-nowrap flex-shrink-0 md:text-sm'>
                  {formatRelativeTime(feedback.updatedAt ?? '')}
                </span>
              </div>
              {index < displayFeedbacks.length - 1 && (
                <div className='h-px bg-border mt-2 md:hidden' />
              )}
            </div>
          ))
        ) : (
          <p className='font-comment text-center py-4'>새로운 댓글이 없습니다.</p>
        )}
      </div>
    </div>
  )
}
