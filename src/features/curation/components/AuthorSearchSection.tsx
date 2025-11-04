import { useState } from 'react'
import { Search, User } from 'lucide-react'
import { Input, Button, Card, CardContent } from '@/shared/ui'

interface AuthorSearchSectionProps {
  onAuthorSelect: (author: string) => void
  searchData: readonly string[]
  placeholder?: string
  maxSelections?: number
  currentCount?: number
}

export function AuthorSearchSection({
  onAuthorSelect,
  searchData,
  placeholder = '작가명을 검색하세요',
  maxSelections = 3,
  currentCount = 0,
}: AuthorSearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setHasSearched(true)
    // 실제로는 API 호출이지만, 현재는 mockup 데이터 사용
    setTimeout(() => {
      const filteredResults = searchData.filter((author) =>
        author.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setSearchResults(filteredResults)
      setIsSearching(false)
    }, 300)
  }

  const handleAuthorSelect = (author: string) => {
    if (currentCount >= maxSelections) {
      return
    }
    onAuthorSelect(author)
    setSearchResults([])
    setSearchQuery('')
    setHasSearched(false)
  }

  const handleDirectAdd = () => {
    if (searchQuery.trim() && currentCount < maxSelections) {
      onAuthorSelect(searchQuery.trim())
      setSearchQuery('')
      setSearchResults([])
      setHasSearched(false)
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
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setHasSearched(false)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (searchResults.length > 0) {
                    handleSearch()
                  } else {
                    handleDirectAdd()
                  }
                }
              }}
              className='flex-1'
            />
            <Button onClick={handleSearch} disabled={!searchQuery.trim() || isSearching}>
              <Search size={16} className='mr-2' />
              {isSearching ? '검색 중...' : '검색'}
            </Button>
            {searchQuery.trim() && (
              <Button variant='outline' onClick={handleDirectAdd} disabled={isMaxReached}>
                추가
              </Button>
            )}
          </div>

          {hasSearched && !isSearching && (
            <div className='space-y-2'>
              {searchResults.length > 0 ? (
                <>
                  <p className='text-sm text-muted-foreground'>검색 결과</p>
                  {searchResults.map((author) => (
                    <Card
                      key={author}
                      className='cursor-pointer hover:bg-gray-50 transition-colors'
                      onClick={() => handleAuthorSelect(author)}
                    >
                      <CardContent className='p-3'>
                        <div className='flex items-center gap-3'>
                          <div className='w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center'>
                            <User size={16} className='text-gray-400' />
                          </div>
                          <div className='flex-1'>
                            <h5 className='font-medium'>{author}</h5>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              ) : (
                <div className='text-center py-6'>
                  <User size={48} className='mx-auto text-gray-300 mb-2' />
                  <p className='text-sm text-muted-foreground'>
                    '{searchQuery}'에 대한 검색 결과가 없습니다.
                  </p>
                  <p className='text-xs text-muted-foreground mt-1'>
                    직접 입력하려면 "추가" 버튼을 클릭하세요.
                  </p>
                </div>
              )}
            </div>
          )}
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
