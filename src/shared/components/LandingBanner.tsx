import { Button } from '@/shared/ui'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import bannerBg01 from '@/assets/images/banner_bg_01.png'
import bannerBg02 from '@/assets/images/banner_bg_02.jpeg'
import bannerBg03 from '@/assets/images/banner_bg_03.jpeg'
import bannerBg04 from '@/assets/images/banner_bg_04.jpeg'

const LandingBanner = () => {
  const navigate = useNavigate()
  const bannerImages = [bannerBg01, bannerBg02, bannerBg03, bannerBg04]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [bannerImages.length])

  const handleStartClick = () => {
    navigate('/register')
  }

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
      <div className='absolute inset-0 bg-black/30' />

      <div className='relative z-10 max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-20 pt-5 text-center'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 sm:mt-5 mb-6 sm:mb-8 lg:mb-10 drop-shadow-lg leading-tight'>
          블라인드 북, 나와 닮은 취향의 사람이 쓴 추천사로 고르는 책
        </h1>
        <p className='text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 lg:mb-10 max-w-3xl mx-auto leading-normal drop-shadow-md'>
          "책의 모든 정보를 가린 블라인드 북, 하지만 무작위가 아닙니다."
          <br />
          나와 닮은 취향을 가진 사람들이 남긴 추천사만을 통해 책을 선택합니다.
        </p>
        <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center'>
          <Button size='xl' onClick={handleStartClick}>
            북픽 시작하기
          </Button>
        </div>
      </div>
    </section>
  )
}

export default LandingBanner
