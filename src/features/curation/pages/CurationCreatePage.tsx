import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText } from 'lucide-react'
import { Button, Card, CardContent } from '@/shared/ui'
import { CurationTitleSection } from '../components/CurationTitleSection'
import { ThumbnailSelector } from '../components/ThumbnailSelector'
import { BookSearchSection } from '../components/BookSearchSection'
import { ReviewSection } from '../components/ReviewSection'
import { KeywordSection } from '../components/KeywordSection'
import { DraftListSheet } from '../components/DraftListSheet'
import { COLOR_PALETTE, type SearchBook, type DraftCuration } from '../constants/curationCreateData'

export default function CurationCreatePage() {
  const navigate = useNavigate()

  // 상태 관리
  const [title, setTitle] = useState('')
  const [selectedColor, setSelectedColor] = useState(COLOR_PALETTE[0].value)
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [selectedBook, setSelectedBook] = useState<SearchBook | null>(null)
  const [content, setContent] = useState('')
  const [keywords, setKeywords] = useState<string[]>([])
  const [isDraftSheetOpen, setIsDraftSheetOpen] = useState(false)

  const handleSaveDraft = () => {
    // 임시 저장 로직
    console.log('임시 저장:', {
      title,
      selectedColor,
      thumbnail,
      selectedBook,
      content,
      keywords,
    })
    alert('임시 저장되었습니다.')
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
    })
    alert('큐레이션이 등록되었습니다.')
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
      <Card className='border-0 p-0'>
        <CardContent className='p-0'>
          <CurationTitleSection
            title={title}
            onTitleChange={setTitle}
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
          />
        </CardContent>
      </Card>
      <div className='py-8'>
        <div className='space-y-8'>
          {/* 헤더 */}
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold'>나만의 큐레이션 작성하기</h1>
            <Button variant='outline' onClick={() => setIsDraftSheetOpen(true)}>
              <FileText size={16} className='mr-2' />
              임시 저장된 글 가져오기
            </Button>
          </div>

          {/* 썸네일 선택 */}
          <Card>
            <CardContent className='p-6'>
              <ThumbnailSelector thumbnail={thumbnail} onThumbnailChange={setThumbnail} />
            </CardContent>
          </Card>

          {/* 책 검색 */}
          <Card>
            <CardContent className='p-6'>
              <BookSearchSection selectedBook={selectedBook} onBookSelect={setSelectedBook} />
            </CardContent>
          </Card>

          {/* 감상 작성 */}
          <Card>
            <CardContent className='p-6'>
              <ReviewSection content={content} onContentChange={setContent} />
            </CardContent>
          </Card>

          {/* 키워드 추가 */}
          <Card>
            <CardContent className='p-6'>
              <KeywordSection keywords={keywords} onKeywordsChange={setKeywords} />
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
            <Button size='lg' onClick={handlePublish} className='w-full sm:w-auto'>
              큐레이션 등록하기
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
