import { useState } from 'react'
import { Image as ImageIcon, Eye } from 'lucide-react'
import { Button } from '@/shared/ui'
import CurationCardSocial from './CurationCardSocial'

interface ThumbnailPreviewProps {
  thumbnail: File | null
  onThumbnailSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  title: string
  content: string
}

/**
 * 썸네일 이미지 업로드 및 미리보기 컴포넌트
 * - 2:1 비율 썸네일 미리보기
 * - "전체 카드 미리보기" 버튼으로 실제 카드 확인
 */
const ThumbnailPreview = ({
  thumbnail,
  onThumbnailSelect,
  title,
  content,
}: ThumbnailPreviewProps) => {
  const [showFullPreview, setShowFullPreview] = useState(false)
  const thumbnailUrl = thumbnail ? URL.createObjectURL(thumbnail) : null

  return (
    <div className='space-y-4'>
      {/* 이미지 업로드 영역 */}
      <div className='relative'>
        <input
          type='file'
          accept='image/*'
          onChange={onThumbnailSelect}
          className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10'
          id='thumbnail-upload'
        />
        <label
          htmlFor='thumbnail-upload'
          className='block w-full p-8 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-gray-400 transition-colors'
        >
          <ImageIcon size={48} className='mx-auto text-gray-400 mb-2' />
          <p className='text-sm text-gray-600'>
            {thumbnail ? '이미지 변경하기' : '이미지를 선택하거나 드래그하세요'}
          </p>
          {thumbnail && <p className='text-xs text-gray-500 mt-1'>{thumbnail.name}</p>}
        </label>
      </div>

      {/* 썸네일 미리보기 (2:1 비율) */}
      {thumbnail && thumbnailUrl && (
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <h4 className='font-medium text-sm'>썸네일 미리보기</h4>
            <span className='text-xs text-muted-foreground'>실제 카드에 표시될 크기</span>
          </div>

          {/* 2:1 비율 썸네일 */}
          <div className='w-full max-w-sm mx-auto'>
            <div className='relative w-full h-50 bg-gray-100 rounded-lg overflow-hidden border border-gray-200'>
              <img
                src={thumbnailUrl}
                alt='썸네일 미리보기'
                className='w-full h-full object-cover'
              />
            </div>
          </div>

          {/* 전체 카드 미리보기 버튼 */}
          <div className='flex justify-center'>
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={() => setShowFullPreview(!showFullPreview)}
            >
              <Eye size={16} className='mr-2' />
              {showFullPreview ? '미리보기 숨기기' : '전체 카드 미리보기'}
            </Button>
          </div>

          {/* 전체 카드 미리보기 */}
          {showFullPreview && (
            <div className='pt-4 border-t'>
              <h4 className='font-medium text-sm mb-4 text-center'>실제 카드 미리보기</h4>
              <div className='max-w-sm mx-auto'>
                <CurationCardSocial
                  title={title || '추천사 제목'}
                  description={content || '추천사 내용이 여기에 표시됩니다...'}
                  curator='나'
                  curatorBio='독서를 사랑하는 큐레이터'
                  likes={0}
                  comments={0}
                  views={0}
                  tags={['미리보기']}
                  thumbnailSrc={thumbnailUrl}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ThumbnailPreview
