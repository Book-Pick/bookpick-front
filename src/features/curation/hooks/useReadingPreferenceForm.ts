import { useReducer, useEffect } from 'react'
import type { BookItem } from '../components/BookSearchSection'

export interface ReadingPreferenceFormData {
  mbti: string
  selectedLifeBooks: BookItem[]
  selectedAuthors: string[]
  readingMoods: string[]
  readingHabits: string[]
  genres: string[]
  keywords: string[]
  readingStyles: string[]
}

export interface ReadingPreferenceFormHandlers {
  toggleMbti: (type: string) => void
  toggleReadingMood: (mood: string) => void
  toggleReadingHabit: (habit: string) => void
  toggleGenre: (genre: string) => void
  toggleKeyword: (keyword: string) => void
  toggleReadingStyle: (style: string) => void
  handleLifeBookSelect: (book: BookItem | null) => void
  removeLifeBook: (book: BookItem) => void
  handleAuthorSelect: (author: string) => void
  removeAuthor: (author: string) => void
}

type Action =
  | { type: 'RESET_ALL'; payload: Partial<ReadingPreferenceFormData> }
  | { type: 'TOGGLE_MBTI'; payload: string }
  | { type: 'TOGGLE_READING_MOOD'; payload: string }
  | { type: 'TOGGLE_READING_HABIT'; payload: string }
  | { type: 'TOGGLE_GENRE'; payload: string }
  | { type: 'TOGGLE_KEYWORD'; payload: string }
  | { type: 'TOGGLE_READING_STYLE'; payload: string }
  | { type: 'ADD_LIFE_BOOK'; payload: BookItem }
  | { type: 'REMOVE_LIFE_BOOK'; payload: BookItem }
  | { type: 'ADD_AUTHOR'; payload: string }
  | { type: 'REMOVE_AUTHOR'; payload: string }

const defaultValues: ReadingPreferenceFormData = {
  mbti: '',
  selectedLifeBooks: [],
  selectedAuthors: [],
  readingMoods: [],
  readingHabits: [],
  genres: [],
  keywords: [],
  readingStyles: [],
}

function reducer(state: ReadingPreferenceFormData, action: Action): ReadingPreferenceFormData {
  switch (action.type) {
    case 'RESET_ALL':
      return { ...defaultValues, ...action.payload }

    case 'TOGGLE_MBTI':
      return { ...state, mbti: state.mbti === action.payload ? '' : action.payload }

    case 'TOGGLE_READING_MOOD':
      return {
        ...state,
        readingMoods: state.readingMoods.includes(action.payload)
          ? state.readingMoods.filter((m) => m !== action.payload)
          : [...state.readingMoods, action.payload],
      }

    case 'TOGGLE_READING_HABIT':
      return {
        ...state,
        readingHabits: state.readingHabits.includes(action.payload)
          ? state.readingHabits.filter((h) => h !== action.payload)
          : [...state.readingHabits, action.payload],
      }

    case 'TOGGLE_GENRE':
      return {
        ...state,
        genres: state.genres.includes(action.payload)
          ? state.genres.filter((g) => g !== action.payload)
          : [...state.genres, action.payload],
      }

    case 'TOGGLE_KEYWORD':
      return {
        ...state,
        keywords: state.keywords.includes(action.payload)
          ? state.keywords.filter((k) => k !== action.payload)
          : [...state.keywords, action.payload],
      }

    case 'TOGGLE_READING_STYLE':
      return {
        ...state,
        readingStyles: state.readingStyles.includes(action.payload)
          ? state.readingStyles.filter((s) => s !== action.payload)
          : [...state.readingStyles, action.payload],
      }

    case 'ADD_LIFE_BOOK':
      if (
        state.selectedLifeBooks.length < 3 &&
        !state.selectedLifeBooks.find((b) => b.id === action.payload.id)
      ) {
        return { ...state, selectedLifeBooks: [...state.selectedLifeBooks, action.payload] }
      }
      return state

    case 'REMOVE_LIFE_BOOK':
      return {
        ...state,
        selectedLifeBooks: state.selectedLifeBooks.filter((book) => book.id !== action.payload.id),
      }

    case 'ADD_AUTHOR':
      if (state.selectedAuthors.length < 3 && !state.selectedAuthors.includes(action.payload)) {
        return { ...state, selectedAuthors: [...state.selectedAuthors, action.payload] }
      }
      return state

    case 'REMOVE_AUTHOR':
      return {
        ...state,
        selectedAuthors: state.selectedAuthors.filter((author) => author !== action.payload),
      }

    default:
      return state
  }
}

export function useReadingPreferenceForm(initialData?: Partial<ReadingPreferenceFormData>) {
  const [state, dispatch] = useReducer(reducer, { ...defaultValues, ...initialData })

  // initialData가 업데이트될 때 전체 state 리셋
  useEffect(() => {
    if (initialData) {
      dispatch({ type: 'RESET_ALL', payload: initialData })
    }
  }, [initialData])

  const toggleMbti = (type: string) => {
    dispatch({ type: 'TOGGLE_MBTI', payload: type })
  }

  const toggleReadingMood = (mood: string) => {
    dispatch({ type: 'TOGGLE_READING_MOOD', payload: mood })
  }

  const toggleReadingHabit = (habit: string) => {
    dispatch({ type: 'TOGGLE_READING_HABIT', payload: habit })
  }

  const toggleGenre = (genre: string) => {
    dispatch({ type: 'TOGGLE_GENRE', payload: genre })
  }

  const toggleKeyword = (keyword: string) => {
    dispatch({ type: 'TOGGLE_KEYWORD', payload: keyword })
  }

  const toggleReadingStyle = (style: string) => {
    dispatch({ type: 'TOGGLE_READING_STYLE', payload: style })
  }

  const handleLifeBookSelect = (book: BookItem | null) => {
    if (book) {
      dispatch({ type: 'ADD_LIFE_BOOK', payload: book })
    }
  }

  const removeLifeBook = (book: BookItem) => {
    dispatch({ type: 'REMOVE_LIFE_BOOK', payload: book })
  }

  const handleAuthorSelect = (author: string) => {
    dispatch({ type: 'ADD_AUTHOR', payload: author })
  }

  const removeAuthor = (author: string) => {
    dispatch({ type: 'REMOVE_AUTHOR', payload: author })
  }

  return {
    formData: state,
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
  }
}
