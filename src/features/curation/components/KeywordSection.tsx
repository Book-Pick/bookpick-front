import { useState } from 'react'
import { X } from 'lucide-react'
import { Input, Badge } from '@/shared/ui'

interface KeywordSectionProps {
  keywords: string[]
  onKeywordsChange: (keywords: string[]) => void
}

export function KeywordSection({ keywords, onKeywordsChange }: KeywordSectionProps) {
  const [keywordInput, setKeywordInput] = useState('')

  const addKeyword = () => {
    const trimmedKeyword = keywordInput.trim()
    if (trimmedKeyword && !keywords.includes(trimmedKeyword)) {
      onKeywordsChange([...keywords, trimmedKeyword])
      setKeywordInput('')
    }
  }

  const removeKeyword = (keywordToRemove: string) => {
    onKeywordsChange(keywords.filter((keyword) => keyword !== keywordToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addKeyword()
    }
  }

  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>독자의 선택을 도울 키워드를 추가해주세요</h3>

      <div className='space-y-3'>
        {keywords.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {keywords.map((keyword) => (
              <Badge key={keyword} variant='outline' size='sm' className='flex items-center gap-1'>
                {keyword}
                <X
                  size={12}
                  className='cursor-pointer hover:text-destructive'
                  onClick={() => removeKeyword(keyword)}
                />
              </Badge>
            ))}
          </div>
        )}

        <Input
          placeholder='키워드 추가(엔터로 입력)'
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  )
}
