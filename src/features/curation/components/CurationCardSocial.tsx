import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Badge,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Progress,
} from '@/shared/ui'
import { Heart, MessageSquare, User } from 'lucide-react'
import CurationThumbnail from './CurationThumbnail'
import { ViewerIcon } from '@/assets/icons/ViewerIcon'

interface CurationCardSocialProps {
  similarity?: number
  title: string
  description: string
  curator: string
  curatorBio?: string
  curatorImage?: string
  likes: number
  comments: number
  views: number
  tags: string[]
  thumbnailSrc?: string
  thumbnailColor?: string | null
  className?: string
  onClick?: () => void
}

const CurationCardSocial = ({
  similarity,
  title,
  description,
  curator,
  curatorBio = '독서를 사랑하는 큐레이터',
  curatorImage,
  likes,
  comments,
  views,
  tags,
  thumbnailSrc,
  thumbnailColor,
  className,
  onClick,
}: CurationCardSocialProps) => {
  return (
    <Card
      className={`w-full bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden max-w-sm mx-auto p-0 ${className || ''}`}
      onClick={onClick}
    >
      {/* 프로필 섹션 */}
      <CardHeader className='px-4 pt-4 pb-0'>
        <div className='flex items-center gap-3'>
          <Avatar className='w-10 h-10'>
            {curatorImage ? (
              <AvatarImage src={curatorImage} alt={curator} />
            ) : (
              <AvatarFallback className='bg-gray-100'>
                <User size={20} className='text-gray-500' />
              </AvatarFallback>
            )}
          </Avatar>
          <div className='flex-1 min-w-0'>
            <p className='font-semibold text-sm text-gray-900 truncate'>{curator}</p>
            <p className='text-xs text-gray-500 truncate'>{curatorBio}</p>
          </div>
        </div>
      </CardHeader>

      {/* 썸네일 */}
      <div className='w-full h-70 bg-gray-50 flex items-center justify-center overflow-hidden'>
        <CurationThumbnail
          thumbnailImage={thumbnailSrc}
          thumbnailColor={thumbnailColor}
          title={title}
        />
      </div>

      {/* 취향 유사도 */}
      {similarity && (
        <div className='px-4 pt-3 pb-2'>
          <div className='flex justify-between items-center mb-2'>
            <span className='text-xs font-medium text-gray-700'>취향 유사도</span>
            <span className='text-xs font-semibold text-primary'>{similarity}%</span>
          </div>
          <Progress value={similarity || 0} className='h-2' />
        </div>
      )}

      {/* 컨텐츠 섹션 */}
      <CardContent className='p-4 pt-2'>
        {/* 제목과 설명 */}
        <div className='mb-4'>
          <h3 className='font-semibold text-sm text-gray-900 line-clamp-2 mb-2'>{title}</h3>
          <p className='text-xs text-gray-600 line-clamp-3 leading-relaxed'>{description}</p>
        </div>

        {/* 키워드 태그 */}
        <div className='flex flex-wrap gap-1'>
          {tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} size='sm' variant='outline'>
              #{tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant='outline' size='sm'>
              +{tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>

      {/* 인터랙션 섹션 */}
      <CardFooter className='mt-auto p-4 pt-0 border-t border-gray-200'>
        <div className='flex items-center justify-end gap-4 w-full'>
          <button className='flex items-center gap-1 text-gray-600 hover:text-gray-800 transition-colors'>
            <ViewerIcon size={18} />
            <span className='text-sm font-medium'>{views}</span>
          </button>
          <button className='flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors'>
            <Heart size={18} />
            <span className='text-sm font-medium'>{likes}</span>
          </button>
          <button className='flex items-center gap-1 text-gray-600 hover:text-blue-500 transition-colors'>
            <MessageSquare size={18} />
            <span className='text-sm font-medium'>{comments}</span>
          </button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default CurationCardSocial
