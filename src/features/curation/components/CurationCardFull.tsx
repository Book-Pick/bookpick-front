import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription,
  Badge,
  Avatar,
  AvatarFallback,
  Button,
} from '@/shared/ui'
import { CircleUser, Heart, MessageSquare } from 'lucide-react'
import Thumbnail from '@/shared/components/Thumbnail'
import { ViewerIcon } from '@/assets/icons/ViewerIcon'

interface CurationCardFullProps {
  similarity?: number
  title: string
  description: string
  curator: string
  likes: number
  comments: number
  views: number
  date: string
  tags: string[]
  className?: string
  onClick?: () => void
}

const CurationCardFull = ({
  similarity = 98,
  title,
  description,
  curator,
  likes,
  comments,
  views,
  date,
  tags,
  className,
  onClick,
}: CurationCardFullProps) => {
  return (
    <Card className={`bg-white border-1 pb-0 shadow-lg ${className || ''}`} onClick={onClick}>
      <CardHeader>
        <CardDescription className='text-sm text-neutral-950'>
          <div className='flex justify-between mb-5'>
            <div>
              취향 유사도 <span className='font-bold'>{similarity}%</span>
            </div>
            <div>{date}</div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex gap-4 items-start'>
          <div className='flex-col flex-[8.5] flex h-full'>
            <div className='font-curation-title mb-7 flex-shrink-0'>{title}</div>
            <p className='font-curation-description line-clamp-3 overflow-hidden flex-1'>
              {description}
            </p>
          </div>
          <div className='flex-[1.5]'>
            <Thumbnail />
          </div>
        </div>
      </CardContent>
      <CardFooter className='mt-4 p-0'>
        <div className='w-full flex flex-col bg-amber-100 py-5 px-6 rounded-b-sm'>
          {/* Tag */}
          <div className='mb-7 flex gap-1 flex-wrap'>
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant='outline'
                size='sm'
                className='bg-white border-neutral-300 px-3 py-1'
              >
                #{tag}
              </Badge>
            ))}
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex gap-3 items-center'>
              <Avatar>
                <AvatarFallback className='bg-neutral-200'>
                  <CircleUser />
                </AvatarFallback>
              </Avatar>
              <div className='text-neutral-800 font-medium'>by {curator}</div>
              <Button size='sm'>구독하기</Button>
            </div>
            <div className='flex gap-4'>
              <div className='flex gap-1 items-center'>
                <ViewerIcon size={24} />
                <span className='text-sm font-medium'>{views}</span>
              </div>
              <div className='flex gap-1 items-center'>
                <Heart size={24} />
                <span className='text-sm font-medium'>{likes}</span>
              </div>
              <div className='flex gap-1 items-center'>
                <MessageSquare size={24} />
                <span className='text-sm font-medium'>{comments}</span>
              </div>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default CurationCardFull
