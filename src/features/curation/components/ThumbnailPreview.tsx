import { useState, useRef } from 'react'
import { Image as ImageIcon, Eye } from 'lucide-react'
import { Button } from '@/shared/ui'
import CurationCardSocial from './CurationCardSocial'
import toast from 'react-hot-toast'
import { useImageUpload } from '@/shared/hooks'
import { validateImageFile, fileToDataURL } from '@/shared/utils/imageValidation'

interface ThumbnailPreviewProps {
  thumbnail: File | null
  thumbnailUrl: string | null
  onThumbnailSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  onThumbnailUpload: (url: string) => void
  title: string
  content: string
}

/**
 * 썸네일 이미지 업로드 및 미리보기 컴포넌트
 * - 2:1 비율 썸네일 미리보기
 * - "전체 카드 미리보기" 버튼으로 실제 카드 확인
 * - S3 자동 업로드
 */
const ThumbnailPreview = ({
  thumbnail,
  thumbnailUrl,
  onThumbnailSelect,
  onThumbnailUpload,
  title,
  content,
}: ThumbnailPreviewProps) => {
  const [showFullPreview, setShowFullPreview] = useState(false)
  const [localPreview, setLocalPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { mutate: uploadImageMutate, isPending: isImageUploading } = useImageUpload()

  // 표시할 이미지 URL (우선순위: thumbnailUrl > localPreview > thumbnail 객체)
  const displayUrl =
    thumbnailUrl || localPreview || (thumbnail ? URL.createObjectURL(thumbnail) : null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 1. 이미지 파일 검증
    const validation = validateImageFile(file, { maxSizeMB: 5 })
    if (!validation.isValid) {
      toast.error(validation.error || '유효하지 않은 파일입니다.')
      return
    }

    // 2. 부모 컴포넌트에 파일 전달 (기존 로직 유지)
    onThumbnailSelect(e)

    // 3. 로컬 미리보기 (즉시 표시)
    try {
      const dataUrl = await fileToDataURL(file)
      setLocalPreview(dataUrl)
    } catch (error) {
      console.error(error)
      toast.error('이미지를 불러오는데 실패했습니다.')
      return
    }

    // 4. S3에 업로드 (백그라운드)
    uploadImageMutate(
      { file, type: 'curation' },
      {
        onSuccess: (imageUrl) => {
          onThumbnailUpload(imageUrl)
          // Todo: 테스트 후 토스트 표시 제거
          toast.success('썸네일이 업로드되었습니다.')
        },
        onError: (error) => {
          console.error(error)
          toast.error(error.message || '썸네일 업로드에 실패했습니다.')
          // 업로드 실패 시 로컬 미리보기 및 파일 초기화
          setLocalPreview(null)
          if (fileInputRef.current) {
            fileInputRef.current.value = ''
            // 부모 컴포넌트에 파일 제거 알림
            onThumbnailSelect({
              target: fileInputRef.current,
            } as React.ChangeEvent<HTMLInputElement>)
          }
        },
      },
    )
  }

  return (
    <div className='space-y-4'>
      {/* 이미지 업로드 영역 */}
      <div className='relative'>
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10'
          id='thumbnail-upload'
          disabled={isImageUploading}
        />
        <label
          htmlFor='thumbnail-upload'
          className={`block w-full p-8 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-gray-400 transition-colors ${isImageUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <ImageIcon size={48} className='mx-auto text-gray-400 mb-2' />
          <p className='text-sm text-gray-600'>
            {isImageUploading
              ? '업로드 중...'
              : thumbnail || thumbnailUrl
                ? '이미지 변경하기'
                : '이미지를 선택하거나 드래그하세요'}
          </p>
          {thumbnail && !isImageUploading && (
            <p className='text-xs text-gray-500 mt-1'>{thumbnail.name}</p>
          )}
        </label>
      </div>

      {/* 썸네일 미리보기 (2:1 비율) */}
      {(thumbnail || thumbnailUrl) && displayUrl && (
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <h4 className='font-medium text-sm'>썸네일 미리보기</h4>
            <span className='text-xs text-muted-foreground'>실제 카드에 표시될 크기</span>
          </div>

          {/* 2:1 비율 썸네일 */}
          <div className='w-full max-w-sm mx-auto'>
            <div className='relative w-full h-50 bg-gray-100 rounded-lg overflow-hidden border border-gray-200'>
              <img src={displayUrl} alt='썸네일 미리보기' className='w-full h-full object-cover' />
              {/* 업로드 중 표시 */}
              {isImageUploading && (
                <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
                  <span className='text-white text-sm'>업로드 중...</span>
                </div>
              )}
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
                  tags='미리보기'
                  thumbnailSrc={displayUrl}
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
