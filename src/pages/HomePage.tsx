import { useEffect, useRef, useCallback } from 'react'
import { EditorPickSection } from '@/shared/components/EditorPickSection'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui'
import { useNavigate } from 'react-router-dom'
import { ContentsLayout } from '@/app/layout'
import CurationList from '@/features/curation/components/CurationList'
import { useGetInfiniteCurations } from '@/features/curation/hooks/useCuration'
import EmptyCurations from '@/features/curation/components/EmptyCurations'
import EmptyCurationsCta from '@/features/curation/components/EmptyCurationsCta'
import toast from 'react-hot-toast'

export default function HomePage() {
  const navigate = useNavigate()

  // 무한 스크롤을 위한 ref
  const popularObserverRef = useRef<HTMLDivElement>(null)
  const similarObserverRef = useRef<HTMLDivElement>(null)
  const recentObserverRef = useRef<HTMLDivElement>(null)

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

  // Intersection Observer 콜백
  const createObserverCallback = useCallback(
    (fetchNext: () => void, hasNext: boolean | undefined, isFetching: boolean) => {
      return (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting && hasNext && !isFetching) {
          fetchNext()
        }
      }
    },
    [],
  )

  // 인기순 Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      createObserverCallback(fetchNextPopular, hasNextPopular, isFetchingNextPopular),
      { threshold: 0.1 },
    )
    if (popularObserverRef.current) {
      observer.observe(popularObserverRef.current)
    }
    return () => observer.disconnect()
  }, [fetchNextPopular, hasNextPopular, isFetchingNextPopular, createObserverCallback])

  // 유사도순 Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      createObserverCallback(
        fetchNextPersonalized,
        hasNextPersonalized,
        isFetchingNextPersonalized,
      ),
      { threshold: 0.1 },
    )
    if (similarObserverRef.current) {
      observer.observe(similarObserverRef.current)
    }
    return () => observer.disconnect()
  }, [
    fetchNextPersonalized,
    hasNextPersonalized,
    isFetchingNextPersonalized,
    createObserverCallback,
  ])

  // 최신순 Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      createObserverCallback(fetchNextRecent, hasNextRecent, isFetchingNextRecent),
      { threshold: 0.1 },
    )
    if (recentObserverRef.current) {
      observer.observe(recentObserverRef.current)
    }
    return () => observer.disconnect()
  }, [fetchNextRecent, hasNextRecent, isFetchingNextRecent, createObserverCallback])

  const handleCardClick = (curationId: number) => {
    navigate(`/curation/detail/${curationId}`)
  }

  // 무한 스크롤 데이터 평탄화
  const similarCurations = personalizedData?.pages.flatMap((page) => page.content) || []
  const likeCurations = popularData?.pages.flatMap((page) => page.content) || []
  const recentCurations = recentData?.pages.flatMap((page) => page.content) || []

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
                  </>
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
                  <>
                    <CurationList curations={recentCurations} onCardClick={handleCardClick} />
                    <div ref={recentObserverRef} className='h-4' />
                    {isFetchingNextRecent && (
                      <div className='flex justify-center items-center py-4'>
                        <p className='text-muted-foreground'>더 불러오는 중...</p>
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
