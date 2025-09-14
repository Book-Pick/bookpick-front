import { Card, CardHeader, CardContent, CardFooter, CardDescription, CardTitle } from '@/shared/ui'
import { Heart, MessageSquare } from 'lucide-react'

interface CurationCardBasicProps {
  similarity?: number
  title: string
  description: string
  curator: string
  likes: number
  comments: number
  className?: string
  onClick?: () => void
}

const CurationCardBasic = ({
  similarity,
  title,
  description,
  curator,
  likes,
  comments,
  className,
  onClick,
}: CurationCardBasicProps) => {
  return (
    <Card className={`bg-neutral-100 border-0 ${className || ''}`} onClick={onClick}>
      <CardHeader>
        {similarity && (
          <CardDescription className='text-xs text-neutral-900 font-medium'>
            취향 유사도 {similarity}%
          </CardDescription>
        )}
        <CardTitle className='text-lg font-medium line-clamp-2'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-sm font-normal line-clamp-1'>{description}</p>
      </CardContent>
      <CardFooter className='mt-4'>
        <div className='w-full flex justify-between items-center'>
          <div className='text-sm text-neutral-800 font-medium'>by {curator}</div>
          <div className='flex gap-2'>
            <div className='flex gap-1 items-center'>
              <Heart size={16} className='size-3' />
              <span className='text-sm font-medium'>{likes}</span>
            </div>
            <div className='flex gap-1 items-center'>
              <MessageSquare size={16} className='size-3' />
              <span className='text-sm font-medium'>{comments}</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default CurationCardBasic
