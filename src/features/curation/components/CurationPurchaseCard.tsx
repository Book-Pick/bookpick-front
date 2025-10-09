import { Card, CardHeader, CardDescription, CardTitle, CardAction, Button } from '@/shared/ui'

interface CurationPurchaseCardProps {
  curationId: number
  price: number
  currency?: string
  className?: string
  onPurchase?: (curationId: number, price: number) => void
}

const CurationPurchaseCard = ({
  curationId,
  price,
  currency = '원',
  className,
  onPurchase,
}: CurationPurchaseCardProps) => {
  const handlePurchaseClick = () => {
    onPurchase?.(curationId, price)
  }

  const formatPrice = (price: number, currency: string) => {
    return `${price.toLocaleString()}${currency}`
  }

  return (
    <Card className={`py-4 pb-4 bg-neutral-100 border-0 ${className || ''}`}>
      <CardHeader className='px-5'>
        <div>
          <CardDescription className='text-neutral-600 font-medium mb-1'>가격</CardDescription>
          <CardTitle className='text-2xl font-bold'>{formatPrice(price, currency)}</CardTitle>
        </div>
        <CardAction className='self-center'>
          <Button
            size='lg'
            variant='accent'
            onClick={handlePurchaseClick}
            className='mr-2 font-bold'
          >
            이 큐레이션 구매하기
          </Button>
          <Button size='lg' variant='outline' onClick={handlePurchaseClick}>
            장바구니
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  )
}

export default CurationPurchaseCard
