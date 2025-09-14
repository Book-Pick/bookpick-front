import {
  Button,
  Input,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Textarea,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/shared/ui'
import { Heart, MessageSquare, CircleUser } from 'lucide-react'
import sampleImage from '@/assets/images/sample_image.jpeg'
import CurationCardFull from '@/features/curation/components/CurationCardFull'
import CuratorProfileCard from '@/features/curation/components/CuratorProfileCard'
import CurationPurchaseCard from '@/features/curation/components/CurationPurchaseCard'
import { mockCuratorData } from '@/data/mockCuratorData'
import { mockCurationData } from '@/data/mockCurationData'

export default function UIPreview() {
  const handleSubscribeToggle = (curatorId: number, isSubscribed: boolean) => {
    console.log(`큐레이터 ${curatorId} 구독 상태 변경:`, isSubscribed ? '구독' : '구독취소')
  }

  const handlePurchase = (curationId: number, price: number) => {
    console.log(`큐레이션 ${curationId} 구매 요청, 가격: ${price}원`)
  }

  return (
    <div className='w-[600px] flex flex-col gap-4 px-8 py-6'>
      <div className='text-2xl font-bold'>Button</div>
      <div className='flex gap-2'>
        <Button variant='default' size='sm'>
          Primary/small
        </Button>
        <Button variant='secondary' size='default'>
          Secondary/medium
        </Button>
        <Button variant='outline' size='lg'>
          Outline/large
        </Button>
        <Button variant='default' size='lg'>
          Primary/large
        </Button>
        <Button variant='default' size='xl'>
          Default/X-Large
        </Button>
        <Button disabled size='lg'>
          Disabled
        </Button>
      </div>
      <div className='text-2xl font-bold'>Input</div>
      <div className='flex flex-col gap-4'>
        <Input placeholder='기본 상태' />
        <Input placeholder='포커스 상태' className='border-ring ring-ring/50 ring-[3px]' />
        <Input placeholder='라벨과 함께' label='사용자 이름' />
        <Input disabled value='비활성화 상태' />
        <Input placeholder='에러 상태' errorMessage='8자리 이상 입력하세요' />
      </div>
      <div className='text-2xl font-bold'>Badge</div>
      <div className='flex flex-col gap-3'>
        <div className='flex gap-2'>
          <Badge variant='default'>Primary</Badge>
          <Badge variant='secondary'>Secondary</Badge>
          <Badge variant='outline'>Outline</Badge>
          <Badge variant='text'>Text Only</Badge>
        </div>
        <div className='flex gap-2'>
          <Badge variant='default' size='sm'>
            Small
          </Badge>
          <Badge variant='outline' size='sm'>
            Outline Small
          </Badge>
          <Badge variant='text' size='sm'>
            Text Small
          </Badge>
        </div>
        <div className='flex gap-2'>
          <Badge variant='default' size='lg'>
            Large
          </Badge>
          <Badge variant='outline' size='lg'>
            Outline Large
          </Badge>
          <Badge variant='text' size='lg'>
            Text Large
          </Badge>
        </div>
      </div>
      <div className='text-2xl font-bold'>Card</div>
      <div className='flex flex-col gap-4'>
        <div>큐레이션 카드</div>
        <Card className='bg-neutral-100 border-0'>
          <CardHeader>
            <CardDescription className='text-xs text-neutral-900 font-medium'>
              취향 유사도 95%
            </CardDescription>
            <CardTitle className='text-lg font-medium'>일상에서 발견하는 철학적 순간들</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-sm font-normal'>
              우리가 무심코 지나치는 하루의 조각들 속에 얼마나 많은 질문과 해답이 숨어있는지
              생각해보신 적 있으신가요?
            </p>
          </CardContent>
          <CardFooter className='mt-4'>
            <div className='w-full flex justify-between items-center'>
              <div className='text-sm text-neutral-800 font-medium'>by 사유하는 직장인</div>
              <div className='flex gap-2'>
                <div className='flex gap-1 items-center'>
                  <Heart size={16} className='size-3' />
                  <span className='text-sm font-medium'>24</span>
                </div>
                <div className='flex gap-1 items-center'>
                  <MessageSquare size={16} className='size-3' />
                  <span className='text-sm font-medium'>8</span>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
        <div>큐레이션 카드 ver2</div>
        <CurationCardFull
          title='결국 어른이 된다는 건, 아픔과 불안, 외로움을 숨기면서도 하루하루를 살아내는 법을 배워가는 일'
          description='어른이 된다는 건 단순히 나이를 먹는 게 아니라, 세상 속에서 살아남기 위해 새로운 방식을 배우는 과정 같아. 진짜로 괜찮지 않아도, 사람들 앞에서는 웃을 줄 알고 괜찮아라는 말을 입에 달고 사는 법을 익히는 거지.'
          curator='감성큐레이터'
          likes={24}
          comments={8}
          views={156}
          date='2025.08.25'
          tags={['에세이', '성장', '힐링']}
        />
        <div>큐레이터 프로필 카드</div>
        <div className='flex flex-col gap-4'>
          {mockCuratorData.slice(0, 3).map((curator) => (
            <CuratorProfileCard
              key={curator.id}
              curatorId={curator.id}
              name={curator.name}
              favoriteGenres={curator.favoriteGenres}
              introduction={curator.introduction}
              isSubscribed={curator.isSubscribed}
              onSubscribeToggle={handleSubscribeToggle}
            />
          ))}
        </div>
        <div>큐레이션 구매 정보 카드</div>
        <div className='flex flex-col gap-4'>
          {mockCurationData.slice(0, 1).map((curation) => (
            <CurationPurchaseCard
              key={curation.id}
              curationId={curation.id}
              price={curation.price}
              onPurchase={handlePurchase}
            />
          ))}
        </div>
      </div>
      <div className='text-2xl font-bold'>Textarea</div>
      <div className='flex flex-col gap-4'>
        <Textarea placeholder='입력하세요' />
        <Textarea disabled placeholder='비활성화 상태' />
      </div>
      <div className='text-2xl font-bold'>Avatar</div>
      <div className='flex gap-4 items-center'>
        <Avatar>
          <AvatarImage src={sampleImage} alt='profile' className='object-cover' />
        </Avatar>
        <Avatar>
          <AvatarFallback>수민</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>
            <CircleUser />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
