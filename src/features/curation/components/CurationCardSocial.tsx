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
  Checkbox,
} from '@/shared/ui'
import { Heart, MessageSquare, User } from 'lucide-react'
import CurationThumbnail from './CurationThumbnail'
import CurationActionMenu from './CurationActionMenu'
import { ViewerIcon } from '@/assets/icons/ViewerIcon'

interface CurationCardSocialProps {
  id?: number | string
  similarity?: number | null
  title: string
  description: string
  curator: string
  curatorBio?: string
  curatorImage?: string
  likes: number
  comments: number
  views: number
  tags: string
  thumbnailSrc?: string | null
  thumbnailColor?: string | null
  className?: string
  onClick?: () => void
  editMode?: boolean
  isSelected?: boolean
  onSelect?: (id: number | string) => void
  isLiked?: boolean
  onLikeClick?: (id: number | string) => void
  // 케밥 메뉴 관련 props
  isOwner?: boolean
  onShare?: (id: number | string) => void
  onBookmark?: (id: number | string) => void
  onEdit?: (id: number | string) => void
  onDelete?: (id: number | string) => void
}

const CurationCardSocial = ({
  id,
  similarity = null,
  title,
  description,
  curator,
  curatorBio = '소개글이 없습니다.',
  curatorImage,
  likes,
  comments,
  views,
  tags,
  thumbnailSrc,
  thumbnailColor,
  className,
  onClick,
  editMode = false,
  isSelected = false,
  onSelect,
  isLiked = false,
  onLikeClick,
  isOwner = false,
  onShare,
  onBookmark,
  onEdit,
  onDelete,
}: CurationCardSocialProps) => {
  // tags 문자열을 배열로 변환
  const tagArray = tags
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0)

  return (
    <Card
      className={`w-full h-full flex flex-col bg-white border rounded-xl overflow-hidden max-w-sm mx-auto p-0 transition-all focus:outline-none focus-visible:outline-none ${
        editMode && isSelected
          ? 'border-gray-200 shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
          : 'border-gray-200 shadow-sm'
      } ${editMode ? 'cursor-pointer' : ''} ${className || ''}`}
      onClick={onClick}
    >
      {/* 썸네일 */}
      <div className='w-full h-40 bg-gray-50 flex items-center justify-center overflow-hidden relative'>
        <CurationThumbnail
          thumbnailImage={thumbnailSrc}
          thumbnailColor={thumbnailColor}
          title={title}
        />
        {/* 체크박스 - editMode일 때만 표시 */}
        {editMode && (
          <div className='absolute top-3 right-3 z-10'>
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => {
                if (id !== undefined && onSelect) {
                  onSelect(id)
                }
              }}
              className='w-5 h-5 bg-white border-2 border-gray-300 focus:outline-none focus-visible:ring-0'
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>

      {/* 프로필 */}
      <CardHeader className='px-4 pt-2 pb-0'>
        <div className='flex items-center gap-3'>
          <Avatar className='w-10 h-10'>
            {curatorImage ? (
              <AvatarImage src={curatorImage} alt={curator} className='object-cover' />
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
          <CurationActionMenu
            id={id}
            isOwner={isOwner}
            onShare={onShare}
            onBookmark={onBookmark}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      </CardHeader>

      {/* 추천사 미리보기 */}
      <CardContent className='p-4 pt-0 flex-1 flex flex-col'>
        <div className='mb-3 flex-1'>
          <p className='text-sm text-gray-600 line-clamp-5 leading-relaxed'>{description}</p>
        </div>

        {/* 취향 유사도(취향 유사도순에서만 표시) */}
        {similarity != null && (
          <div className='mb-3'>
            <div className='flex justify-between items-center mb-2'>
              <span
                className={`text-xs font-medium ${(similarity || 0) >= 80 ? 'text-accent' : 'text-point'}`}
              >
                취향 유사도
              </span>
              <span
                className={`text-xs font-semibold ${(similarity || 0) >= 80 ? 'text-accent' : 'text-point'}`}
              >
                {similarity}%
              </span>
            </div>
            <Progress
              value={similarity || 0}
              className={`h-2 ${(similarity || 0) >= 80 ? 'bg-accent' : 'bg-point'}`}
            />
          </div>
        )}

        {/* 키워드 태그 */}
        <div className='flex flex-wrap gap-1'>
          {tagArray.slice(0, 3).map((tag, index) => (
            <Badge key={index} size='sm' variant='outline'>
              #{tag}
            </Badge>
          ))}
          {tagArray.length > 3 && (
            <Badge variant='outline' size='sm'>
              +{tagArray.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className='mt-auto p-4 pt-0 border-t border-gray-200'>
        <div className='flex items-center justify-end gap-4 w-full'>
          <button className='flex items-center gap-1 text-gray-600 hover:text-gray-800 transition-colors'>
            <ViewerIcon size={18} />
            <span className='text-sm font-medium'>{views}</span>
          </button>
          <button
            className='flex items-center gap-1 text-gray-600 hover:text-accent transition-colors'
            onClick={(e) => {
              e.stopPropagation()
              if (id !== undefined && onLikeClick) {
                onLikeClick(id)
              }
            }}
          >
            <Heart
              size={18}
              className={`transition-all hover:scale-110 active:scale-95 ${isLiked ? 'fill-current text-accent animate-heart-bounce' : ''}`}
            />
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
