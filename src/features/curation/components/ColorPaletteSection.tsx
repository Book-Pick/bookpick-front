import { useState } from 'react'
import { Check, Eye } from 'lucide-react'
import { Button } from '@/shared/ui'
import CurationCardSocial from './CurationCardSocial'
import { COLOR_PALETTE } from '../constants/curationCreateData'

interface ColorPaletteSectionProps {
  selectedColor: string | null
  onColorSelect: (color: string) => void
  thumbnail: File | null
  title: string
  content: string
}

/**
 * 썸네일 색상 팔레트 및 미리보기 컴포넌트
 * - 색상 팔레트에서 썸네일 배경색 선택
 * - 모바일: 세로 정렬 + 버튼으로 미리보기 토글
 * - 웹: 가로 정렬 + 우측에 미리보기 항상 표시
 */
const ColorPaletteSection = ({
  selectedColor,
  onColorSelect,
  thumbnail,
  title,
  content,
}: ColorPaletteSectionProps) => {
  const [showColorPreview, setShowColorPreview] = useState(false)

  return (
    <div className='flex flex-col md:flex-row md:gap-8'>
      {/* 좌측: 색상 팔레트 */}
      <div className='flex-1 space-y-4'>
        <div className='w-fit border p-4 rounded-xl space-y-3'>
          <div className='grid grid-cols-5 lg:grid-cols-10 gap-1.5'>
            {COLOR_PALETTE.filter((color) => color.name.includes('400')).map((color) => {
              const isSelected = selectedColor === color.value && !thumbnail
              return (
                <button
                  key={color.value}
                  onClick={() => onColorSelect(color.value)}
                  className='relative w-10 h-10 rounded-lg border-2 border-gray-200 transition-all hover:scale-105 hover:border-gray-300 flex items-center justify-center'
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  {isSelected && <Check size={20} className='text-white drop-shadow-md' />}
                </button>
              )
            })}
          </div>
        </div>

        {/* 모바일: 전체 카드 미리보기 버튼 */}
        <div className='flex justify-center md:hidden'>
          <Button
            type='button'
            variant='outline'
            size='sm'
            onClick={() => setShowColorPreview(!showColorPreview)}
          >
            <Eye size={16} className='mr-2' />
            {showColorPreview ? '미리보기 숨기기' : '전체 카드 미리보기'}
          </Button>
        </div>

        {/* 모바일: 전체 카드 미리보기 */}
        {showColorPreview && (
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
                thumbnailColor={selectedColor}
              />
            </div>
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
            thumbnailColor={selectedColor}
          />
        </div>
      </div>
    </div>
  )
}

export default ColorPaletteSection
