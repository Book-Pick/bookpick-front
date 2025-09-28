import { useState } from 'react'
import { Search, BookOpen } from 'lucide-react'
import { Input, Button, Card, CardContent } from '@/shared/ui'
import type { LifeBook } from '../constants/preferences'

interface LifeBookSearchSectionProps {
  onBookSelect: (book: LifeBook) => void
  searchData: readonly LifeBook[]
  placeholder?: string
  maxSelections?: number
  currentCount?: number
}

export function LifeBookSearchSection({
  onBookSelect,
  searchData,
  placeholder = '책 제목이나 작가명을 검색하세요',
  maxSelections = 3,
  currentCount = 0,
}: LifeBookSearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<LifeBook[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setHasSearched(true)
    // 실제로는 API 호출이지만, 현재는 mockup 데이터 사용
    setTimeout(() => {
      const filteredResults = searchData.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setSearchResults(filteredResults)
      setIsSearching(false)
    }, 300)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleBookSelect = (book: LifeBook) => {
    if (currentCount >= maxSelections) {
      return
    }
    onBookSelect(book)
    setSearchResults([])
    setSearchQuery('')
    setHasSearched(false)
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
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setHasSearched(false)
              }}
              onKeyPress={handleKeyPress}
              className='flex-1'
            />
            <Button onClick={handleSearch} disabled={!searchQuery.trim() || isSearching}>
              <Search size={16} className='mr-2' />
              {isSearching ? '검색 중...' : '검색'}
            </Button>
          </div>

          {hasSearched && !isSearching && (
            <div className='space-y-2'>
              {searchResults.length > 0 ? (
                <>
                  <p className='text-sm text-muted-foreground'>검색 결과</p>
                  {searchResults.map((book) => (
                    <Card
                      key={book.id}
                      className='cursor-pointer hover:bg-gray-50 transition-colors'
                      onClick={() => handleBookSelect(book)}
                    >
                      <CardContent className='p-3'>
                        <div className='flex items-center gap-3'>
                          <div className='w-12 h-16 bg-gray-200 rounded flex items-center justify-center'>
                            <BookOpen size={16} className='text-gray-400' />
                          </div>
                          <div className='flex-1'>
                            <h5 className='font-medium'>{book.title}</h5>
                            <p className='text-sm text-muted-foreground'>{book.author}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              ) : (
                <div className='text-center py-6'>
                  <BookOpen size={48} className='mx-auto text-gray-300 mb-2' />
                  <p className='text-sm text-muted-foreground'>
                    '{searchQuery}'에 대한 검색 결과가 없습니다.
                  </p>
                  <p className='text-xs text-muted-foreground mt-1'>다른 검색어를 입력해보세요.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {isMaxReached && (
        <p className='text-sm text-muted-foreground text-center py-2'>
          최대 {maxSelections}권까지 선택 가능합니다.
        </p>
      )}
    </div>
  )
}
