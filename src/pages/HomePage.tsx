import MainBanner from '@/shared/components/MainBanner'
import CurationCardBasic from '@/features/curation/components/CurationCardBasic'
import CurationCardFull from '@/features/curation/components/CurationCardFull'
import CurationCardSocial from '@/features/curation/components/CurationCardSocial'
import { mockCurationData } from '@/data/mockCurationData'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui'
import { useNavigate } from 'react-router-dom'
import { ContentsLayout } from '@/app/layout'
import sampleImage01 from '@/assets/images/sample_image_01.jpeg'
import sampleImage02 from '@/assets/images/sample_image_02.jpeg'
import sampleImage03 from '@/assets/images/sample_image_03.jpeg'

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
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
                  {mockCurationData.slice(0, 6).map((curation, index) => {
                    const thumbnailImages = [sampleImage01, sampleImage02, sampleImage03]
                    return (
                      <CurationCardSocial
                        key={curation.id}
                        similarity={curation.similarity}
                        title={curation.title}
                        description={curation.description}
                        curator={curation.curator}
                        likes={curation.likes}
                        comments={curation.comments}
                        views={curation.views}
                        tags={curation.tags}
                        thumbnailSrc={index < 3 ? thumbnailImages[index] : undefined}
                        onClick={() => handleCardClick(curation.id)}
                      />
                    )
                  })}
                </div>
              </TabsContent>
              <TabsContent value='like'>
                <div className='flex flex-col gap-10 mt-6'>
                  {mockCurationData.slice(0, 4).map((curation, index) => {
                    const thumbnailImages = [sampleImage01, sampleImage02, sampleImage03]
                    return (
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
                        thumbnailSrc={index < 3 ? thumbnailImages[index] : undefined}
                        onClick={() => handleCardClick(curation.id)}
                      />
                    )
                  })}
                </div>
              </TabsContent>
              <TabsContent value='recent'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
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
            </Tabs>
          </div>
        </section>
      </ContentsLayout>
    </div>
  )
}
