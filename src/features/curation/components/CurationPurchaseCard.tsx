import { Card, CardHeader, CardDescription, CardTitle, CardAction, Button } from '@/shared/ui'

interface CurationPurchaseCardProps {
  curationId: number
  price: number
  currency?: string
  className?: string
  onPurchase: (curationId: number, price: number) => void
  onCart: (curationId: number, price: number) => void
}

const CurationPurchaseCard = ({
  curationId,
  price,
  currency = '원',
  className,
  onPurchase,
  onCart,
}: CurationPurchaseCardProps) => {
  const handleCartClick = () => {
    onCart(curationId, price)
  }

  const handlePurchaseClick = () => {
    onPurchase?.(curationId, price)
  }

  const formatPrice = (price: number, currency: string) => {
    return `${price.toLocaleString()}${currency}`
  }

  return (
    <Card className={`py-4 pb-0 md:pb-4 bg-neutral-100 border-0 ${className || ''}`}>
      <CardHeader className='px-4 md:px-5'>
        <div className='text-center md:text-left'>
          <CardDescription className='text-neutral-600 font-medium mb-1'>가격</CardDescription>
          <CardTitle className='text-xl md:text-2xl font-bold'>
            {formatPrice(price, currency)}
          </CardTitle>
        </div>
        {/* 데스크톱용 버튼 */}
        <CardAction className='hidden md:flex md:self-center'>
          <Button
            size='lg'
            variant='point'
            onClick={handlePurchaseClick}
            className='mr-2 font-bold'
          >
            구매하러 가기
          </Button>
          <Button size='lg' variant='outline' onClick={handleCartClick}>
            장바구니
          </Button>
        </CardAction>
      </CardHeader>

      {/* 모바일용 버튼 */}
      <div className='flex gap-3 md:hidden px-4 pb-4 pt-3'>
        <Button size='lg' variant='outline' onClick={handleCartClick} className='flex-[1]'>
          장바구니
        </Button>
        <Button
          size='lg'
          variant='point'
          onClick={handlePurchaseClick}
          className='flex-[3] font-bold'
        >
          구매하러 가기
        </Button>
      </div>
    </Card>
  )
}

export default CurationPurchaseCard
