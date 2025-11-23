import { useState } from 'react'
import { Image, Palette } from 'lucide-react'
import { Input, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui'
import { COLOR_PALETTE } from '../constants/curationCreateData'

interface CurationTitleSectionProps {
  title: string
  onTitleChange: (title: string) => void
  selectedColor: string
  onColorChange: (color: string) => void
  thumbnail: File | null
  onThumbnailChange: (thumbnail: File | null) => void
}

export function CurationTitleSection({
  title,
  onTitleChange,
  selectedColor,
  onColorChange,
  thumbnail,
  onThumbnailChange,
}: CurationTitleSectionProps) {
  const [isBackgroundPickerOpen, setIsBackgroundPickerOpen] = useState(false)
  const [selectedMode, setSelectedMode] = useState<'color' | 'thumbnail'>('color')

  // 상호 배타적 선택 로직
  const handleColorSelect = (color: string) => {
    onColorChange(color)
    onThumbnailChange(null) // 썸네일 초기화
    setSelectedMode('color')
  }

  const handleThumbnailSelect = (file: File | null) => {
    onThumbnailChange(file)
    onColorChange(COLOR_PALETTE[0].value) // 색상 초기화
    setSelectedMode('thumbnail')
  }

  // 탭 전환 시에는 초기화하지 않음
  const handleTabChange = (mode: 'color' | 'thumbnail') => {
    setSelectedMode(mode)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    handleThumbnailSelect(file)
  }

  // 배경 스타일 결정
  const getBackgroundStyle = () => {
    if (thumbnail) {
      return {
        backgroundImage: `url(${URL.createObjectURL(thumbnail)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    }
    return {
      backgroundColor: selectedColor,
    }
  }

  return (
    <div className='px-6 h-70 py-10 rounded-0 transition-all' style={getBackgroundStyle()}>
      <div className='max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-20 h-full flex flex-col'>
        {/* 배경 선택 버튼 */}
        <div className='flex justify-end'>
          <Popover open={isBackgroundPickerOpen} onOpenChange={setIsBackgroundPickerOpen}>
            <PopoverTrigger asChild>
              <button className='p-2 rounded-full bg-white hover:bg-white/70 transition-colors cursor-pointer'>
                <Palette size={30} className='text-gray-600' />
              </button>
            </PopoverTrigger>
            <PopoverContent className='w-96 p-4' align='end'>
              <div className='space-y-4'>
                {/* 탭 헤더 */}
                <div className='flex border-b'>
                  <button
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      selectedMode === 'color'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => handleTabChange('color')}
                  >
                    배경 색상
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      selectedMode === 'thumbnail'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => handleTabChange('thumbnail')}
                  >
                    썸네일 이미지
                  </button>
                </div>

                {/* 설명 텍스트 */}
                <p className='text-xs text-gray-500 mt-1'>
                  배경 색상과 썸네일 이미지 중 하나만 선택할 수 있습니다
                </p>

                {/* 색상 선택 탭 */}
                {selectedMode === 'color' && (
                  <div className='space-y-3'>
                    <h4 className='font-medium text-sm'>배경 색상 선택</h4>

                    {/* 400 단계 */}
                    <div className='grid grid-cols-10 gap-1'>
                      {COLOR_PALETTE.filter((color) => color.name.includes('400')).map((color) => (
                        <button
                          key={color.value}
                          onClick={() => handleColorSelect(color.value)}
                          className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-105 ${
                            selectedColor === color.value && !thumbnail
                              ? 'ring-2 ring-primary/20'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>

                    {/* 300 단계 */}
                    <div className='grid grid-cols-10 gap-1'>
                      {COLOR_PALETTE.filter((color) => color.name.includes('300')).map((color) => (
                        <button
                          key={color.value}
                          onClick={() => handleColorSelect(color.value)}
                          className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-105 ${
                            selectedColor === color.value && !thumbnail
                              ? 'border-primary ring-2 ring-primary/20'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>

                    {/* 100 단계 */}
                    <div className='grid grid-cols-10 gap-1'>
                      {COLOR_PALETTE.filter((color) => color.name.includes('100')).map((color) => (
                        <button
                          key={color.value}
                          onClick={() => handleColorSelect(color.value)}
                          className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-105 ${
                            selectedColor === color.value && !thumbnail
                              ? 'border-primary ring-2 ring-primary/20'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* 썸네일 선택 탭 */}
                {selectedMode === 'thumbnail' && (
                  <div className='space-y-3'>
                    <h4 className='font-medium text-sm'>썸네일 이미지 선택</h4>
                    <div className='relative'>
                      <input
                        type='file'
                        accept='image/*'
                        onChange={handleFileInputChange}
                        className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                        id='thumbnail-upload'
                      />
                      <label
                        htmlFor='thumbnail-upload'
                        className='block w-full p-8 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-gray-400 transition-colors'
                      >
                        <Image size={48} className='mx-auto text-gray-400 mb-2' />
                        <p className='text-sm text-gray-600'>
                          {thumbnail ? '이미지 변경하기' : '이미지를 선택하거나 드래그하세요'}
                        </p>
                        {thumbnail && (
                          <p className='text-xs text-gray-500 mt-1'>{thumbnail.name}</p>
                        )}
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* 큐레이션 제목 */}
        <div className='flex-1 flex items-end'>
          <div className='w-full'>
            <div className='bg-black/20 backdrop-blur-sm rounded-lg p-4'>
              <Input
                placeholder='제목을 입력해 주세요'
                value={title}
                size='xl'
                onChange={(e) => onTitleChange(e.target.value)}
                maxLength={100}
                className='border-none bg-transparent p-0 focus-visible:ring-0 text-white placeholder:text-white/70'
              />
              <div className='text-sm text-white/80 mt-1'>{title.length}/100</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
