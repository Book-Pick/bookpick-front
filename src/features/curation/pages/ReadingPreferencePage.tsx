import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Input,
  Badge,
  Toggle,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Textarea,
} from '@/shared/ui'
import { MBTI_TYPES, READING_MOODS, GENRES, KEYWORDS } from '../constants/preferences'

export default function ReadingPreferencePage() {
  const navigate = useNavigate()

  // 상태 관리
  const [mbti, setMbti] = useState<string>('')
  const [bookSearch, setBookSearch] = useState('')
  const [selectedBooks, setSelectedBooks] = useState<string[]>([])
  const [readingMoods, setReadingMoods] = useState<string[]>([])
  const [readingHabit, setReadingHabit] = useState('')
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

  const toggleGenre = (genre: string) => {
    setGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]))
  }

  const toggleKeyword = (keyword: string) => {
    setKeywords((prev) =>
      prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword],
    )
  }

  const addBook = () => {
    if (
      bookSearch.trim() &&
      selectedBooks.length < 3 &&
      !selectedBooks.includes(bookSearch.trim())
    ) {
      setSelectedBooks((prev) => [...prev, bookSearch.trim()])
      setBookSearch('')
    }
  }

  const removeBook = (book: string) => {
    setSelectedBooks((prev) => prev.filter((b) => b !== book))
  }

  const handleComplete = () => {
    console.log('온보딩 데이터:', {
      mbti,
      selectedBooks,
      readingMoods,
      readingHabit,
      genres,
      keywords,
    })
    navigate('/mypage/profile')
  }

  const handleSkip = () => {
    navigate('/')
  }

  return (
    <div className='w-[800px] mx-auto'>
      <Card className='rounded-3xl'>
        <CardContent className='space-y-8 p-8'>
          <div className='text-center space-y-5'>
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

          <div className='text-2xl font-semibold text-gray-800 pt-10'>나는 이런 독서가에요.</div>

          <div className='space-y-6'>
            {/* 질문 1: MBTI */}
            <Card className='border-0 shadow-none'>
              <CardHeader className='px-0'>
                <CardTitle className='text-xl'>내 MBTI는?</CardTitle>
              </CardHeader>
              <CardContent className='px-0'>
                <div className='grid grid-cols-4 gap-3'>
                  {MBTI_TYPES.map((type) => (
                    <Toggle
                      key={type}
                      pressed={mbti === type}
                      onPressedChange={() => toggleMbti(type)}
                      variant='outline'
                      className='p-3'
                    >
                      {type}
                    </Toggle>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 질문 2: 인생 책/작가 */}
            <Card className='border-0 shadow-none'>
              <CardHeader className='px-0'>
                <CardTitle className='text-xl'>인생 책이나 좋아하는 작가를 알려주세요</CardTitle>
                <p className='text-sm text-muted-foreground'>최대 3개까지 선택 가능합니다</p>
              </CardHeader>
              <CardContent className='space-y-4 px-0'>
                <div className='flex gap-2'>
                  <Input
                    placeholder='책 제목이나 작가명을 검색하세요'
                    value={bookSearch}
                    onChange={(e) => setBookSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addBook()}
                  />
                  <Button onClick={addBook} disabled={selectedBooks.length >= 3}>
                    검색
                  </Button>
                </div>
                {selectedBooks.length > 0 && (
                  <div className='flex flex-wrap gap-2'>
                    {selectedBooks.map((book) => (
                      <Badge
                        key={book}
                        variant='default'
                        className='cursor-pointer'
                        onClick={() => removeBook(book)}
                      >
                        {book} ✕
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 질문 3: 독서 분위기 */}
            <Card className='border-0 shadow-none'>
              <CardHeader className='px-0'>
                <CardTitle className='text-xl'>책을 읽을 때 선호하는 분위기는?</CardTitle>
              </CardHeader>
              <CardContent className='px-0'>
                <div className='flex flex-wrap gap-3'>
                  {READING_MOODS.map((mood) => (
                    <Toggle
                      key={mood}
                      pressed={readingMoods.includes(mood)}
                      onPressedChange={() => toggleReadingMood(mood)}
                      variant='outline'
                      size='sm'
                    >
                      {mood}
                    </Toggle>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 질문 4: 독서 습관 */}
            <Card className='border-0 shadow-none'>
              <CardHeader className='px-0'>
                <CardTitle className='text-xl'>평소 독서 습관은 어떤가요?</CardTitle>
              </CardHeader>
              <CardContent className='px-0'>
                <Textarea
                  placeholder='예) 주말마다 2-3시간씩 읽어요, 하루 30분씩 꾸준히 읽어요, 한 달에 3-4권 정도 읽어요 등'
                  value={readingHabit}
                  onChange={(e) => setReadingHabit(e.target.value)}
                  className='min-h-[100px]'
                />
              </CardContent>
            </Card>

            {/* 질문 5: 좋아하는 장르 */}
            <Card className='border-0 shadow-none'>
              <CardHeader className='px-0'>
                <CardTitle className='text-xl'>내가 좋아하는 장르는?</CardTitle>
              </CardHeader>
              <CardContent className='px-0'>
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
                <CardTitle className='text-xl'>주로 관심있는 키워드는?</CardTitle>
              </CardHeader>
              <CardContent className='px-0'>
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
          <div className='flex justify-center gap-4 pt-8'>
            <Button size='xl' onClick={handleComplete}>
              설정 완료하고 시작하기
            </Button>
            <Button variant='outline' size='xl' onClick={handleSkip}>
              건너뛰기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
