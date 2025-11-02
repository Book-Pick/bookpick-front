import { useState } from 'react'
import { Search, BookOpen } from 'lucide-react'
import { Input, Button, Card, CardContent } from '@/shared/ui'
import type { LifeBook } from '../constants/preferences'
import { useCuration } from '../hooks/useCuration'
import type { BookSearchResult } from '../types/curation.types'

interface LifeBookSearchSectionProps {
  onBookSelect: (book: LifeBook) => void
  placeholder?: string
  maxSelections?: number
  currentCount?: number
}

export function LifeBookSearchSection({
  onBookSelect,
  placeholder = '책 제목이나 작가명을 검색하세요',
  maxSelections = 3,
  currentCount = 0,
}: LifeBookSearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const { useSearchBooks } = useCuration()
  const { mutate: searchBooks, data, isPending, reset } = useSearchBooks()

  const handleSearch = () => {
    if (!searchQuery.trim()) return
    searchBooks(searchQuery)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleBookSelect = (book: BookSearchResult) => {
    if (currentCount >= maxSelections) {
      return
    }
    // BookSearchResult를 LifeBook 형태로 변환하여 전달
    // title과 author를 조합하여 고유 ID 생성
    const uniqueId = `${book.title}|${book.author}`

    const lifeBook: LifeBook = {
      id: uniqueId,
      title: book.title,
      author: book.author,
      image: book.image,
      isbn: book.isbn || '',
    } as LifeBook

    onBookSelect(lifeBook)

    // 최대 선택 수에 도달하면 검색 결과 정리
    if (currentCount + 1 >= maxSelections) {
      reset()
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
              onChange={(e) => {
                setSearchQuery(e.target.value)
                if (data) reset() // 입력 시 이전 검색 결과 초기화
              }}
              onKeyPress={handleKeyPress}
              className='flex-1'
            />
            <Button onClick={handleSearch} disabled={!searchQuery.trim() || isPending}>
              <Search size={16} className='mr-2' />
              {isPending ? '검색 중...' : '검색'}
            </Button>
          </div>

          {data && !isPending && (
            <div className='space-y-2'>
              {data.books.length > 0 ? (
                <>
                  <p className='text-sm text-muted-foreground'>검색 결과</p>
                  {data.books.map((book, index) => (
                    <Card
                      key={`${book.title}-${book.author}-${index}`}
                      className='cursor-pointer hover:bg-gray-50 transition-colors'
                      onClick={() => handleBookSelect(book)}
                    >
                      <CardContent className='p-3'>
                        <div className='flex items-center gap-3'>
                          {book.image ? (
                            <img
                              src={book.image}
                              alt={book.title}
                              className='w-12 h-16 object-cover rounded'
                              onError={(e) => {
                                // 이미지 로드 실패 시 기본 아이콘 표시
                                e.currentTarget.style.display = 'none'
                                e.currentTarget.nextElementSibling?.classList.remove('hidden')
                              }}
                            />
                          ) : null}
                          <div
                            className={`w-12 h-16 bg-gray-200 rounded flex items-center justify-center ${book.image ? 'hidden' : ''}`}
                          >
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
