import { Button } from '@/shared/ui'

const MainBanner = () => {
  return (
    <section className='bg-gradient-to-br from-primary/10 via-background to-secondary/5 py-8 sm:py-12 lg:py-20 px-4'>
      <div className='max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-20'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 sm:mt-5 mb-6 sm:mb-8 lg:mb-10'>
          지금 내 마음에 꼭 맞는 책, 북픽에서
        </h1>
        <p className='text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 lg:mb-10 max-w-2xl leading-normal'>
          "당신에게 꼭 맞는 책, 북픽이 찾아드릴게요."<br></br>
          지금의 기분, 상황, 취향을 바탕으로 추천받는 독서 큐레이션
        </p>
        <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
          <Button variant='secondary' size='default' className='sm:size-lg'>
            <span className='font-semibold text-sm sm:text-base'>지금 시작하기</span>
          </Button>
          <Button size='default' className='sm:size-lg'>
            <span className='font-semibold text-sm sm:text-base'>독서취향 설정하기</span>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default MainBanner
