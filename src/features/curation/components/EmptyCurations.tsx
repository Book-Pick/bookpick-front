const EmptyCurations = () => {
  return (
    <div className='flex flex-col items-center justify-center mt-20 py-20'>
      <div className='text-center space-y-3'>
        <div className='text-6xl mb-4'>📚</div>
        <h3 className='text-2xl font-semibold text-foreground'>아직 추천사가 없습니다</h3>
        <p className='text-base text-muted-foreground'>첫 번째 추천사를 작성해보세요</p>
      </div>
    </div>
  )
}

export default EmptyCurations
