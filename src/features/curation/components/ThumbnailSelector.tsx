import { useState, useRef } from 'react'
import { Image, Upload, X } from 'lucide-react'
import { Button } from '@/shared/ui'

interface ThumbnailSelectorProps {
  thumbnail: File | null
  onThumbnailChange: (file: File | null) => void
}

export function ThumbnailSelector({ thumbnail, onThumbnailChange }: ThumbnailSelectorProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onThumbnailChange(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleRemoveThumbnail = () => {
    onThumbnailChange(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleClick = () => {
    if (thumbnail) {
      // 이미지가 있으면 새로 업로드
      fileInputRef.current?.click()
    } else {
      // 이미지가 없으면 업로드
      fileInputRef.current?.click()
    }
  }

  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>썸네일 선택</h3>

      <div className='relative max-w-sm'>
        {previewUrl ? (
          <div className='relative group'>
            <img
              src={previewUrl}
              alt='썸네일 미리보기'
              className='w-full h-70 object-cover rounded-lg border-2 border-dashed border-gray-300'
            />
            <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center'>
              <div className='flex gap-2'>
                <Button size='sm' variant='secondary' onClick={handleClick}>
                  <Upload size={16} className='mr-2' />
                  새로 업로드
                </Button>
                <Button
                  size='sm'
                  variant='destructive'
                  onClick={handleRemoveThumbnail}
                  className='bg-red-500/90 hover:bg-red-500'
                >
                  <X size={16} className='mr-2' />
                  삭제
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={handleClick}
            className='w-full h-70 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors'
          >
            <Image size={48} className='text-gray-400 mb-2' />
            <p className='text-gray-500 font-medium'>썸네일 이미지 업로드</p>
            <p className='text-sm text-gray-400 mt-1'>클릭하여 이미지를 선택하세요</p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          onChange={handleFileSelect}
          className='hidden'
        />
      </div>

      {thumbnail && (
        <div className='text-sm text-muted-foreground'>선택된 파일: {thumbnail.name}</div>
      )}
    </div>
  )
}
