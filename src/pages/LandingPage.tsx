import LandingBanner from '@/shared/components/LandingBanner'
import CurationCardSocial from '@/features/curation/components/CurationCardSocial'
import { mockCurationData } from '@/data/mockCurationData'

export default function LandingPage() {
  // 랜덤 추천사 하나 선택
  const randomCuration = mockCurationData[Math.floor(Math.random() * mockCurationData.length)]

  return (
    <div className='min-h-screen'>
      {/* 메인 배너 */}
      <LandingBanner />

      {/* How it works 섹션 */}
      <section className='py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-background via-muted/20 to-background'>
        <div className='max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-20'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-16 sm:mb-20'>
            이렇게 시작해요
          </h2>

          {/* 3단계 플로우 */}
          <div className='relative'>
            {/* 물결 연결선 (데스크톱에서만 표시) */}
            <div className='hidden lg:block absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-0'>
              <svg width='100%' height='20' viewBox='0 0 1000 20' className='overflow-visible'>
                <path
                  d='M 0,10 Q 250,2 500,10 T 1000,10'
                  stroke='url(#waveGradient)'
                  strokeWidth='2'
                  fill='none'
                  className='drop-shadow-sm'
                />
                <defs>
                  <linearGradient id='waveGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                    <stop offset='0%' stopColor='rgb(59 130 246 / 0.4)' />
                    <stop offset='50%' stopColor='rgb(147 51 234 / 0.6)' />
                    <stop offset='100%' stopColor='rgb(34 197 94 / 0.4)' />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative z-10'>
              {/* 1단계: 독자 발견 */}
              <div className='text-center group'>
                <div className='relative mb-6'>
                  {/* 일러스트 배경 */}
                  <div className='w-32 h-32 mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105'>
                    <div className='w-24 h-24 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full flex items-center justify-center'>
                      <span className='text-4xl'>🔍</span>
                    </div>
                  </div>
                </div>
                <h3 className='text-xl font-bold mb-3 text-foreground'>독자 발견</h3>
                <p className='text-muted-foreground leading-relaxed'>
                  당신과 비슷한 독서 취향을 가진
                  <br />
                  <span className='text-primary font-medium'>진짜 독자</span>들을 찾아드려요
                </p>
              </div>

              {/* 2단계: 감상으로 선택 */}
              <div className='text-center group'>
                <div className='relative mb-6'>
                  {/* 일러스트 배경 */}
                  <div className='w-32 h-32 mx-auto bg-gradient-to-br from-purple-50 to-pink-100 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105'>
                    <div className='w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full flex items-center justify-center'>
                      <span className='text-4xl'>💭</span>
                    </div>
                  </div>
                </div>
                <h3 className='text-xl font-bold mb-3 text-foreground'>감상으로 선택</h3>
                <p className='text-muted-foreground leading-relaxed'>
                  책 정보는 숨기고
                  <br />
                  <span className='text-primary font-medium'>진짜 감상</span>만으로 선택하세요
                </p>
              </div>

              {/* 3단계: 책 선물 */}
              <div className='text-center group'>
                <div className='relative mb-6'>
                  {/* 일러스트 배경 */}
                  <div className='w-32 h-32 mx-auto bg-gradient-to-br from-green-50 to-emerald-100 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105'>
                    <div className='w-24 h-24 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full flex items-center justify-center'>
                      <span className='text-4xl'>🎁</span>
                    </div>
                  </div>
                </div>
                <h3 className='text-xl font-bold mb-3 text-foreground'>책 선물</h3>
                <p className='text-muted-foreground leading-relaxed'>
                  당신만을 위한
                  <br />
                  <span className='text-primary font-medium'>특별한 책</span>이 도착해요
                </p>
              </div>
            </div>
          </div>

          {/* 하단 메시지 */}
          <div className='text-center mt-16'>
            <p className='text-lg text-muted-foreground italic'>
              "무작위가 아닌, <span className='text-primary font-medium'>당신을 위한</span> 책 선택"
            </p>
          </div>
        </div>
      </section>

      {/* 핵심 가치 섹션 */}
      <section className='py-16 sm:py-20 lg:py-24 bg-muted/30'>
        <div className='max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-20'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12 sm:mb-16'>
            북픽이 특별한 이유
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
            {/* 나를 닮은 한권 - 빨간색 */}
            <div className='bg-white rounded-xl p-6 shadow-lg border-2 border-red-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl group'>
              <div className='w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors duration-300'>
                <span className='text-2xl'>📖</span>
              </div>
              <h3 className='text-lg font-bold mb-3 text-gray-800'>나를 닮은 한권</h3>
              <p className='text-gray-600 text-sm leading-relaxed'>
                한 권 한 권, 당신의 스타일에 맞춘 추천사를 받아보세요.
              </p>
            </div>

            {/* 매일 도착하는 책 편지 - 노란색 */}
            <div className='bg-white rounded-xl p-6 shadow-lg border-2 border-yellow-200 hover:border-yellow-300 transition-all duration-300 hover:shadow-xl group'>
              <div className='w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-100 transition-colors duration-300'>
                <span className='text-2xl'>📬</span>
              </div>
              <h3 className='text-lg font-bold mb-3 text-gray-800'>매일 도착하는 책 편지</h3>
              <p className='text-gray-600 text-sm leading-relaxed'>
                책을 고를 걱정 없이, 좋은 책을 자연스럽게 만나는 방법.
              </p>
            </div>

            {/* 지금, 모두가 읽는 그 책 - 민트색 */}
            <div className='bg-white rounded-xl p-6 shadow-lg border-2 border-emerald-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl group'>
              <div className='w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors duration-300'>
                <span className='text-2xl'>🔥</span>
              </div>
              <h3 className='text-lg font-bold mb-3 text-gray-800'>지금, 모두가 읽는 그 책</h3>
              <p className='text-gray-600 text-sm leading-relaxed'>
                실시간 일기순/최신순으로 누구나 볼 수 있는 열린 서재
              </p>
            </div>

            {/* 로그인하면 더 가까워져요 - 보라색 */}
            <div className='bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200 hover:border-purple-300 transition-all duration-300 hover:shadow-xl group'>
              <div className='w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors duration-300'>
                <span className='text-2xl'>✨</span>
              </div>
              <h3 className='text-lg font-bold mb-3 text-gray-800'>로그인하면 더 가까워져요</h3>
              <p className='text-gray-600 text-sm leading-relaxed'>
                당신만의 책장과 북픽 맞춤 추천을 만나보세요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 추천사 미리보기 섹션 */}
      <section className='py-16 sm:py-20 lg:py-24 bg-background'>
        <div className='max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-20'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12 sm:mb-16'>
            이런 추천사가 기다려요
          </h2>
          <div className='max-w-2xl mx-auto'>
            <CurationCardSocial
              similarity={randomCuration.similarity}
              title={randomCuration.title}
              description={randomCuration.description}
              curator={randomCuration.curator}
              likes={randomCuration.likes}
              comments={randomCuration.comments}
              views={randomCuration.views}
              tags={randomCuration.tags.join(', ')}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
