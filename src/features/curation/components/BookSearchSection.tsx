import { useState } from 'react'
import { Search, BookOpen } from 'lucide-react'
import { Input, Button, Card, CardContent } from '@/shared/ui'
import { SEARCH_BOOKS, type SearchBook } from '../constants/curationCreateData'

interface BookSearchSectionProps {
  selectedBook: SearchBook | null
  onBookSelect: (book: SearchBook | null) => void
}

export function BookSearchSection({ selectedBook, onBookSelect }: BookSearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchBook[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    // 실제로는 API 호출이지만, 현재는 mockup 데이터 사용
    setTimeout(() => {
      setSearchResults([...SEARCH_BOOKS])
      setIsSearching(false)
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleBookSelect = (book: SearchBook) => {
    onBookSelect(book)
    setSearchResults([])
    setSearchQuery('')
  }

  const handleRemoveBook = () => {
    onBookSelect(null)
  }

  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>어떤 책에 대한 감상인가요?*</h3>

      {selectedBook ? (
        <Card className='border-2 border-primary/20'>
          <CardContent className='p-4'>
            <div className='flex items-center gap-4'>
              <div className='w-16 h-20 bg-gray-200 rounded flex items-center justify-center'>
                <BookOpen size={24} className='text-gray-400' />
              </div>
              <div className='flex-1'>
                <h4 className='font-semibold text-lg'>{selectedBook.title}</h4>
                <p className='text-muted-foreground'>{selectedBook.author}</p>
                <p className='text-sm text-muted-foreground'>ISBN: {selectedBook.isbn}</p>
              </div>
              <Button variant='outline' size='sm' onClick={handleRemoveBook}>
                변경
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className='space-y-3'>
          <div className='flex gap-2'>
            <Input
              placeholder='책 제목이나 작가명을 검색하세요'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className='flex-1'
            />
            <Button onClick={handleSearch} disabled={!searchQuery.trim() || isSearching}>
              <Search size={16} className='mr-2' />
              {isSearching ? '검색 중...' : '검색'}
            </Button>
          </div>

          {searchResults.length > 0 && (
            <div className='space-y-2'>
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
            </div>
          )}
        </div>
      )}
    </div>
  )
}
