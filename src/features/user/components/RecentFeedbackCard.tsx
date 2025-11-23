interface Feedback {
  id: number
  content: string
  date: string
}

interface RecentFeedbackCardProps {
  feedbacks: Feedback[]
}

export default function RecentFeedbackCard({ feedbacks }: RecentFeedbackCardProps) {
  const displayFeedbacks = feedbacks.slice(0, 3)

  return (
    <div className='flex flex-col gap-5 border border-border rounded-lg p-5 md:gap-9 md:rounded-xl md:p-10'>
      <h3 className='text-lg font-semibold md:text-xl'>새로운 피드백</h3>
      <div className='flex flex-col gap-2 md:gap-[26px]'>
        {displayFeedbacks.length > 0 ? (
          displayFeedbacks.map((feedback, index) => (
            <div key={feedback.id}>
              <div className='flex flex-col gap-0.5 md:flex-row md:justify-between md:items-center md:gap-2.5'>
                <p className='text-xs font-normal text-foreground flex-1 min-w-0 line-clamp-2 md:text-base md:truncate'>
                  {feedback.content}
                </p>
                <span className='text-[10px] font-normal text-foreground/60 whitespace-nowrap flex-shrink-0 md:text-sm'>
                  {feedback.date}
                </span>
              </div>
              {index < displayFeedbacks.length - 1 && (
                <div className='h-px bg-border mt-2 md:hidden' />
              )}
            </div>
          ))
        ) : (
          <p className='font-comment text-center py-4'>새로운 피드백이 없습니다.</p>
        )}
      </div>
    </div>
  )
}
