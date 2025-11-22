import { useState } from 'react'
import { Search, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Input,
  Button,
  Card,
  CardContent,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/shared/ui'
import { usePagination } from '@/shared/hooks'
import { useSearchBooks } from '../hooks/useCuration'
import type { BookSearchResult, Book } from '../types/curation.types'

interface BookSearchSectionProps {
  // 단일 선택 모드
  selectedBook?: Book | null
  onBookSelect?: (book: Book | null) => void
  // 복수 선택 모드
  onBookAdd?: (book: Book) => void
  maxSelections?: number
  currentCount?: number
  // UI 옵션
  showSelectedInline?: boolean // true면 선택된 책을 컴포넌트 내부에 표시
  placeholder?: string
  title?: string
}

export function BookSearchSection({
  selectedBook,
  onBookSelect,
  onBookAdd,
  maxSelections = 1,
  currentCount = 0,
  showSelectedInline = true,
  placeholder = '책 제목이나 작가명을 검색하세요',
  title,
}: BookSearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const { mutate: searchBooks, data, isPending, reset } = useSearchBooks()

  const pagination = usePagination({
    totalPages: data?.pageInfo?.totalPages || 1,
    onPageChange: (page) => {
      searchBooks({ keyword: searchQuery, page })
    },
    maxVisiblePages: 5,
    initialPage: 1,
  })

  const isSingleMode = maxSelections === 1 && onBookSelect !== undefined
  const isMaxReached = currentCount >= maxSelections

  const handleSearch = () => {
    if (!searchQuery.trim()) return
    pagination.setCurrentPage(1)
    searchBooks({ keyword: searchQuery, page: 1 })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleBookSelect = (book: BookSearchResult) => {
    const bookItem: Book = {
      id: book.isbn || `${book.title}|${book.author}`,
      title: book.title,
      author: book.author,
      image: book.image,
      isbn: book.isbn || '',
    }

    if (isSingleMode) {
      onBookSelect?.(bookItem)
      reset()
      setSearchQuery('')
    } else {
      if (currentCount >= maxSelections) return
      onBookAdd?.(bookItem)

      // 최대 선택 수에 도달하면 검색 결과 정리
      if (currentCount + 1 >= maxSelections) {
        reset()
        setSearchQuery('')
      }
    }
  }

  const handleRemoveBook = () => {
    onBookSelect?.(null)
  }

  // 단일 선택 모드이고 이미 선택되었고 인라인 표시가 켜진 경우
  const showInlineSelected = isSingleMode && showSelectedInline && selectedBook

  return (
    <div className='space-y-4'>
      {title && <h3 className='text-lg font-semibold'>{title}</h3>}

      {showInlineSelected ? (
        <Card className='border-2 border-primary/20'>
          <CardContent className='p-4'>
            <div className='flex items-center gap-4'>
              {selectedBook.image ? (
                <img
                  src={selectedBook.image}
                  alt={selectedBook.title}
                  className='w-16 h-20 object-cover rounded'
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling?.classList.remove('hidden')
                  }}
                />
              ) : null}
              <div
                className={`w-16 h-20 bg-gray-200 rounded flex items-center justify-center ${selectedBook.image ? 'hidden' : ''}`}
              >
                <BookOpen size={24} className='text-gray-400' />
              </div>
              <div className='flex-1'>
                <h4 className='font-semibold text-lg'>{selectedBook.title}</h4>
                <p className='text-muted-foreground'>{selectedBook.author}</p>
                {selectedBook.isbn && (
                  <p className='text-sm text-muted-foreground'>ISBN: {selectedBook.isbn}</p>
                )}
              </div>
              <Button variant='outline' size='sm' onClick={handleRemoveBook}>
                변경
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
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
                  onKeyDown={handleKeyPress}
                  className='flex-1'
                />
                <Button onClick={handleSearch} disabled={!searchQuery.trim() || isPending}>
                  <Search size={16} className='mr-2' />
                  {isPending ? '검색 중...' : '검색'}
                </Button>
              </div>

              {data && !isPending && (
                <div ref={pagination.scrollRef} className='space-y-4'>
                  {data.books.length > 0 ? (
                    <>
                      <div className='space-y-2'>
                        <p className='text-sm text-muted-foreground'>
                          검색 결과 (총 {data.pageInfo.totalElements}건)
                        </p>
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
                      </div>

                      {/* 페이지네이션 */}
                      {data.pageInfo && data.pageInfo.totalPages > 1 && (
                        <Pagination>
                          <PaginationContent>
                            {/* 이전 버튼 */}
                            <PaginationItem>
                              <PaginationLink
                                onClick={() =>
                                  pagination.handlePageChange(pagination.currentPage - 1)
                                }
                                aria-disabled={!pagination.hasPrevious}
                                className={
                                  !pagination.hasPrevious
                                    ? 'pointer-events-none opacity-50'
                                    : 'cursor-pointer'
                                }
                              >
                                <ChevronLeft className='h-4 w-4' />
                              </PaginationLink>
                            </PaginationItem>

                            {/* 페이지 번호들 */}
                            {pagination.getPageNumbers().map((pageNum) => (
                              <PaginationItem key={pageNum}>
                                <PaginationLink
                                  onClick={() => pagination.handlePageChange(pageNum)}
                                  isActive={pageNum === pagination.currentPage}
                                  className='cursor-pointer'
                                >
                                  {pageNum}
                                </PaginationLink>
                              </PaginationItem>
                            ))}

                            {/* 다음 버튼 */}
                            <PaginationItem>
                              <PaginationLink
                                onClick={() =>
                                  pagination.handlePageChange(pagination.currentPage + 1)
                                }
                                aria-disabled={!pagination.hasNext}
                                className={
                                  !pagination.hasNext
                                    ? 'pointer-events-none opacity-50'
                                    : 'cursor-pointer'
                                }
                              >
                                <ChevronRight className='h-4 w-4' />
                              </PaginationLink>
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      )}
                    </>
                  ) : (
                    <div className='text-center py-6'>
                      <BookOpen size={48} className='mx-auto text-gray-300 mb-2' />
                      <p className='text-sm text-muted-foreground'>
                        '{searchQuery}'에 대한 검색 결과가 없습니다.
                      </p>
                      <p className='text-xs text-muted-foreground mt-1'>
                        다른 검색어를 입력해보세요.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {isMaxReached && !isSingleMode && (
            <p className='text-sm text-muted-foreground text-center py-2'>
              최대 {maxSelections}권까지 선택 가능합니다.
            </p>
          )}
        </>
      )}
    </div>
  )
}
