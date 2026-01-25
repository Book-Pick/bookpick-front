import { Card, CardHeader, CardDescription, CardTitle, CardAction, Button } from '@/shared/ui'
import { Heart } from 'lucide-react'

interface CurationPurchaseCardProps {
  curationId: number
  price: number
  currency?: string
  className?: string
  isLiked?: boolean
  likeCount?: number | null
  isLikePending?: boolean
  onPurchase: (curationId: number, price: number) => void
  onCart: (curationId: number, price: number) => void
  onLikeToggle?: () => void
}

const CurationPurchaseCard = ({
  curationId,
  price,
  currency = '원',
  className,
  isLiked = false,
  likeCount,
  isLikePending = false,
  onPurchase,
  onCart,
  onLikeToggle,
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
    <>
      {/* 데스크톱용 카드 */}
      <Card className={`hidden md:block py-4 bg-neutral-100 border-0 ${className || ''}`}>
        <CardHeader className='px-5'>
          <div className='text-left'>
            <CardDescription className='text-neutral-600 font-medium mb-1'>가격</CardDescription>
            <CardTitle className='text-2xl font-bold'>{formatPrice(price, currency)}</CardTitle>
          </div>
          <CardAction className='flex self-center'>
            <Button variant='point' onClick={handlePurchaseClick} className='mr-2 font-bold'>
              구매하러 가기
            </Button>
            <Button variant='outline' onClick={handleCartClick}>
              장바구니
            </Button>
          </CardAction>
        </CardHeader>
      </Card>

      {/* 모바일용 하단 고정 네비바 */}
      <div className='fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-neutral-200 px-4 py-2.5 z-50'>
        {/* 1줄: 가격 라벨 + 가격 */}
        <div className='flex items-center justify-between mb-2'>
          <span className='text-xs font-semibold text-neutral-900'>가격</span>
          <span className='text-lg font-bold text-neutral-900'>{formatPrice(price, currency)}</span>
        </div>

        {/* 2줄: 좋아요 + 장바구니 + 구매하기 */}
        <div className='flex items-center gap-2.5'>
          {/* 좋아요 버튼 */}
          <button
            onClick={onLikeToggle}
            disabled={isLikePending}
            className='flex flex-col items-center'
          >
            <Heart
              className={`size-5 transition-all cursor-pointer hover:scale-110 active:scale-95 ${isLiked ? 'fill-accent text-accent animate-heart-bounce' : 'text-accent'}`}
            />
            <span className='text-[10px] font-medium text-accent'>{likeCount ?? 0}</span>
          </button>

          {/* 장바구니 버튼 */}
          <Button size='default' variant='outline' onClick={handleCartClick} className='flex-1'>
            장바구니
          </Button>

          {/* 구매 버튼 */}
          <Button
            size='default'
            variant='point'
            onClick={handlePurchaseClick}
            className='flex-[2] font-bold'
          >
            구매하기
          </Button>
        </div>
      </div>
    </>
  )
}

export default CurationPurchaseCard
