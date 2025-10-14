import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui'

export default function OrderCompletePage() {
  const navigate = useNavigate()

  return (
    <div className='min-h-[calc(100vh-200px)] flex items-center justify-center py-12'>
      <div className='w-full max-w-2xl px-4'>
        <Card className='shadow-xl border-2'>
          <CardHeader className='text-center pb-4'>
            {/* 선물박스 일러스트 */}
            <div className='flex justify-center mb-6'>
              <div className='relative'>
                {/* 반짝임 효과 */}
                <div className='absolute -top-2 -right-2 animate-pulse'>
                  <span className='text-2xl'>✨</span>
                </div>
                <div className='absolute -bottom-2 -left-2 animate-pulse delay-75'>
                  <span className='text-2xl'>✨</span>
                </div>

                {/* 메인 일러스트 */}
                <div className='w-32 h-32 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden'>
                  {/* 배경 패턴 */}
                  <div className='absolute inset-0 bg-gradient-to-br from-purple-100/50 via-pink-100/50 to-blue-100/50 animate-pulse'></div>

                  {/* 선물 박스와 책 */}
                  <div className='relative z-10 flex flex-col items-center gap-1'>
                    <div className='text-5xl animate-bounce'>🎁</div>
                    {/* <div className='text-2xl -mt-2'>📚</div> */}
                  </div>
                </div>
              </div>
            </div>

            <CardTitle className='text-2xl sm:text-3xl mb-3'>구매가 완료되었습니다!</CardTitle>
            <CardDescription className='text-base sm:text-lg'>
              블라인드 북의 정보가 곧 이메일로 발송됩니다.
              <br />
              어떤 책일지 기대되지 않나요? 🎉
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-4 pt-6'>
            {/* 안내 메시지 */}
            <div className='bg-muted/50 rounded-lg p-4 space-y-2'>
              <p className='text-sm text-muted-foreground flex items-start gap-2'>
                <span className='text-lg shrink-0'>📧</span>
                <span>
                  <strong className='text-foreground'>이메일을 확인해주세요!</strong>
                  <br />책 제목, 저자, 구매 가능한 링크가 포함된 이메일이 발송됩니다.
                </span>
              </p>
              <p className='text-sm text-muted-foreground flex items-start gap-2'>
                <span className='text-lg shrink-0'>⏰</span>
                <span>이메일이 도착하지 않았다면 스팸함을 확인해보세요.</span>
              </p>
            </div>

            {/* 버튼 그룹 */}
            <div className='flex flex-col sm:flex-row gap-3 pt-4'>
              <Button
                variant='secondary'
                size='lg'
                className='flex-1'
                onClick={() => navigate('/')}
              >
                홈으로 돌아가기
              </Button>
              <Button
                variant='outline'
                size='lg'
                className='flex-1'
                onClick={() => navigate('/order/history')}
              >
                주문 내역 확인하기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
