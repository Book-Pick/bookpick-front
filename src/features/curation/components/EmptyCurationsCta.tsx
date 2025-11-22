import CurationCardSocial from '@/features/curation/components/CurationCardSocial'
import { mockCurations } from '@/features/curation/api/mockCurationApiData'
import { Button } from '@/shared/ui'
import { useNavigate } from 'react-router-dom'

const EmptyCurationsCta = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className='relative min-h-[500px] xs:min-h-[500px] mt-6 overflow-hidden rounded-2xl'>
        <div className='absolute inset-0 flex flex-col gap-4 xs:gap-6 p-4 xs:p-6 opacity-30 blur-[1px] pointer-events-none'>
          {/* mockup cards */}
          <div className='w-full max-w-sm mx-auto'>
            <CurationCardSocial
              id={mockCurations[0].id}
              similarity={mockCurations[0].similarity}
              title={mockCurations[0].title}
              description={mockCurations[0].description}
              curator={mockCurations[0].curator}
              likes={mockCurations[0].likes}
              comments={mockCurations[0].comments}
              views={mockCurations[0].views}
              tags={mockCurations[0].tags.join(', ')}
              thumbnailSrc={mockCurations[0].thumbnailImage || undefined}
              thumbnailColor={mockCurations[0].thumbnailColor}
            />
          </div>
        </div>

        {/* 반투명 오버레이와 컨텐츠 */}
        <div className='absolute inset-0 flex items-center justify-center backdrop-blur-[5px]'>
          <div className='flex flex-col items-center gap-5 xs:gap-7 px-6 xs:px-8 py-8 xs:py-12 max-w-md xs:max-w-2xl'>
            <div className='flex flex-col gap-2 xs:gap-3 text-center'>
              <h3 className='text-xl xs:text-[30px] font-semibold leading-tight xs:leading-[36px] text-primary'>
                아직 취향을 설정하지 않으셨네요.
              </h3>
              <p className='text-sm xs:text-xl font-medium leading-normal xs:leading-[24px] text-muted-foreground'>
                취향을 선택하시면,
                <br />
                당신과 잘 어울리는 추천사를 받아보실 수 있어요.
              </p>
            </div>
            <Button
              onClick={() => navigate('/mypage/profile')}
              variant='default'
              size='xl'
              className='w-full max-w-[300px] xs:max-w-[800px] text-lg xs:text-xl'
            >
              취향 설정하러 가기
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmptyCurationsCta
