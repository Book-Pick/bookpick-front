import { useState, useRef } from 'react'
import { Image as ImageIcon, Eye, Info, RefreshCw } from 'lucide-react'
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
  onReset?: () => void
  title: string
  content: string
}

/**
 * 썸네일 이미지 업로드 및 미리보기 컴포넌트
 * - 모바일: 세로 정렬 + 버튼으로 미리보기 토글
 * - 웹: 가로 정렬 + 우측에 미리보기 항상 표시
 * - S3 자동 업로드
 */
const ThumbnailPreview = ({
  thumbnail,
  thumbnailUrl,
  onThumbnailSelect,
  onThumbnailUpload,
  onReset,
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

  const hasImage = !!(thumbnail || thumbnailUrl || localPreview)

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

  const handleReset = () => {
    setLocalPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onReset?.()
  }

  return (
    <div className='flex flex-col md:flex-row md:gap-8'>
      {/* 좌측: 이미지 업로드 영역 */}
      <div className='flex-1 space-y-4'>
        {/* 이미지가 없을 때: 업로드 UI */}
        {!hasImage && (
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
                {isImageUploading ? '업로드 중...' : '이미지를 선택하거나 드래그하세요'}
              </p>
              <p className='text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1'>
                <Info size={12} />
                최대 10MB(jpg, png)
              </p>
            </label>
          </div>
        )}

        {/* 이미지가 있을 때: 미리보기 + 리셋 버튼 */}
        {hasImage && displayUrl && (
          <div className='space-y-3'>
            {/* 이미지 미리보기 */}
            <div className='relative w-full rounded-lg overflow-hidden border border-gray-200'>
              <img src={displayUrl} alt='썸네일 미리보기' className='w-full h-48 object-cover' />
              {/* 업로드 중 오버레이 */}
              {isImageUploading && (
                <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
                  <span className='text-white text-sm'>업로드 중...</span>
                </div>
              )}
              {/* 다시 업로드 버튼 */}
              <button
                type='button'
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleReset()
                }}
                className='absolute top-2 right-2 z-20 p-1.5 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors'
                title='다시 업로드'
              >
                <RefreshCw size={16} />
              </button>
            </div>

            {/* 모바일: 전체 카드 미리보기 버튼 */}
            <div className='flex justify-center md:hidden'>
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

            {/* 모바일: 전체 카드 미리보기 */}
            {showFullPreview && (
              <div className='pt-4 border-t md:hidden'>
                <h4 className='font-medium text-sm mb-4 text-center'>추천사 카드 미리보기</h4>
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

      {/* 우측: 웹 전용 미리보기 (항상 표시) */}
      <div className='hidden md:block flex-1'>
        <h4 className='font-medium text-sm mb-4 text-center'>추천사 카드 미리보기</h4>
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
            thumbnailSrc={displayUrl ?? undefined}
          />
        </div>
      </div>
    </div>
  )
}

export default ThumbnailPreview
