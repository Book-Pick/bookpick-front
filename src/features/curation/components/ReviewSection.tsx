import { Textarea } from '@/shared/ui'

interface ReviewSectionProps {
  content: string
  onContentChange: (content: string) => void
}

export function ReviewSection({ content, onContentChange }: ReviewSectionProps) {
  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>당신의 진솔한 감상을 들려주세요*</h3>

      <div className='space-y-2'>
        <Textarea
          placeholder='이 책을 추천하는 이유, 큐레이션을 자유롭게 작성해주세요.'
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className='min-h-[200px] resize-none'
        />
        <div className='text-sm text-muted-foreground text-right'>{content.length}자</div>
      </div>
    </div>
  )
}
