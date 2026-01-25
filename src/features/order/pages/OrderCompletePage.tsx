import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui'
import CurationThumbnail from '@/features/curation/components/CurationThumbnail'

// Mock 주문 데이터
const mockOrderData = {
  orderNumber: 'ORD-2025-10-19-001234',
  orderDate: '2025.10.19 14:30',
  totalAmount: 5000,
  curation: {
    id: 1,
    title: '마음이 지친 당신에게 추천하는 위로의 책',
    thumbnailImage: null,
    thumbnailColor: '#FFE5E5',
  },
  curator: {
    name: '김큐레이터',
    id: 101,
  },
}

export default function OrderCompletePage() {
  const navigate = useNavigate()

  return (
    <div className='min-h-[calc(100vh-200px)] flex flex-col items-center justify-center py-12 gap-8'>
      <div className='w-full max-w-3xl sm:px-2 md:px-4'>
        <Card className='bg-transparent border-0 border-b'>
          <CardHeader className='text-center pb-4'>
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
                  <strong className='text-foreground'>가입한 이메일을 확인해주세요!</strong>
                  <br />책 제목, 저자, 구매 가능한 링크가 포함된 이메일이 발송됩니다.
                </span>
              </p>
              <p className='text-sm text-muted-foreground flex items-center gap-2'>
                <span className='text-lg shrink-0'>⏰</span>
                <span>이메일이 도착하지 않았다면 스팸함을 확인해보세요.</span>
              </p>
            </div>

            {/* 버튼 그룹 */}
            <div className='flex flex-col sm:flex-row gap-3 pt-4 pb-4 justify-center'>
              <Button variant='outline' onClick={() => navigate('/')}>
                홈으로 돌아가기
              </Button>
              <Button onClick={() => navigate('/order/history')}>주문 내역 확인하기</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 주문 내용 요약 섹션 */}
      <div className='w-full max-w-3xl px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 items-center'>
          {/* 좌측: 제목 및 설명 */}
          <div className='space-y-2'>
            <h2 className='text-xl sm:text-2xl font-bold'>주문 내용 요약</h2>
            <p className='text-sm sm:text-base text-muted-foreground'>
              당신의 주문 내역을 확인하세요.
            </p>
          </div>

          {/* 우측: 주문 정보 카드 */}
          <Card>
            <CardContent className='p-4 sm:p-6'>
              <div className='flex flex-col sm:flex-row gap-4'>
                {/* 카드 왼쪽: 추천사 썸네일 */}
                <div className='w-full sm:w-32 sm:h-32 max-h-[300px] aspect-square rounded-lg overflow-hidden flex-shrink-0 bg-muted'>
                  <CurationThumbnail
                    thumbnailImage={mockOrderData.curation.thumbnailImage}
                    thumbnailColor={mockOrderData.curation.thumbnailColor}
                    title={mockOrderData.curation.title}
                    className='rounded-lg'
                  />
                </div>

                {/* 카드 오른쪽: 주문 정보 */}
                <div className='flex-1 space-y-1'>
                  <div className='flex items-center gap-1'>
                    <p className='text-xs sm:text-sm text-muted-foreground mb-1'>주문번호 : </p>
                    <p className='text-sm sm:text-base font-medium'>{mockOrderData.orderNumber}</p>
                  </div>

                  <div className='flex items-center gap-1'>
                    <p className='text-xs sm:text-sm text-muted-foreground mb-1'>주문 일시 : </p>
                    <p className='text-sm sm:text-base font-medium'>{mockOrderData.orderDate}</p>
                  </div>

                  <div className='flex items-center gap-1'>
                    <p className='text-xs sm:text-sm text-muted-foreground'>총 결제 금액 : </p>
                    <p className='text-sm sm:text-base font-bold text-primary'>
                      {mockOrderData.totalAmount.toLocaleString()}원
                    </p>
                  </div>

                  <div className='pt-2 border-t flex items-center gap-1'>
                    <p className='text-xs sm:text-sm text-muted-foreground'>큐레이터 : </p>
                    <p className='text-sm sm:text-base font-medium'>{mockOrderData.curator.name}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
