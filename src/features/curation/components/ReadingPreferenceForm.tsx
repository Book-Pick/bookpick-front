import { X } from 'lucide-react'
import { Badge, Toggle, Card, CardContent, CardHeader, CardTitle, Checkbox } from '@/shared/ui'
import {
  MBTI_TYPES,
  READING_MOODS,
  GENRES,
  KEYWORDS,
  READING_HABITS,
  READING_STYLES,
  FAVORITE_AUTHORS,
  type LifeBook,
} from '../constants/preferences'
import { LifeBookSearchSection } from './LifeBookSearchSection'
import { AuthorSearchSection } from './AuthorSearchSection'
import type { ReadingPreferenceFormData } from '../hooks/useReadingPreferenceForm'

interface ReadingPreferenceFormProps {
  formData: ReadingPreferenceFormData
  handlers: {
    toggleMbti: (type: string) => void
    toggleReadingMood: (mood: string) => void
    toggleReadingHabit: (habit: string) => void
    toggleGenre: (genre: string) => void
    toggleKeyword: (keyword: string) => void
    toggleReadingStyle: (style: string) => void
    handleLifeBookSelect: (book: LifeBook | null) => void
    removeLifeBook: (book: LifeBook) => void
    handleAuthorSelect: (author: string) => void
    removeAuthor: (author: string) => void
  }
}

export default function ReadingPreferenceForm({ formData, handlers }: ReadingPreferenceFormProps) {
  return (
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
                    pressed={formData.mbti === type}
                    onPressedChange={() => handlers.toggleMbti(type)}
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
            </CardHeader>
            <CardContent className='space-y-4 px-0 pt-4'>
              {formData.selectedLifeBooks.length > 0 && (
                <div className='flex flex-wrap gap-2'>
                  {formData.selectedLifeBooks.map((book) => (
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
                          handlers.removeLifeBook(book)
                        }}
                      >
                        <X size={12} />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              <LifeBookSearchSection
                onBookSelect={handlers.handleLifeBookSelect}
                placeholder='인생 책을 검색해보세요'
                maxSelections={3}
                currentCount={formData.selectedLifeBooks.length}
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
              {formData.selectedAuthors.length > 0 && (
                <div className='flex flex-wrap gap-2'>
                  {formData.selectedAuthors.map((author) => (
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
                          handlers.removeAuthor(author)
                        }}
                      >
                        <X size={12} />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              <AuthorSearchSection
                onAuthorSelect={handlers.handleAuthorSelect}
                searchData={FAVORITE_AUTHORS}
                placeholder='좋아하는 작가명을 검색하거나 직접 입력하세요'
                maxSelections={3}
                currentCount={formData.selectedAuthors.length}
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
                    pressed={formData.readingMoods.includes(mood)}
                    onPressedChange={() => handlers.toggleReadingMood(mood)}
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
                      checked={formData.readingHabits.includes(habit)}
                      onCheckedChange={() => handlers.toggleReadingHabit(habit)}
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
                    pressed={formData.genres.includes(genre)}
                    onPressedChange={() => handlers.toggleGenre(genre)}
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
          <Card className='border-0 border-b-1 rounded-none shadow-none pb-10'>
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
                    pressed={formData.keywords.includes(keyword)}
                    onPressedChange={() => handlers.toggleKeyword(keyword)}
                    variant='outline'
                    size='sm'
                  >
                    {keyword}
                  </Toggle>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 질문 7: 나의 독서 성향 */}
          <Card className='border-0 shadow-none'>
            <CardHeader className='px-0'>
              <CardTitle className='text-xl'>평소 어떤 스타일로 책을 즐기시나요?</CardTitle>
              <p className='text-xs text-muted-foreground'>
                ※ 해당사항이 없으시면 그냥 지나가셔도 좋아요!
              </p>
            </CardHeader>
            <CardContent className='px-0 pt-4'>
              <div className='flex flex-wrap gap-3'>
                {READING_STYLES.map((style) => (
                  <Toggle
                    key={style}
                    pressed={formData.readingStyles.includes(style)}
                    onPressedChange={() => handlers.toggleReadingStyle(style)}
                    variant='outline'
                    size='sm'
                  >
                    {style}
                  </Toggle>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
