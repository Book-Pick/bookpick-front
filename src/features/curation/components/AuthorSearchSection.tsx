import { useState } from 'react'
import { Input, Button } from '@/shared/ui'

interface AuthorSearchSectionProps {
  onAuthorSelect: (author: string) => void
  placeholder?: string
  maxSelections?: number
  currentCount?: number
}

export function AuthorSearchSection({
  onAuthorSelect,
  placeholder = '작가명을 입력하세요',
  maxSelections = 3,
  currentCount = 0,
}: AuthorSearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleDirectAdd = () => {
    if (searchQuery.trim() && currentCount < maxSelections) {
      onAuthorSelect(searchQuery.trim())
      setSearchQuery('')
    }
  }

  const isMaxReached = currentCount >= maxSelections

  return (
    <div className='space-y-4'>
      {!isMaxReached && (
        <div className='space-y-3'>
          <div className='flex gap-2'>
            <Input
              placeholder={placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                  e.preventDefault()
                  handleDirectAdd()
                }
              }}
              className='flex-1'
              clearable
              onClear={() => setSearchQuery('')}
            />
            {searchQuery.trim() && (
              <Button variant='outline' onClick={handleDirectAdd} disabled={isMaxReached}>
                추가
              </Button>
            )}
          </div>
        </div>
      )}

      {isMaxReached && (
        <p className='text-sm text-muted-foreground text-center py-2'>
          최대 {maxSelections}명까지 선택 가능합니다.
        </p>
      )}
    </div>
  )
}
