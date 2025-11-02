interface Feedback {
  id: number
  content: string
  date: string
}

interface RecentFeedbackCardProps {
  feedbacks: Feedback[]
}

export default function RecentFeedbackCard({ feedbacks }: RecentFeedbackCardProps) {
  const displayFeedbacks = feedbacks.slice(0, 4)

  return (
    <div className='flex flex-col gap-6 md:gap-9 border border-border rounded-xl p-5 md:p-10 md:h-full'>
      <h3 className='text-lg md:text-xl font-semibold'>새로운 피드백</h3>
      <div className='flex flex-col gap-4 md:gap-[26px]'>
        {displayFeedbacks.length > 0 ? (
          displayFeedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className='flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-2.5'
            >
              <p className='font-comment text-foreground flex-1 min-w-0 truncate'>
                {feedback.content}
              </p>
              <span className='font-meta whitespace-nowrap flex-shrink-0'>{feedback.date}</span>
            </div>
          ))
        ) : (
          <p className='font-comment text-center py-4'>새로운 피드백이 없습니다.</p>
        )}
      </div>
    </div>
  )
}
