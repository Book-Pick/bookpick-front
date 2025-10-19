import MainBanner from '@/shared/components/MainBanner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui'
import { useNavigate } from 'react-router-dom'
import { ContentsLayout } from '@/app/layout'
import CurationList from '@/features/curation/components/CurationList'
import { useCuration } from '@/features/curation/hooks/useCuration'

export default function HomePage() {
  const navigate = useNavigate()
  const { useGetPersonalizedCurations, useGetPopularCurations, useGetRecentCurations } =
    useCuration()

  // API 호출
  const { data: personalizedData, isLoading: isLoadingPersonalized } = useGetPersonalizedCurations(
    1,
    6,
  )
  const { data: popularData, isLoading: isLoadingPopular } = useGetPopularCurations(1, 6)
  const { data: recentData, isLoading: isLoadingRecent } = useGetRecentCurations(1, 6)

  const handleCardClick = (curationId: number) => {
    navigate(`/curation/detail/${curationId}`)
  }

  const similarCurations = personalizedData?.curations || []
  const likeCurations = popularData?.curations || []
  const recentCurations = recentData?.curations || []

  return (
    <div className='min-h-screen bg-background'>
      {/* 메인 배너 섹션 */}
      <MainBanner />
      {/* 메인 컨텐츠 영역 */}
      <ContentsLayout>
        <section className='mb-16'>
          <div className='flex justify-between items-center mb-8'>
            <h2 className='font-title font-bold text-foreground'>내 취향에 맞는 큐레이션</h2>
          </div>
          <div className='flex w-full flex-col gap-6'>
            <Tabs defaultValue='similar'>
              <TabsList>
                <TabsTrigger value='similar' size='lg'>
                  내 취향 유사도순
                </TabsTrigger>
                <TabsTrigger value='like' size='lg'>
                  인기순
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
                  <div className='flex flex-col gap-6 mt-6'>
                    <div className='flex flex-col gap-2'>
                      <h3 className='font-title font-bold text-foreground'>큐레이션이 없습니다.</h3>
                    </div>
                  </div>
                )}
              </TabsContent>
              <TabsContent value='like'>
                {isLoadingPopular ? (
                  <div className='flex justify-center items-center mt-6 py-20'>
                    <p className='text-muted-foreground'>로딩 중...</p>
                  </div>
                ) : likeCurations?.length > 0 ? (
                  <CurationList curations={likeCurations} onCardClick={handleCardClick} />
                ) : (
                  <div className='flex flex-col gap-6 mt-6'>
                    <div className='flex flex-col gap-2'>
                      <h3 className='font-title font-bold text-foreground'>큐레이션이 없습니다.</h3>
                    </div>
                  </div>
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
                  <div className='flex flex-col gap-6 mt-6'>
                    <div className='flex flex-col gap-2'>
                      <h3 className='font-title font-bold text-foreground'>큐레이션이 없습니다.</h3>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </ContentsLayout>
    </div>
  )
}
