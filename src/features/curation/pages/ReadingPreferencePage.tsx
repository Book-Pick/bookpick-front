import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import {
  Button,
  Badge,
  Toggle,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
} from '@/shared/ui'
import {
  MBTI_TYPES,
  READING_MOODS,
  GENRES,
  KEYWORDS,
  READING_HABITS,
  LIFE_BOOKS,
  FAVORITE_AUTHORS,
  type LifeBook,
} from '../constants/preferences'
import { LifeBookSearchSection } from '../components/LifeBookSearchSection'
import { AuthorSearchSection } from '../components/AuthorSearchSection'

export default function ReadingPreferencePage() {
  const navigate = useNavigate()

  // 상태 관리
  const [mbti, setMbti] = useState<string>('')
  const [selectedLifeBooks, setSelectedLifeBooks] = useState<LifeBook[]>([])
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([])
  const [readingMoods, setReadingMoods] = useState<string[]>([])
  const [readingHabits, setReadingHabits] = useState<string[]>([])
  const [genres, setGenres] = useState<string[]>([])
  const [keywords, setKeywords] = useState<string[]>([])

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

  const handleComplete = () => {
    console.log('온보딩 데이터:', {
      mbti,
      selectedLifeBooks,
      selectedAuthors,
      readingMoods,
      readingHabits,
      genres,
      keywords,
    })
    navigate('/mypage/profile')
  }

  const handleSkip = () => {
    navigate('/')
  }

  return (
    <div className='max-w-[800px] mx-auto'>
      <div className='text-center space-y-5 mb-15'>
        <h2 className='font-title'>독서 취향 설정</h2>
        <div className='space-y-4'>
          <p className='text-lg font-semibold leading-normal'>
            당신의 독서 페르소나를 완성해 보세요!
            <br />
            아래 정보를 입력하면, 나와 꼭 맞는 책과 사람들을 만날 수 있어요
          </p>
          <div className='text-2xl font-semibold text-muted-foreground mt-2'>
            더 정확한 추천을 위해, 당신의 독서 취향을 알려주세요.
            <p className='text-sm text-muted-foreground'>
              (이 단계는 건너뛸 수 있으며, 나중에 마이페이지에서 설정 가능합니다)
            </p>
          </div>
        </div>
      </div>
      <Card className='rounded-3xl'>
        <CardContent className='space-y-8 px-8 py-4'>
          <div className='font-subtitle font-semibold text-gray-800'>나는 이런 독서가에요.</div>

          <div className='space-y-6'>
            {/* 질문 1: MBTI */}
            <Card className='border-0 border-b-1 rounded-none shadow-none pb-10'>
              <CardHeader className='px-0'>
                <CardTitle className='text-xl'>MBTI를 알려주세요.</CardTitle>
                <p className='text-xs text-muted-foreground'>
                  ※ 해당사항이 없으시면 그냥 지나가셔도 좋아요!
                </p>
              </CardHeader>
              <CardContent className='px-0 pt-4'>
                <div className='w-full flex flex-wrap gap-2'>
                  {MBTI_TYPES.map((type) => (
                    <Toggle
                      key={type}
                      pressed={mbti === type}
                      onPressedChange={() => toggleMbti(type)}
                      variant='outline'
                      className='px-4 rounded-4xl'
                    >
                      {type}
                    </Toggle>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 질문 2: 인생 책 */}
            <Card className='border-0 border-b-1 rounded-none shadow-none pb-10'>
              <CardHeader className='px-0'>
                <CardTitle className='text-xl'>당신의 인생 책은 무엇인가요?</CardTitle>
                <p className='text-xs text-muted-foreground'>
                  ※ 최대 3권까지 선택 가능합니다. 해당사항이 없으시면 지나가셔도 좋아요!
                </p>
                <p className='text-xs text-muted-foreground'>
                  (현재는 데미안, 어린왕자, 1984, 까뮈의 이방인, 호밀밭의 파수꾼, 젊은 베르테르의
                  슬픔, 백년의 고독, 카라마조프의 형제들 검색 가능)
                </p>
              </CardHeader>
              <CardContent className='space-y-4 px-0 pt-4'>
                {selectedLifeBooks.length > 0 && (
                  <div className='flex flex-wrap gap-2'>
                    {selectedLifeBooks.map((book) => (
                      <Badge
                        key={book.id}
                        variant='outline'
                        size='sm'
                        className='flex items-center gap-1'
                      >
                        {book.title} - {book.author}
                        <button
                          type='button'
                          className='ml-1 cursor-pointer hover:text-destructive'
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log('on click life book')
                            removeLifeBook(book)
                          }}
                        >
                          <X size={12} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                <LifeBookSearchSection
                  onBookSelect={handleLifeBookSelect}
                  searchData={LIFE_BOOKS}
                  placeholder='인생 책을 검색해보세요'
                  maxSelections={3}
                  currentCount={selectedLifeBooks.length}
                />
              </CardContent>
            </Card>

            {/* 질문 2b: 좋아하는 작가 */}
            <Card className='border-0 border-b-1 rounded-none shadow-none pb-10'>
              <CardHeader className='px-0'>
                <CardTitle className='text-xl'>좋아하는 작가가 있나요?</CardTitle>
                <p className='text-xs text-muted-foreground'>
                  ※ 최대 3명까지 선택 가능합니다. 해당사항이 없으시면 지나가셔도 좋아요!
                </p>
              </CardHeader>
              <CardContent className='space-y-4 px-0 pt-4'>
                {selectedAuthors.length > 0 && (
                  <div className='flex flex-wrap gap-2'>
                    {selectedAuthors.map((author) => (
                      <Badge
                        key={author}
                        variant='outline'
                        size='sm'
                        className='flex items-center gap-1'
                      >
                        {author}
                        <button
                          type='button'
                          className='ml-1 cursor-pointer hover:text-destructive'
                          onClick={(e) => {
                            e.stopPropagation()
                            removeAuthor(author)
                          }}
                        >
                          <X size={12} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                <AuthorSearchSection
                  onAuthorSelect={handleAuthorSelect}
                  searchData={FAVORITE_AUTHORS}
                  placeholder='좋아하는 작가명을 검색하거나 직접 입력하세요'
                  maxSelections={3}
                  currentCount={selectedAuthors.length}
                />
              </CardContent>
            </Card>

            {/* 질문 3: 독서 분위기 */}
            <Card className='border-0 border-b-1 rounded-none shadow-none pb-10'>
              <CardHeader className='px-0'>
                <CardTitle className='text-xl'>책을 읽을 때 어떤 분위기를 좋아하시나요?</CardTitle>
                <p className='text-xs text-muted-foreground'>
                  ※ 해당사항이 없으시면 그냥 지나가셔도 좋아요!
                </p>
              </CardHeader>
              <CardContent className='px-0 pt-4'>
                <div className='flex flex-wrap gap-2'>
                  {READING_MOODS.map((mood) => (
                    <Toggle
                      key={mood}
                      pressed={readingMoods.includes(mood)}
                      onPressedChange={() => toggleReadingMood(mood)}
                      variant='outline'
                      className='px-4 rounded-4xl'
                    >
                      #{mood}
                    </Toggle>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 질문 4: 독서 습관 */}
            <Card className='border-0 border-b-1 rounded-none shadow-none pb-10'>
              <CardHeader className='px-0'>
                <CardTitle className='text-xl'>평소에는 어떤 방식으로 책을 읽으시나요?</CardTitle>
                <p className='text-xs text-muted-foreground'>
                  ※ 해당사항이 없으시면 그냥 지나가셔도 좋아요!
                </p>
              </CardHeader>
              <CardContent className='px-0 pt-4'>
                <div className='space-y-3'>
                  {READING_HABITS.map((habit) => (
                    <div key={habit} className='flex items-center space-x-3'>
                      <Checkbox
                        id={habit}
                        checked={readingHabits.includes(habit)}
                        onCheckedChange={() => toggleReadingHabit(habit)}
                      />
                      <label
                        htmlFor={habit}
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer'
                      >
                        {habit}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 질문 5: 좋아하는 장르 */}
            <Card className='border-0 border-b-1 rounded-none shadow-none pb-10'>
              <CardHeader className='px-0'>
                <CardTitle className='text-xl'>좋아하는 장르는 무엇인가요?</CardTitle>
                <p className='text-xs text-muted-foreground'>
                  ※ 해당사항이 없으시면 그냥 지나가셔도 좋아요!
                </p>
              </CardHeader>
              <CardContent className='px-0 pt-4'>
                <div className='flex flex-wrap gap-3'>
                  {GENRES.map((genre) => (
                    <Toggle
                      key={genre}
                      pressed={genres.includes(genre)}
                      onPressedChange={() => toggleGenre(genre)}
                      variant='outline'
                      size='sm'
                    >
                      {genre}
                    </Toggle>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 질문 6: 관심 키워드 */}
            <Card className='border-0 shadow-none'>
              <CardHeader className='px-0'>
                <CardTitle className='text-xl'>어떤 키워드로 책 추천을 받고 싶으세요?</CardTitle>
                <p className='text-xs text-muted-foreground'>
                  ※ 해당사항이 없으시면 그냥 지나가셔도 좋아요!
                </p>
              </CardHeader>
              <CardContent className='px-0 pt-4'>
                <div className='flex flex-wrap gap-3'>
                  {KEYWORDS.map((keyword) => (
                    <Toggle
                      key={keyword}
                      pressed={keywords.includes(keyword)}
                      onPressedChange={() => toggleKeyword(keyword)}
                      variant='outline'
                      size='sm'
                    >
                      {keyword}
                    </Toggle>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 하단 버튼 */}
          <div className='flex flex-col sm:flex-row justify-center gap-4 pt-8 mb-10'>
            <Button
              size='lg'
              variant='secondary'
              onClick={handleComplete}
              className='w-full sm:w-auto'
            >
              설정 완료하고 시작하기
            </Button>
            <Button variant='outline' size='lg' onClick={handleSkip} className='w-full sm:w-auto'>
              건너뛰기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
