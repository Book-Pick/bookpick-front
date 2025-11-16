import { useState, useRef, type RefObject } from 'react'

export interface UsePaginationProps {
  totalPages: number
  onPageChange?: (page: number) => void
  maxVisiblePages?: number
  initialPage?: number
}

export interface UsePaginationReturn {
  currentPage: number
  setCurrentPage: (page: number) => void
  handlePageChange: (page: number) => void
  getPageNumbers: () => number[]
  scrollRef: RefObject<HTMLDivElement | null>
  goToFirstPage: () => void
  goToLastPage: () => void
  hasNext: boolean
  hasPrevious: boolean
}

/**
 * 페이지네이션 로직을 처리하는 공통 훅
 *
 * @example
 * const pagination = usePagination({
 *   totalPages: data.pageInfo.totalPages,
 *   onPageChange: (page) => fetchData(page),
 *   maxVisiblePages: 5,
 * })
 *
 * // 컴포넌트에서 사용
 * <div ref={pagination.scrollRef}>
 *   // 콘텐츠
 * </div>
 * <Pagination>
 *   <PaginationItem onClick={() => pagination.handlePageChange(page)}>
 * </Pagination>
 */
export function usePagination({
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  initialPage = 1,
}: UsePaginationProps): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return

    setCurrentPage(page)
    onPageChange?.(page)

    // 페이지 변경 시 스크롤 영역의 시작 부분으로 이동
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const getPageNumbers = (): number[] => {
    const pages: number[] = []

    if (totalPages <= maxVisiblePages) {
      // 총 페이지가 maxVisiblePages 이하면 모두 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // 현재 페이지를 중심으로 표시
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

      // 끝에 도달했을 때 시작점 조정
      if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1)
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }
    }

    return pages
  }

  const goToFirstPage = () => {
    handlePageChange(1)
  }

  const goToLastPage = () => {
    handlePageChange(totalPages)
  }

  const hasNext = currentPage < totalPages
  const hasPrevious = currentPage > 1

  return {
    currentPage,
    setCurrentPage,
    handlePageChange,
    getPageNumbers,
    scrollRef,
    goToFirstPage,
    goToLastPage,
    hasNext,
    hasPrevious,
  }
}
