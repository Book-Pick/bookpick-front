import { useState } from 'react'
import { type LifeBook } from '../constants/preferences'

export interface ReadingPreferenceFormData {
  mbti: string
  selectedLifeBooks: LifeBook[]
  selectedAuthors: string[]
  readingMoods: string[]
  readingHabits: string[]
  genres: string[]
  keywords: string[]
  readingStyles: string[]
}

export function useReadingPreferenceForm(initialData?: Partial<ReadingPreferenceFormData>) {
  // 상태 관리
  const [mbti, setMbti] = useState<string>(initialData?.mbti || '')
  const [selectedLifeBooks, setSelectedLifeBooks] = useState<LifeBook[]>(
    initialData?.selectedLifeBooks || [],
  )
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>(
    initialData?.selectedAuthors || [],
  )
  const [readingMoods, setReadingMoods] = useState<string[]>(initialData?.readingMoods || [])
  const [readingHabits, setReadingHabits] = useState<string[]>(initialData?.readingHabits || [])
  const [genres, setGenres] = useState<string[]>(initialData?.genres || [])
  const [keywords, setKeywords] = useState<string[]>(initialData?.keywords || [])
  const [readingStyles, setReadingStyles] = useState<string[]>(initialData?.readingStyles || [])

  // 토글 함수들
  const toggleMbti = (type: string) => {
    setMbti(mbti === type ? '' : type)
  }

  const toggleReadingMood = (mood: string) => {
    setReadingMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood],
    )
  }

  const toggleReadingHabit = (habit: string) => {
    setReadingHabits((prev) =>
      prev.includes(habit) ? prev.filter((h) => h !== habit) : [...prev, habit],
    )
  }

  const toggleGenre = (genre: string) => {
    setGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]))
  }

  const toggleKeyword = (keyword: string) => {
    setKeywords((prev) =>
      prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword],
    )
  }

  const toggleReadingStyle = (style: string) => {
    setReadingStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style],
    )
  }

  const handleLifeBookSelect = (book: LifeBook | null) => {
    if (book && selectedLifeBooks.length < 3 && !selectedLifeBooks.find((b) => b.id === book.id)) {
      setSelectedLifeBooks((prev) => [...prev, book])
    }
  }

  const removeLifeBook = (bookToRemove: LifeBook) => {
    setSelectedLifeBooks(selectedLifeBooks.filter((book) => book.id !== bookToRemove.id))
  }

  const handleAuthorSelect = (author: string) => {
    if (selectedAuthors.length < 3 && !selectedAuthors.includes(author)) {
      setSelectedAuthors((prev) => [...prev, author])
    }
  }

  const removeAuthor = (authorToRemove: string) => {
    setSelectedAuthors(selectedAuthors.filter((author) => author !== authorToRemove))
  }

  // 폼 데이터 가져오기
  const getFormData = (): ReadingPreferenceFormData => ({
    mbti,
    selectedLifeBooks,
    selectedAuthors,
    readingMoods,
    readingHabits,
    genres,
    keywords,
    readingStyles,
  })

  return {
    // 상태
    formData: {
      mbti,
      selectedLifeBooks,
      selectedAuthors,
      readingMoods,
      readingHabits,
      genres,
      keywords,
      readingStyles,
    },
    // 핸들러
    handlers: {
      toggleMbti,
      toggleReadingMood,
      toggleReadingHabit,
      toggleGenre,
      toggleKeyword,
      toggleReadingStyle,
      handleLifeBookSelect,
      removeLifeBook,
      handleAuthorSelect,
      removeAuthor,
    },
    // 유틸리티
    getFormData,
  }
}
