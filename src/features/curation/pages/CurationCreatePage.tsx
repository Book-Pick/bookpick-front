import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
// import { FileText } from 'lucide-react'
import {
  Button,
  Card,
  CardContent,
  Toggle,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Input,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/shared/ui'
import { BookSearchSection } from '../components/BookSearchSection'
import { ReviewSection } from '../components/ReviewSection'
import { DraftListSheet } from '../components/DraftListSheet'
import ThumbnailPreview from '../components/ThumbnailPreview'
import { COLOR_PALETTE, type DraftCuration } from '../constants/curationCreateData'
import { READING_MOODS, GENRES, KEYWORDS, READING_STYLES } from '../constants/preferences'
import toast from 'react-hot-toast'
import type { CreateCurationRequest, Book } from '../types/curation.types'
import { useCreateCuration } from '../hooks/useCuration'

export default function CurationCreatePage() {
  const navigate = useNavigate()
  const { mutate: createCurationMutate, isPending } = useCreateCuration()

  const [title, setTitle] = useState('')
  const [selectedColor, setSelectedColor] = useState<string | null>(
    COLOR_PALETTE[3].value as string,
  )
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [content, setContent] = useState('')
  const [isDraftSheetOpen, setIsDraftSheetOpen] = useState(false)

  const [recommendedMoods, setRecommendedMoods] = useState<string[]>([])
  const [recommendedGenres, setRecommendedGenres] = useState<string[]>([])
  const [recommendedKeywords, setRecommendedKeywords] = useState<string[]>([])
  const [recommendedStyles, setRecommendedStyles] = useState<string[]>([])

  const isEmptyContent = useMemo(
    () => !title && !selectedBook && !content,
    [title, selectedBook, content],
  )

  // 토글 함수들
  const toggleRecommendedMood = (mood: string) => {
    setRecommendedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood],
    )
  }

  const toggleRecommendedGenre = (genre: string) => {
    setRecommendedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    )
  }

  const toggleRecommendedKeyword = (keyword: string) => {
    setRecommendedKeywords((prev) =>
      prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword],
    )
  }

  const toggleRecommendedStyle = (style: string) => {
    setRecommendedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style],
    )
  }

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
    setThumbnail(null)
    setThumbnailUrl(null)
  }

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setThumbnail(file)
    if (file) {
      setSelectedColor(null)
    }
  }

  const handleThumbnailUpload = (url: string) => {
    setThumbnailUrl(url)
  }

  const getCreateCurationRequest = ({
    isDrafted,
  }: {
    isDrafted: boolean
  }): CreateCurationRequest => {
    return {
      title,
      thumbnail: {
        imageUrl: thumbnailUrl,
        imageColor: selectedColor,
      },
      book: {
        title: selectedBook?.title || '',
        author: selectedBook?.author || '',
        imageUrl: selectedBook?.imageUrl || '',
        isbn: selectedBook?.isbn,
      },
      review: content,
      recommend: {
        moods: recommendedMoods,
        genres: recommendedGenres,
        keywords: recommendedKeywords,
        styles: recommendedStyles,
      },
      isDrafted: isDrafted,
    }
  }

  const handleSaveDraft = () => {
    const request = getCreateCurationRequest({ isDrafted: true })

    createCurationMutate(request, {
      onSuccess: () => {
        navigate('/mypage/curation')
      },
    })
  }

  const handlePublish = () => {
    if (!title) {
      toast.error('제목을 입력해주세요.')
      return
    }
    if (!selectedBook) {
      toast.error('책을 선택해주세요.')
      return
    }
    if (!content) {
      toast.error('감상을 입력해주세요.')
      return
    }
    if (!thumbnailUrl && !selectedColor) {
      toast.error('썸네일을 선택해주세요.')
      return
    }

    const request = getCreateCurationRequest({ isDrafted: false })

    createCurationMutate(request, {
      onSuccess: () => {
        navigate('/mypage/curation')
      },
    })
  }

  const handleLoadDraft = (draft: DraftCuration) => {
    setTitle(draft.title)
    setContent(draft.content)
    // Todo: 다른 필드들은 draft 데이터에 따라 설정
  }

  return (
    <>
      <div className='pt-8 sm:pt-16 pb-8'>
        <div className='space-y-4'>
          {/* 헤더 */}
          <div className='flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-8 sm:gap-4'>
            <h1 className='text-2xl font-bold px-4'>나만의 추천사 작성하기</h1>
            {/* <Button
              variant='outline'
              onClick={() => setIsDraftSheetOpen(true)}
              className='self-end md:self-auto'
            >
              <FileText size={16} className='mr-2' />
              임시 저장된 글 가져오기
            </Button> */}
          </div>

          {/* 1. 추천사 제목 입력 */}
          <Card className='rounded-none bg-transparent border-0 border-b py-0'>
            <CardContent className='p-4'>
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>1. 추천사 제목을 적어주세요!</h3>
                <Input
                  placeholder='제목을 입력해 주세요'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={100}
                />
                <div className='text-sm text-muted-foreground text-right'>{title.length}/100</div>
              </div>
            </CardContent>
          </Card>

          {/* 2. 책 검색 */}
          <Card className='rounded-none bg-transparent border-0 border-b py-0'>
            <CardContent className='p-4'>
              <BookSearchSection
                selectedBook={selectedBook}
                onBookSelect={setSelectedBook}
                title='2. 어떤 책에 대한 감상인가요?*'
              />
            </CardContent>
          </Card>

          {/* 3. 감상 작성 */}
          <Card className='rounded-none bg-transparent border-0 border-b py-0'>
            <CardContent className='p-4'>
              <ReviewSection content={content} onContentChange={setContent} />
            </CardContent>
          </Card>

          {/* 4. 썸네일 선택 */}
          <Card className='rounded-none bg-transparent border-0 border-b py-0'>
            <CardContent className='p-4'>
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>4. 썸네일을 선택해 주세요!</h3>
                <p className='text-sm text-muted-foreground'>
                  단색 또는 썸네일 이미지 중 하나를 선택할 수 있습니다.
                </p>

                <Tabs defaultValue='color' variant='button'>
                  <TabsList>
                    <TabsTrigger value='color'>단색</TabsTrigger>
                    <TabsTrigger value='image'>이미지 업로드</TabsTrigger>
                  </TabsList>

                  {/* 배경 색상 탭 */}
                  <TabsContent value='color' className='space-y-4 mt-4'>
                    <div className='w-fit border p-4 rounded-xl space-y-3'>
                      <div className='grid grid-cols-5 md:grid-cols-10 gap-1.5'>
                        {COLOR_PALETTE.filter((color) => color.name.includes('400')).map(
                          (color) => (
                            <button
                              key={color.value}
                              onClick={() => handleColorSelect(color.value)}
                              className={`w-10 h-10 rounded-lg border-2 transition-all hover:scale-105 ${
                                selectedColor === color.value && !thumbnail
                                  ? 'ring-2 ring-primary ring-offset-2'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              style={{ backgroundColor: color.value }}
                              title={color.name}
                            />
                          ),
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  {/* 썸네일 이미지 탭 */}
                  <TabsContent value='image' className='space-y-4 mt-4'>
                    <ThumbnailPreview
                      thumbnail={thumbnail}
                      thumbnailUrl={thumbnailUrl}
                      onThumbnailSelect={handleThumbnailSelect}
                      onThumbnailUpload={handleThumbnailUpload}
                      title={title}
                      content={content}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          {/* 5. 이런 독서가에게 추천합니다 */}
          <Card className='rounded-none bg-transparent border-0 py-0'>
            <CardContent className='p-4'>
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>이런 독서가에게 추천합니다.</h3>
                <p className='text-sm text-muted-foreground'>
                  이 추천사가 어떤 독서가에게 도움이 될지 선택해주세요. (선택사항)
                </p>

                <Accordion
                  type='multiple'
                  className='w-full'
                  defaultValue={['mood', 'genre', 'keyword', 'style']}
                >
                  {/* 질문 1: 책을 읽을 때 추천하는 분위기는? */}
                  <AccordionItem value='mood'>
                    <AccordionTrigger className='text-base font-medium'>
                      책을 읽을 때 추천하는 분위기는?
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className='flex flex-wrap gap-2 pt-2'>
                        {READING_MOODS.map((mood) => (
                          <Toggle
                            key={mood}
                            pressed={recommendedMoods.includes(mood)}
                            onPressedChange={() => toggleRecommendedMood(mood)}
                            variant='outline'
                            className='rounded-4xl px-4'
                          >
                            #{mood}
                          </Toggle>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 질문 2: 추천하는 책의 장르는? */}
                  <AccordionItem value='genre'>
                    <AccordionTrigger className='text-base font-medium'>
                      추천하는 책의 장르는?
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className='flex flex-wrap gap-2 pt-2'>
                        {GENRES.map((genre) => (
                          <Toggle
                            key={genre}
                            pressed={recommendedGenres.includes(genre)}
                            onPressedChange={() => toggleRecommendedGenre(genre)}
                            variant='outline'
                            size='sm'
                            className='px-4'
                          >
                            {genre}
                          </Toggle>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 질문 3: 추천하는 책의 키워드는? */}
                  <AccordionItem value='keyword'>
                    <AccordionTrigger className='text-base font-medium'>
                      추천하는 책의 키워드는?
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className='flex flex-wrap gap-2 pt-2'>
                        {KEYWORDS.map((keyword) => (
                          <Toggle
                            key={keyword}
                            pressed={recommendedKeywords.includes(keyword)}
                            onPressedChange={() => toggleRecommendedKeyword(keyword)}
                            variant='outline'
                            size='sm'
                            className='px-4'
                          >
                            {keyword}
                          </Toggle>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 질문 4: 추천하는 독서 성향은? */}
                  <AccordionItem value='style'>
                    <AccordionTrigger className='text-base font-medium'>
                      추천하는 독서 성향은?
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className='flex flex-wrap gap-2 pt-2'>
                        {READING_STYLES.map((style) => (
                          <Toggle
                            key={style}
                            pressed={recommendedStyles.includes(style)}
                            onPressedChange={() => toggleRecommendedStyle(style)}
                            variant='outline'
                            size='sm'
                            className='px-4'
                          >
                            {style}
                          </Toggle>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
          </Card>

          {/* 하단 버튼 */}
          <div className='flex justify-center gap-4 pt-8'>
            <Button
              variant='outline'
              size='lg'
              onClick={handleSaveDraft}
              className='flex-1 sm:flex-none'
              disabled={isPending || isEmptyContent}
            >
              임시저장
            </Button>
            <Button
              size='lg'
              onClick={handlePublish}
              className='flex-1 sm:flex-none'
              disabled={isPending || isEmptyContent}
            >
              발행하기
            </Button>
          </div>
        </div>

        {/* 임시 저장 목록 Sheet */}
        <DraftListSheet
          isOpen={isDraftSheetOpen}
          onClose={() => setIsDraftSheetOpen(false)}
          onSelectDraft={handleLoadDraft}
        />
      </div>
    </>
  )
}
