import { EditorPickSection } from '@/shared/components/EditorPickSection'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui'
import { useNavigate } from 'react-router-dom'
import { ContentsLayout } from '@/app/layout'
import CurationList from '@/features/curation/components/CurationList'
import { useGetCurations } from '@/features/curation/hooks/useCuration'
import EmptyCurations from '@/features/curation/components/EmptyCurations'
import EmptyCurationsCta from '@/features/curation/components/EmptyCurationsCta'
import toast from 'react-hot-toast'
import { useGetReadingPreference } from '@/features/curation/hooks/useCuration'

export default function HomePage() {
  const navigate = useNavigate()

  const { data: personalizedData, isLoading: isLoadingPersonalized } = useGetCurations({
    sort: 'similarity',
    cursor: 0,
    size: 10,
  })
  const { data: popularData, isLoading: isLoadingPopular } = useGetCurations({
    sort: 'popularity',
    cursor: 0,
    size: 6,
  })
  const { data: recentData, isLoading: isLoadingRecent } = useGetCurations({
    sort: 'latest',
    cursor: 0,
    size: 6,
  })
  const { data: readingPreference } = useGetReadingPreference()

  const handleCardClick = (curationId: number) => {
    navigate(`/curation/detail/${curationId}`)
  }

  const similarCurations = personalizedData?.content || []
  const likeCurations = popularData?.content || []
  const recentCurations = recentData?.content || []

  // 에디터 픽 데이터
  const editorPicks = [
    {
      id: '1',
      title: '#에겐남 독자들의 추천사 모음',
      imageUrl: '/images/sample_image_01.jpeg',
    },
    {
      id: '2',
      title: '#INFP 책방지기의 가을 도서 추천사',
      imageUrl: '/images/sample_image_02.jpeg',
    },
    {
      id: '3',
      title: '#가을 강가에서 소설을',
      imageUrl: '/images/sample_image_03.jpeg',
    },
  ]

  const handleEditorPickClick = (_id: string) => {
    void _id // 임시로 사용하지 않음
    toast('서비스 예정입니다.', {
      icon: '⏳',
    })
  }

  return (
    <div className='min-h-screen bg-background'>
      {/* 메인 컨텐츠 영역 */}
      <ContentsLayout>
        {/* 에디터 픽 섹션 */}
        <section className='mb-[50px] mt-5'>
          <EditorPickSection
            title='에디터가 엄선한 #가을 #낭만 #여행'
            picks={editorPicks}
            onCardClick={handleEditorPickClick}
          />
        </section>

        <section className='mt-5 xs:mt-0 mb-16'>
          <div className='flex w-full flex-col gap-6'>
            <Tabs defaultValue='similar'>
              <TabsList>
                <TabsTrigger value='like' size='lg'>
                  인기순
                </TabsTrigger>
                <TabsTrigger value='similar' size='lg'>
                  내 취향 유사도순
                </TabsTrigger>
                <TabsTrigger value='recent' size='lg'>
                  최신순
                </TabsTrigger>
              </TabsList>
              <TabsContent value='similar'>
                {isLoadingPersonalized ? (
                  <div className='flex justify-center items-center mt-6 py-20'>
                    <p className='text-muted-foreground'>로딩 중...</p>
                  </div>
                ) : similarCurations?.length > 0 ? (
                  <CurationList curations={similarCurations} onCardClick={handleCardClick} />
                ) : (
                  <EmptyCurationsCta />
                )}
              </TabsContent>
              <TabsContent value='like'>
                {isLoadingPopular ? (
                  <div className='flex justify-center items-center mt-6 py-20'>
                    <p className='text-muted-foreground'>로딩 중...</p>
                  </div>
                ) : likeCurations?.length > 0 ? (
                  <CurationList curations={likeCurations} onCardClick={handleCardClick} />
                ) : readingPreference?.preferenceId ? (
                  <EmptyCurations />
                ) : (
                  <EmptyCurationsCta />
                )}
              </TabsContent>
              <TabsContent value='recent'>
                {isLoadingRecent ? (
                  <div className='flex justify-center items-center mt-6 py-20'>
                    <p className='text-muted-foreground'>로딩 중...</p>
                  </div>
                ) : recentCurations?.length > 0 ? (
                  <CurationList curations={recentCurations} onCardClick={handleCardClick} />
                ) : (
                  <EmptyCurations />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </ContentsLayout>
    </div>
  )
}
