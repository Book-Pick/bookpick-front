import { useState } from 'react'
import { Palette } from 'lucide-react'
import { Input, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui'
import { COLOR_PALETTE } from '../constants/curationCreateData'

interface CurationTitleSectionProps {
  title: string
  onTitleChange: (title: string) => void
  selectedColor: string
  onColorChange: (color: string) => void
}

export function CurationTitleSection({
  title,
  onTitleChange,
  selectedColor,
  onColorChange,
}: CurationTitleSectionProps) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)

  const selectedColorOption =
    COLOR_PALETTE.find((color) => color.value === selectedColor) || COLOR_PALETTE[0]

  return (
    <div className={`p-6 rounded-lg transition-colors ${selectedColorOption.class}`}>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex-1'>
          <Input
            placeholder='큐레이션 제목을 입력하세요 (100자 이하)'
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            maxLength={100}
            className='text-lg font-semibold border-none bg-transparent p-0 focus-visible:ring-0'
          />
          <div className='text-sm text-muted-foreground mt-1'>{title.length}/100</div>
        </div>

        <Popover open={isColorPickerOpen} onOpenChange={setIsColorPickerOpen}>
          <PopoverTrigger asChild>
            <button className='p-2 rounded-lg bg-white/50 hover:bg-white/70 transition-colors'>
              <Palette size={20} className='text-gray-600' />
            </button>
          </PopoverTrigger>
          <PopoverContent className='w-80 p-4' align='end'>
            <div className='space-y-3'>
              <h4 className='font-medium text-sm'>배경 색상 선택</h4>
              <div className='grid grid-cols-4 gap-3'>
                {COLOR_PALETTE.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => {
                      onColorChange(color.value)
                      setIsColorPickerOpen(false)
                    }}
                    className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-105 ${
                      selectedColor === color.value
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
              <div className='text-xs text-muted-foreground'>
                선택된 색상: {selectedColorOption.name}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
