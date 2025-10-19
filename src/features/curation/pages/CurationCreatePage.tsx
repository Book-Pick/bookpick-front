import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText } from 'lucide-react'
import {
  Button,
  Card,
  CardContent,
  Toggle,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/shared/ui'
import { CurationTitleSection } from '../components/CurationTitleSection'
// import { ThumbnailSelector } from '../components/ThumbnailSelector'
import { BookSearchSection } from '../components/BookSearchSection'
import { ReviewSection } from '../components/ReviewSection'
import { KeywordSection } from '../components/KeywordSection'
import { DraftListSheet } from '../components/DraftListSheet'
import { COLOR_PALETTE, type SearchBook, type DraftCuration } from '../constants/curationCreateData'
import { READING_MOODS, GENRES, KEYWORDS, READING_STYLES } from '../constants/preferences'
import toast from 'react-hot-toast'

export default function CurationCreatePage() {
  const navigate = useNavigate()

  // 상태 관리
  const [title, setTitle] = useState('')
  const [selectedColor, setSelectedColor] = useState(COLOR_PALETTE[0].value as string)
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [selectedBook, setSelectedBook] = useState<SearchBook | null>(null)
  const [content, setContent] = useState('')
  const [keywords, setKeywords] = useState<string[]>([])
  const [isDraftSheetOpen, setIsDraftSheetOpen] = useState(false)

  // 추천 대상 상태 관리
  const [recommendedMoods, setRecommendedMoods] = useState<string[]>([])
  const [recommendedGenres, setRecommendedGenres] = useState<string[]>([])
  const [recommendedKeywords, setRecommendedKeywords] = useState<string[]>([])
  const [recommendedStyles, setRecommendedStyles] = useState<string[]>([])

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

  const handleSaveDraft = () => {
    // 임시 저장 로직
    console.log('임시 저장:', {
      title,
      selectedColor,
      thumbnail,
      selectedBook,
      content,
      keywords,
      recommendedMoods,
      recommendedGenres,
      recommendedKeywords,
      recommendedStyles,
    })
    toast.success('임시 저장되었습니다.')
  }

  const handlePublish = () => {
    // 큐레이션 등록 로직
    console.log('큐레이션 등록:', {
      title,
      selectedColor,
      thumbnail,
      selectedBook,
      content,
      keywords,
      recommendedMoods,
      recommendedGenres,
      recommendedKeywords,
      recommendedStyles,
    })
    toast.success('큐레이션이 등록되었습니다.')
    navigate('/mypage/curation')
  }

  const handleLoadDraft = (draft: DraftCuration) => {
    setTitle(draft.title)
    setContent(draft.content)
    // 다른 필드들은 draft 데이터에 따라 설정
  }

  return (
    <>
      {/* 제목 섹션 */}
      <div className='w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]'>
        <Card className='border-0 p-0'>
          <CardContent className='p-0'>
            <CurationTitleSection
              title={title}
              onTitleChange={setTitle}
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
              thumbnail={thumbnail}
              onThumbnailChange={setThumbnail}
            />
          </CardContent>
        </Card>
      </div>
      <div className='pt-8 sm:pt-16 pb-8'>
        <div className='space-y-4'>
          {/* 헤더 */}
          <div className='flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-8 sm:gap-4'>
            <h1 className='text-2xl font-bold'>나만의 추천사 작성하기</h1>
            <Button
              variant='outline'
              onClick={() => setIsDraftSheetOpen(true)}
              className='self-end md:self-auto'
            >
              <FileText size={16} className='mr-2' />
              임시 저장된 글 가져오기
            </Button>
          </div>

          {/* 썸네일 선택 */}
          {/* <Card className='rounded-none bg-transparent border-0 border-b'>
            <CardContent className='p-6'>
              <ThumbnailSelector thumbnail={thumbnail} onThumbnailChange={setThumbnail} />
            </CardContent>
          </Card> */}

          {/* 책 검색 */}
          <Card className='rounded-none bg-transparent border-0 border-b'>
            <CardContent className='p-6'>
              <BookSearchSection selectedBook={selectedBook} onBookSelect={setSelectedBook} />
            </CardContent>
          </Card>

          {/* 감상 작성 */}
          <Card className='rounded-none bg-transparent border-0 border-b'>
            <CardContent className='p-6'>
              <ReviewSection content={content} onContentChange={setContent} />
            </CardContent>
          </Card>

          {/* 키워드 추가 */}
          <Card className='rounded-none bg-transparent border-0 border-b'>
            <CardContent className='p-6'>
              <KeywordSection keywords={keywords} onKeywordsChange={setKeywords} />
            </CardContent>
          </Card>

          {/* 이런 독서가에게 추천합니다 */}
          <Card className='rounded-none bg-transparent border-0'>
            <CardContent className='p-6'>
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>이런 독서가에게 추천합니다</h3>
                <p className='text-sm text-muted-foreground'>
                  이 추천사가 어떤 독서가에게 도움이 될지 선택해주세요. (선택사항)
                </p>

                <Accordion type='multiple' className='w-full'>
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
                            className='px-4 rounded-4xl'
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
          <div className='flex flex-col sm:flex-row justify-center gap-4 pt-8'>
            <Button
              variant='outline'
              size='lg'
              onClick={handleSaveDraft}
              className='w-full sm:w-auto'
            >
              임시 저장
            </Button>
            <Button
              variant='secondary'
              size='lg'
              onClick={handlePublish}
              className='w-full sm:w-auto'
            >
              추천사 등록하기
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
