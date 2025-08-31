import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription,
  CardTitle,
} from '@/shared/ui'
import { Heart, MessageSquare } from 'lucide-react'

export default function HomePage() {
  return (
    <div className='min-h-screen bg-background'>
      {/* 메인 배너 섹션 */}
      <section className='bg-gradient-to-br from-primary/10 via-background to-secondary/5 py-20 px-4'>
        <div className='max-w-[1200px] mx-auto'>
          <h1 className='text-4xl md:text-6xl font-bold text-foreground mt-5 mb-20'>
            지금 딱 읽고싶은 책, 북픽에서
          </h1>
          <p className='text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl'>
            "당신에게 꼭 맞는 책, 북픽이 찾아드릴게요."<br></br>
            지금의 기분, 상황, 취향을 바탕으로 추천받는 독서 큐레이션
          </p>
          <div className='flex flex-col sm:flex-row gap-4'>
            <Button size='xl'>지금 시작하기</Button>
            <Button size='xl' variant='outline'>
              큐레이션 설정
            </Button>
          </div>
        </div>
      </section>

      {/* 메인 컨텐츠 영역 */}
      <main className='max-w-[1200px] mx-auto px-4 py-16'>
        {/* 탭 레이아웃 */}
        <section className='mb-16'>
          <div className='flex justify-between items-center mb-8'>
            <h2 className='text-2xl md:text-3xl font-bold text-foreground'>
              내 취향에 맞는 큐레이션
            </h2>
          </div>
          <div className='flex w-full flex-col gap-6'>
            <Tabs defaultValue='similar'>
              <TabsList>
                <TabsTrigger value='similar'>내 취향 유사도순</TabsTrigger>
                <TabsTrigger value='like'>인기순</TabsTrigger>
                <TabsTrigger value='recent'>최신순</TabsTrigger>
              </TabsList>
              <TabsContent value='similar'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                  {/* 큐레이션 카드 1 */}
                  <Card className='bg-neutral-100 border-0'>
                    <CardHeader>
                      <CardDescription className='text-xs text-neutral-900 font-medium'>
                        취향 유사도 95%
                      </CardDescription>
                      <CardTitle className='text-lg font-medium'>
                        일상에서 발견하는 철학적 순간들
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm font-normal'>
                        우리가 무심코 지나치는 하루의 조각들 속에 얼마나 많은 질문과 해답이
                        숨어있는지 생각해보신 적 있으신가요?
                      </p>
                    </CardContent>
                    <CardFooter className='mt-4'>
                      <div className='w-full flex justify-between items-center'>
                        <div className='text-sm text-neutral-800 font-medium'>
                          by 사유하는 직장인
                        </div>
                        <div className='flex gap-2'>
                          <div className='flex gap-1 items-center'>
                            <Heart size={16} className='size-3' />
                            <span className='text-sm font-medium'>24</span>
                          </div>
                          <div className='flex gap-1 items-center'>
                            <MessageSquare size={16} className='size-3' />
                            <span className='text-sm font-medium'>8</span>
                          </div>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>

                  {/* 큐레이션 카드 2 */}
                  <Card className='bg-neutral-100 border-0'>
                    <CardHeader>
                      <CardDescription className='text-xs text-neutral-900 font-medium'>
                        취향 유사도 92%
                      </CardDescription>
                      <CardTitle className='text-lg font-medium'>
                        마음을 따뜻하게 하는 힐링 에세이
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm font-normal'>
                        지친 마음에 위로가 되는 따뜻한 글들을 모았습니다. 일상의 소소한 행복을
                        찾아가는 여정을 함께해요.
                      </p>
                    </CardContent>
                    <CardFooter className='mt-4'>
                      <div className='w-full flex justify-between items-center'>
                        <div className='text-sm text-neutral-800 font-medium'>by 감성큐레이터</div>
                        <div className='flex gap-2'>
                          <div className='flex gap-1 items-center'>
                            <Heart size={16} className='size-3' />
                            <span className='text-sm font-medium'>18</span>
                          </div>
                          <div className='flex gap-1 items-center'>
                            <MessageSquare size={16} className='size-3' />
                            <span className='text-sm font-medium'>5</span>
                          </div>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>

                  {/* 큐레이션 카드 3 */}
                  <Card className='bg-neutral-100 border-0'>
                    <CardHeader>
                      <CardDescription className='text-xs text-neutral-900 font-medium'>
                        취향 유사도 89%
                      </CardDescription>
                      <CardTitle className='text-lg font-medium'>
                        성장하는 나를 위한 자기계발서
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm font-normal'>
                        더 나은 내일의 나를 만들어가는 실용적인 책들을 선별했습니다. 작은 변화가
                        만드는 큰 성장을 경험해보세요.
                      </p>
                    </CardContent>
                    <CardFooter className='mt-4'>
                      <div className='w-full flex justify-between items-center'>
                        <div className='text-sm text-neutral-800 font-medium'>by 성장멘토</div>
                        <div className='flex gap-2'>
                          <div className='flex gap-1 items-center'>
                            <Heart size={16} className='size-3' />
                            <span className='text-sm font-medium'>31</span>
                          </div>
                          <div className='flex gap-1 items-center'>
                            <MessageSquare size={16} className='size-3' />
                            <span className='text-sm font-medium'>12</span>
                          </div>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>

                  {/* 큐레이션 카드 4 */}
                  <Card className='bg-neutral-100 border-0'>
                    <CardHeader>
                      <CardDescription className='text-xs text-neutral-900 font-medium'>
                        취향 유사도 87%
                      </CardDescription>
                      <CardTitle className='text-lg font-medium'>
                        몰입도 높은 추리 소설 컬렉션
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm font-normal'>
                        마지막 페이지까지 손을 뗄 수 없는 스릴 넘치는 추리 소설들을 엄선해서
                        모았습니다. 밤샘 각오하세요!
                      </p>
                    </CardContent>
                    <CardFooter className='mt-4'>
                      <div className='w-full flex justify-between items-center'>
                        <div className='text-sm text-neutral-800 font-medium'>by 미스터리헌터</div>
                        <div className='flex gap-2'>
                          <div className='flex gap-1 items-center'>
                            <Heart size={16} className='size-3' />
                            <span className='text-sm font-medium'>27</span>
                          </div>
                          <div className='flex gap-1 items-center'>
                            <MessageSquare size={16} className='size-3' />
                            <span className='text-sm font-medium'>9</span>
                          </div>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>

                  {/* 큐레이션 카드 5 */}
                  <Card className='bg-neutral-100 border-0'>
                    <CardHeader>
                      <CardDescription className='text-xs text-neutral-900 font-medium'>
                        취향 유사도 85%
                      </CardDescription>
                      <CardTitle className='text-lg font-medium'>과학으로 세상 보기</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm font-normal'>
                        복잡해 보이는 과학을 쉽고 재미있게 설명하는 책들을 모았습니다. 호기심 많은
                        당신을 위한 특별한 선택!
                      </p>
                    </CardContent>
                    <CardFooter className='mt-4'>
                      <div className='w-full flex justify-between items-center'>
                        <div className='text-sm text-neutral-800 font-medium'>by 과학탐험가</div>
                        <div className='flex gap-2'>
                          <div className='flex gap-1 items-center'>
                            <Heart size={16} className='size-3' />
                            <span className='text-sm font-medium'>15</span>
                          </div>
                          <div className='flex gap-1 items-center'>
                            <MessageSquare size={16} className='size-3' />
                            <span className='text-sm font-medium'>6</span>
                          </div>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>

                  {/* 큐레이션 카드 6 */}
                  <Card className='bg-neutral-100 border-0'>
                    <CardHeader>
                      <CardDescription className='text-xs text-neutral-900 font-medium'>
                        취향 유사도 83%
                      </CardDescription>
                      <CardTitle className='text-lg font-medium'>역사 속 숨겨진 이야기들</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm font-normal'>
                        교과서에서 배우지 못한 흥미진진한 역사 이야기들을 발견해보세요. 과거가
                        현재와 연결되는 순간을 경험할 수 있습니다.
                      </p>
                    </CardContent>
                    <CardFooter className='mt-4'>
                      <div className='w-full flex justify-between items-center'>
                        <div className='text-sm text-neutral-800 font-medium'>by 역사탐구</div>
                        <div className='flex gap-2'>
                          <div className='flex gap-1 items-center'>
                            <Heart size={16} className='size-3' />
                            <span className='text-sm font-medium'>21</span>
                          </div>
                          <div className='flex gap-1 items-center'>
                            <MessageSquare size={16} className='size-3' />
                            <span className='text-sm font-medium'>7</span>
                          </div>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>

                  {/* 큐레이션 카드 7 */}
                  <Card className='bg-neutral-100 border-0'>
                    <CardHeader>
                      <CardDescription className='text-xs text-neutral-900 font-medium'>
                        취향 유사도 81%
                      </CardDescription>
                      <CardTitle className='text-lg font-medium'>여행이 주는 특별한 감동</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm font-normal'>
                        세계 곳곳의 아름다운 풍경과 문화를 책으로 만나보세요. 집에서도 떠날 수 있는
                        마음의 여행을 선사합니다.
                      </p>
                    </CardContent>
                    <CardFooter className='mt-4'>
                      <div className='w-full flex justify-between items-center'>
                        <div className='text-sm text-neutral-800 font-medium'>by 여행작가</div>
                        <div className='flex gap-2'>
                          <div className='flex gap-1 items-center'>
                            <Heart size={16} className='size-3' />
                            <span className='text-sm font-medium'>19</span>
                          </div>
                          <div className='flex gap-1 items-center'>
                            <MessageSquare size={16} className='size-3' />
                            <span className='text-sm font-medium'>4</span>
                          </div>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>

                  {/* 큐레이션 카드 8 */}
                  <Card className='bg-neutral-100 border-0'>
                    <CardHeader>
                      <CardDescription className='text-xs text-neutral-900 font-medium'>
                        취향 유사도 79%
                      </CardDescription>
                      <CardTitle className='text-lg font-medium'>창작의 영감을 찾아서</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm font-normal'>
                        창의력과 상상력을 자극하는 책들을 엄선했습니다. 새로운 아이디어가 필요한
                        순간, 이 책들이 도움이 될 거예요.
                      </p>
                    </CardContent>
                    <CardFooter className='mt-4'>
                      <div className='w-full flex justify-between items-center'>
                        <div className='text-sm text-neutral-800 font-medium'>by 창작멘토</div>
                        <div className='flex gap-2'>
                          <div className='flex gap-1 items-center'>
                            <Heart size={16} className='size-3' />
                            <span className='text-sm font-medium'>13</span>
                          </div>
                          <div className='flex gap-1 items-center'>
                            <MessageSquare size={16} className='size-3' />
                            <span className='text-sm font-medium'>3</span>
                          </div>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value='like'></TabsContent>
              <TabsContent value='recent'></TabsContent>
            </Tabs>
          </div>
        </section>
        {/* 인기 큐레이션 섹션 */}
        {/* <section className='mb-16'>
          <div className='flex justify-between items-center mb-8'>
            <h2 className='text-2xl md:text-3xl font-bold text-foreground'>인기 큐레이션</h2>
            <button className='text-primary font-medium hover:underline'>전체보기</button>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='bg-card border border-border rounded-lg p-6 h-48 flex items-center justify-center'>
              <span className='text-muted-foreground'>큐레이션 카드 #1</span>
            </div>
            <div className='bg-card border border-border rounded-lg p-6 h-48 flex items-center justify-center'>
              <span className='text-muted-foreground'>큐레이션 카드 #2</span>
            </div>
            <div className='bg-card border border-border rounded-lg p-6 h-48 flex items-center justify-center'>
              <span className='text-muted-foreground'>큐레이션 카드 #3</span>
            </div>
          </div>
        </section> */}

        {/* 추천 큐레이터 섹션 */}
        {/* <section className='mb-16'>
          <div className='flex justify-between items-center mb-8'>
            <h2 className='text-2xl md:text-3xl font-bold text-foreground'>추천 큐레이터</h2>
            <button className='text-primary font-medium hover:underline'>전체보기</button>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            <div className='bg-card border border-border rounded-lg p-6 text-center'>
              <div className='w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center'>
                <span className='text-sm font-medium'>큐레이터</span>
              </div>
              <h3 className='font-semibold text-foreground mb-2'>감성큐레이터</h3>
              <p className='text-sm text-muted-foreground mb-4'>에세이, 심리 전문</p>
              <button className='w-full py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors'>
                팔로우
              </button>
            </div>
            <div className='bg-card border border-border rounded-lg p-6 text-center'>
              <div className='w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center'>
                <span className='text-sm font-medium'>큐레이터</span>
              </div>
              <h3 className='font-semibold text-foreground mb-2'>북마니아</h3>
              <p className='text-sm text-muted-foreground mb-4'>소설, 문학 전문</p>
              <button className='w-full py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors'>
                팔로우
              </button>
            </div>
            <div className='bg-card border border-border rounded-lg p-6 text-center'>
              <div className='w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center'>
                <span className='text-sm font-medium'>큐레이터</span>
              </div>
              <h3 className='font-semibold text-foreground mb-2'>비즈니스읽기</h3>
              <p className='text-sm text-muted-foreground mb-4'>경영, 자기계발 전문</p>
              <button className='w-full py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors'>
                팔로우
              </button>
            </div>
            <div className='bg-card border border-border rounded-lg p-6 text-center'>
              <div className='w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center'>
                <span className='text-sm font-medium'>큐레이터</span>
              </div>
              <h3 className='font-semibold text-foreground mb-2'>과학탐험가</h3>
              <p className='text-sm text-muted-foreground mb-4'>과학, 기술 전문</p>
              <button className='w-full py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors'>
                팔로우
              </button>
            </div>
          </div>
        </section> */}

        {/* 최신 소식 섹션 */}
        {/* <section>
          <div className='flex justify-between items-center mb-8'>
            <h2 className='text-2xl md:text-3xl font-bold text-foreground'>최신 소식</h2>
            <button className='text-primary font-medium hover:underline'>전체보기</button>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <div className='bg-card border border-border rounded-lg overflow-hidden'>
              <div className='h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center'>
                <span className='text-muted-foreground'>뉴스 이미지</span>
              </div>
              <div className='p-6'>
                <h3 className='font-semibold text-foreground mb-2'>
                  2024년 최고의 베스트셀러 큐레이션이 출시되었습니다
                </h3>
                <p className='text-sm text-muted-foreground mb-4'>
                  올해 가장 주목받은 도서들을 엄선하여 큐레이션했습니다. 다양한 장르별로 만나보세요.
                </p>
                <span className='text-xs text-muted-foreground'>2024.01.15</span>
              </div>
            </div>
            <div className='bg-card border border-border rounded-lg overflow-hidden'>
              <div className='h-48 bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center'>
                <span className='text-muted-foreground'>뉴스 이미지</span>
              </div>
              <div className='p-6'>
                <h3 className='font-semibold text-foreground mb-2'>
                  AI 큐레이션 시스템 업데이트 소식
                </h3>
                <p className='text-sm text-muted-foreground mb-4'>
                  더욱 정확한 취향 분석과 개인화된 추천을 위한 AI 시스템이 업데이트되었습니다.
                </p>
                <span className='text-xs text-muted-foreground'>2024.01.10</span>
              </div>
            </div>
          </div>
        </section> */}
      </main>
    </div>
  )
}
