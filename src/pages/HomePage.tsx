import MainBanner from '@/shared/components/MainBanner'
import CurationCardBasic from '@/features/curation/components/CurationCardBasic'
import CurationCardFull from '@/features/curation/components/CurationCardFull'
import { mockCurationData } from '@/data/mockCurationData'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()

  const handleCardClick = (curationId: number) => {
    navigate(`/curation/detail/${curationId}`)
  }

  return (
    <div className='min-h-screen bg-background'>
      {/* 메인 배너 섹션 */}
      <MainBanner />
      {/* 메인 컨텐츠 영역 */}
      <main className='max-w-[1440px] mx-auto px-4 py-16'>
        <section className='mb-16'>
          <div className='flex justify-between items-center mb-8'>
            <h2 className='text-2xl md:text-4xl font-bold text-foreground'>
              내 취향에 맞는 큐레이션
            </h2>
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
                <TabsTrigger value='recent' size='lg'>
                  거리순
                </TabsTrigger>
                <TabsTrigger value='recent' size='lg'>
                  책방 사장님 추천사 모아보기
                </TabsTrigger>
                <TabsTrigger value='recent' size='lg'>
                  소설 추천사 모음(내꺼)
                </TabsTrigger>
              </TabsList>
              <TabsContent value='similar'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 px-4'>
                  {mockCurationData.map((curation) => (
                    <CurationCardBasic
                      key={curation.id}
                      similarity={curation.similarity}
                      title={curation.title}
                      description={curation.description}
                      curator={curation.curator}
                      likes={curation.likes}
                      comments={curation.comments}
                      onClick={() => handleCardClick(curation.id)}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value='like'>
                <div className='flex flex-col gap-10 mt-6 px-4'>
                  {mockCurationData.slice(0, 4).map((curation) => (
                    <CurationCardFull
                      key={curation.id}
                      similarity={curation.similarity}
                      title={curation.title}
                      description={curation.description}
                      curator={curation.curator}
                      likes={curation.likes}
                      comments={curation.comments}
                      views={curation.views}
                      date={curation.date}
                      tags={curation.tags}
                      onClick={() => handleCardClick(curation.id)}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value='recent'></TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    </div>
  )
}
