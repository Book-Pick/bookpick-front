import { Button } from '@/shared/ui'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import bannerBg01 from '@/assets/images/banner_bg_01.png'
import bannerBg02 from '@/assets/images/banner_bg_02.jpeg'
import bannerBg03 from '@/assets/images/banner_bg_03.jpeg'
import bannerBg04 from '@/assets/images/banner_bg_04.jpeg'
import { useAuth } from '@/app/providers'

const MainBanner = () => {
  const bannerImages = [bannerBg01, bannerBg02, bannerBg03, bannerBg04]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const navigate = useNavigate()
  const { isFirstLogin } = useAuth()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length)
    }, 8000) // 5초마다 변경

    return () => clearInterval(interval)
  }, [bannerImages.length])

  return (
    <section className='relative pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12 lg:pb-20 px-4 overflow-hidden'>
      {/* 배경 이미지들 */}
      {bannerImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-2000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: 'center 80%',
          }}
        />
      ))}
      {/* 오버레이 */}
      <div className='absolute inset-0 bg-black/20' />
      <div className='relative z-10 max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-20 pt-5'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 sm:mt-5 mb-6 sm:mb-8 lg:mb-10 drop-shadow-lg'>
          지금 내 마음에 꼭 맞는 책, 북픽에서
        </h1>
        <p className='text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 lg:mb-10 max-w-2xl leading-normal drop-shadow-md'>
          "당신에게 꼭 맞는 책, 북픽이 찾아드릴게요."<br></br>
          지금의 기분, 상황, 취향을 바탕으로 추천받는 독서 큐레이션
        </p>
        <div className='flex flex-col gap-2 sm:flex-row'>
          {isFirstLogin ? (
            <>
              <Button variant='secondary' size='lg' onClick={() => navigate('/onboarding')}>
                <span className='font-semibold text-sm sm:text-base'>독서취향 설정하기</span>
              </Button>
              <Button size='lg' onClick={() => navigate('/curation/create')} className='md:hidden'>
                <span className='font-semibold text-sm sm:text-base'>추천사 작성하기</span>
              </Button>
            </>
          ) : (
            <Button size='lg' onClick={() => navigate('/curation/create')} className='md:hidden'>
              <span className='font-semibold text-sm sm:text-base'>추천사 작성하기</span>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}

export default MainBanner
