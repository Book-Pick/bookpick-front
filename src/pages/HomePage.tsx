import { useRef, useCallback } from 'react'
import { EditorPickSection } from '@/shared/components/EditorPickSection'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui'
import { useNavigate } from 'react-router-dom'
import { ContentsLayout } from '@/app/layout'
import CurationList from '@/features/curation/components/CurationList'
import {
  useGetInfiniteCurations,
  useGetReadingPreference,
} from '@/features/curation/hooks/useCuration'
import EmptyCurations from '@/features/curation/components/EmptyCurations'
import EmptyCurationsCta from '@/features/curation/components/EmptyCurationsCta'
import toast from 'react-hot-toast'

export default function HomePage() {
  const navigate = useNavigate()

  // Observer 인스턴스를 저장할 ref
  const popularObserverInstance = useRef<IntersectionObserver | null>(null)
  const similarObserverInstance = useRef<IntersectionObserver | null>(null)
  const recentObserverInstance = useRef<IntersectionObserver | null>(null)

  const {
    data: personalizedData,
    isLoading: isLoadingPersonalized,
    fetchNextPage: fetchNextPersonalized,
    hasNextPage: hasNextPersonalized,
    isFetchingNextPage: isFetchingNextPersonalized,
  } = useGetInfiniteCurations({
    sort: 'similarity',
    size: 10,
  })

  const {
    data: popularData,
    isLoading: isLoadingPopular,
    fetchNextPage: fetchNextPopular,
    hasNextPage: hasNextPopular,
    isFetchingNextPage: isFetchingNextPopular,
  } = useGetInfiniteCurations({
    sort: 'popularity',
    size: 6,
  })

  const {
    data: recentData,
    isLoading: isLoadingRecent,
    fetchNextPage: fetchNextRecent,
    hasNextPage: hasNextRecent,
    isFetchingNextPage: isFetchingNextRecent,
  } = useGetInfiniteCurations({
    sort: 'latest',
    size: 6,
  })

  // 인기순 콜백 ref
  const popularObserverRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (popularObserverInstance.current) {
        popularObserverInstance.current.disconnect()
      }
      if (node) {
        popularObserverInstance.current = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && hasNextPopular && !isFetchingNextPopular) {
              fetchNextPopular()
            }
          },
          { threshold: 0.1 },
        )
        popularObserverInstance.current.observe(node)
      }
    },
    [fetchNextPopular, hasNextPopular, isFetchingNextPopular],
  )

  // 유사도순 콜백 ref
  const similarObserverRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (similarObserverInstance.current) {
        similarObserverInstance.current.disconnect()
      }
      if (node) {
        similarObserverInstance.current = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && hasNextPersonalized && !isFetchingNextPersonalized) {
              fetchNextPersonalized()
            }
          },
          { threshold: 0.1 },
        )
        similarObserverInstance.current.observe(node)
      }
    },
    [fetchNextPersonalized, hasNextPersonalized, isFetchingNextPersonalized],
  )

  // 최신순 콜백 ref
  const recentObserverRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (recentObserverInstance.current) {
        recentObserverInstance.current.disconnect()
      }
      if (node) {
        recentObserverInstance.current = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && hasNextRecent && !isFetchingNextRecent) {
              fetchNextRecent()
            }
          },
          { threshold: 0.1 },
        )
        recentObserverInstance.current.observe(node)
      }
    },
    [fetchNextRecent, hasNextRecent, isFetchingNextRecent],
  )

  const handleCardClick = (curationId: number) => {
    navigate(`/curation/detail/${curationId}`)
  }

  // 무한 스크롤 데이터 평탄화
  const similarCurations = personalizedData?.pages.flatMap((page) => page.content) || []
  const likeCurations = popularData?.pages.flatMap((page) => page.content) || []
  const recentCurations = recentData?.pages.flatMap((page) => page.content) || []

  // 독서 취향 조회
  const { data: readingPreference } = useGetReadingPreference()

  const hasNoPreferenceData = readingPreference
    ? Object.entries(readingPreference)
        .filter(([key]) => key !== 'preferenceId')
        .every(
          ([, value]) =>
            value == null || (Array.isArray(value) && value.length === 0) || value === '',
        )
    : true

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
    toast('서비스 준비 중입니다.', {
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
            <Tabs defaultValue='like'>
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
              <TabsContent value='like'>
                {isLoadingPopular ? (
                  <div className='flex justify-center items-center mt-6 py-20'>
                    <p className='text-muted-foreground'>로딩 중...</p>
                  </div>
                ) : likeCurations?.length > 0 ? (
                  <>
                    <CurationList curations={likeCurations} onCardClick={handleCardClick} />
                    <div ref={popularObserverRef} className='h-4' />
                    {isFetchingNextPopular && (
                      <div className='flex justify-center items-center py-4'>
                        <p className='text-muted-foreground'>더 불러오는 중...</p>
                      </div>
                    )}
                    {!hasNextPopular && (
                      <div className='flex items-center justify-center gap-4 py-8 text-muted-foreground'>
                        <div className='h-px flex-1 bg-border' />
                        <span className='text-sm'>📚 모든 추천사를 확인했어요</span>
                        <div className='h-px flex-1 bg-border' />
                      </div>
                    )}
                  </>
                ) : (
                  <EmptyCurations />
                )}
              </TabsContent>
              <TabsContent value='similar'>
                {isLoadingPersonalized ? (
                  <div className='flex justify-center items-center mt-6 py-20'>
                    <p className='text-muted-foreground'>로딩 중...</p>
                  </div>
                ) : similarCurations?.length > 0 ? (
                  <>
                    <CurationList curations={similarCurations} onCardClick={handleCardClick} />
                    <div ref={similarObserverRef} className='h-4' />
                    {isFetchingNextPersonalized && (
                      <div className='flex justify-center items-center py-4'>
                        <p className='text-muted-foreground'>더 불러오는 중...</p>
                      </div>
                    )}
                    {!hasNextPersonalized && (
                      <div className='flex items-center justify-center gap-4 py-8 text-muted-foreground'>
                        <div className='h-px flex-1 bg-border' />
                        <span className='text-sm'>📚 모든 추천사를 확인했어요</span>
                        <div className='h-px flex-1 bg-border' />
                      </div>
                    )}
                  </>
                ) : hasNoPreferenceData ? (
                  <EmptyCurationsCta />
                ) : (
                  <EmptyCurations />
                )}
              </TabsContent>
              <TabsContent value='recent'>
                {isLoadingRecent ? (
                  <div className='flex justify-center items-center mt-6 py-20'>
                    <p className='text-muted-foreground'>로딩 중...</p>
                  </div>
                ) : recentCurations?.length > 0 ? (
                  <>
                    <CurationList curations={recentCurations} onCardClick={handleCardClick} />
                    <div ref={recentObserverRef} className='h-4' />
                    {isFetchingNextRecent && (
                      <div className='flex justify-center items-center py-4'>
                        <p className='text-muted-foreground'>더 불러오는 중...</p>
                      </div>
                    )}
                    {!hasNextRecent && (
                      <div className='flex items-center justify-center gap-4 py-8 text-muted-foreground'>
                        <div className='h-px flex-1 bg-border' />
                        <span className='text-sm'>📚 모든 추천사를 확인했어요</span>
                        <div className='h-px flex-1 bg-border' />
                      </div>
                    )}
                  </>
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
