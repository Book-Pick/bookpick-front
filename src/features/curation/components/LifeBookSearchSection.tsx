/**
 * @deprecated 이 컴포넌트는 BookSearchSection으로 통합되었습니다.
 * BookSearchSection을 사용하세요.
 */
import { BookSearchSection, type BookItem } from './BookSearchSection'
import type { LifeBook } from '../constants/preferences'

interface LifeBookSearchSectionProps {
  onBookSelect: (book: LifeBook) => void
  placeholder?: string
  maxSelections?: number
  currentCount?: number
}

/**
 * @deprecated BookSearchSection을 사용하세요
 */
export function LifeBookSearchSection({
  onBookSelect,
  placeholder = '책 제목이나 작가명을 검색하세요',
  maxSelections = 3,
  currentCount = 0,
}: LifeBookSearchSectionProps) {
  const handleBookAdd = (book: BookItem) => {
    // BookItem을 LifeBook으로 변환
    const lifeBook: LifeBook = {
      id: book.id || `${book.title}|${book.author}`,
      title: book.title,
      author: book.author,
      image: book.image,
      isbn: book.isbn,
    } as LifeBook

    onBookSelect(lifeBook)
  }

  return (
    <BookSearchSection
      onBookAdd={handleBookAdd}
      maxSelections={maxSelections}
      currentCount={currentCount}
      placeholder={placeholder}
      showSelectedInline={false}
    />
  )
}
