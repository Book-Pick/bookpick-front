import { Button } from '@/shared/ui'
import CurationCardSocial from '@/features/curation/components/CurationCardSocial'
import { mockCurationData } from '@/data/mockCurationData'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()
  const previewCurations = mockCurationData.slice(0, 3)

  const handleStartClick = () => {
    navigate('/register')
  }

  const handleCardClick = () => {
    navigate('/register')
  }

  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section
        className='relative min-h-[500px] flex flex-col justify-center bg-cover bg-center bg-no-repeat px-4 sm:px-10 lg:px-20 pb-[165px] pt-24'
        style={{
          backgroundImage: `url(/images/hero-section-bg.jpg)`,
        }}
      >
        {/* Hero Content */}
        <div className='flex flex-col items-center justify-center gap-10 flex-1 mt-[86px]'>
          <h1
            className='text-2xl sm:text-3xl lg:text-[30px] font-semibold text-white text-center leading-tight tracking-wide max-w-4xl'
            style={{ wordBreak: 'keep-all' }}
          >
            블라인드 북, 나와 닮은 취향의 사람이 쓴 추천사로 고르는 책
          </h1>
          <Button onClick={handleStartClick} variant='point' size='xl' className='rounded-full'>
            북픽 시작하기
          </Button>
        </div>
      </section>

      <section className='bg-white py-[70px] px-4 sm:px-10 lg:px-[100px]'>
        <h2 className='text-2xl sm:text-3xl lg:text-[34px] font-semibold mb-5 text-center lg:text-left'>
          이렇게 이용해요
        </h2>
        <div className='flex flex-col md:flex-row items-center justify-center gap-[52px] py-[50px]'>
          {/* 독자 발견 */}
          <div className='flex flex-col items-center gap-6 w-[154px]'>
            <div className='w-[120px] h-[120px] rounded-[20px] overflow-hidden'>
              <img
                src='/images/how-it-works-1.png'
                alt='독자 발견'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='text-center px-[10px] py-[10px]'>
              <h3 className='text-2xl font-semibold whitespace-nowrap'>독자 발견</h3>
            </div>
          </div>

          <div className='hidden lg:flex items-center w-[300px] h-[120px]'>
            <img
              src='/images/how-it-works-connect-line.svg'
              alt='연결선'
              className='w-full h-full object-contain'
            />
          </div>

          <div className='flex flex-col items-center gap-6 w-[154px]'>
            <div className='w-[120px] h-[120px] rounded-[20px] overflow-hidden'>
              <img
                src='/images/how-it-works-2.jpg'
                alt='감상으로 선택'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='text-center px-[10px] py-[10px]'>
              <h3 className='text-2xl font-semibold whitespace-nowrap'>감상으로 선택</h3>
            </div>
          </div>

          <div className='hidden lg:flex items-center w-[300px] h-[120px]'>
            <img
              src='/images/how-it-works-connect-line.svg'
              alt='연결선'
              className='w-full h-full object-contain'
            />
          </div>

          {/* 책 선물 */}
          <div className='flex flex-col items-center gap-6 w-[154px]'>
            <div className='w-[120px] h-[120px] rounded-[20px] overflow-hidden'>
              <img
                src='/images/how-it-works-3.jpg'
                alt='책 선물'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='text-center px-[10px] py-[10px]'>
              <h3 className='text-2xl font-semibold whitespace-nowrap'>책 선물</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 가치 소개 Section */}
      <section className='bg-white py-[70px] px-4 sm:px-10 lg:px-[100px] pb-[120px]'>
        <div className='flex flex-col gap-[60px]'>
          <h2 className='text-2xl sm:text-3xl lg:text-[34px] font-semibold text-[#262628] text-center lg:text-left'>
            핵심 가치 소개
          </h2>
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-[30px]'>
            {/* 나를 닮은 한 권 */}
            <div className='bg-white border-[3px] border-[#E85660] rounded-xl p-[30px] flex flex-col justify-between gap-[60px] min-h-[200px]'>
              <h3 className='text-2xl font-semibold text-black'>나를 닮은 한 권</h3>
              <p className='text-sm  font-medium text-black leading-relaxed'>
                한 권 한 권, 당신의 스타일에 맞춘 추천사을 받아보세요.
              </p>
            </div>

            {/* 매일 도착하는 책 편지 */}
            <div className='bg-white border-[3px] border-[#F9CC4C] rounded-xl p-[30px] flex flex-col justify-between gap-[60px] min-h-[200px]'>
              <h3 className='text-2xl font-semibold text-black'>매일 도착하는 책 편지</h3>
              <p className='text-sm font-medium text-black leading-relaxed'>
                책을 고를 걱정 없이, 좋은 책을 자연스럽게 만나는 방법.
              </p>
            </div>

            {/* 지금, 모두가 읽는 그 책 */}
            <div className='bg-white border-[3px] border-[#48C4E0] rounded-xl p-[30px] flex flex-col justify-between gap-[60px] min-h-[200px]'>
              <h3 className='text-2xl font-semibold text-black w-[227.5px]'>
                지금, 모두가 읽는 그 책
              </h3>
              <p className='text-sm font-medium text-black leading-relaxed'>
                실시간 인기순/최신순으로 누구나 볼 수 있는 열린 서재.
              </p>
            </div>

            {/* 로그인하면 더 가까워져요 */}
            <div className='bg-white border-[3px] border-[#A891E9] rounded-xl p-[30px] flex flex-col justify-between gap-[60px] min-h-[200px]'>
              <h3 className='text-2xl font-semibold text-black'>로그인하면 더 가까워져요</h3>
              <p className='text-sm font-medium text-black leading-relaxed'>
                당신만의 책장과 북픽 맞춤 추천을 만나보세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 추천사 미리보기 Section */}
      <section className='bg-white py-[70px] px-4 sm:px-10 lg:px-[100px] pb-[130px]'>
        <div className='flex flex-col items-center gap-[38px]'>
          <div className='w-full flex flex-col gap-10'>
            <h2 className='text-2xl sm:text-3xl lg:text-[34px] font-semibold text-[#333333] text-center lg:text-left'>
              추천사 미리보기
            </h2>
            <div className='flex flex-col lg:flex-row items-center justify-center gap-[38px]'>
              {previewCurations.map((curation) => (
                <div key={curation.id} className='w-full lg:w-[400px]'>
                  <CurationCardSocial
                    id={curation.id}
                    similarity={curation.similarity}
                    title={curation.title}
                    description={curation.description}
                    curator={curation.curator}
                    curatorBio={curation.curatorBio}
                    likes={curation.likes}
                    comments={curation.comments}
                    views={curation.views}
                    tags={curation.tags.join(', ')}
                    thumbnailSrc={curation.thumbnailImage}
                    onClick={handleCardClick}
                    className='h-full'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-white py-22 mb-40 px-4 sm:px-10 lg:px-20'>
        <div className='flex flex-col items-center justify-center gap-[50px]'>
          <h2 className='text-2xl sm:text-3xl lg:text-[34px] font-semibold text-[#262628] text-center'>
            당신의 맞춤 추천사 북픽 시금 시작하세요
          </h2>
          <Button onClick={handleStartClick} variant='point' size='xl' className='rounded-full'>
            북픽 시작하기
          </Button>
        </div>
      </section>
    </div>
  )
}
