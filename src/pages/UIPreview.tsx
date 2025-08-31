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
  CardAction,
  Textarea,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/shared/ui'
import { Heart, MessageSquare } from 'lucide-react'
import sampleImage from '@/assets/images/sample_image.jpeg'

export default function UIPreview() {
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
      <div className='flex gap-2'>
        <Badge variant='default'>Primary</Badge>
        <Badge variant='secondary'>Secondary</Badge>
        <Badge variant='outline'>Outline</Badge>
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
        <div>큐레이터 프로필 카드</div>
        <Card className='py-4 pb-3'>
          <CardHeader className='px-4'>
            <div className='flex gap-4 items-center'>
              <div className='w-[80px] h-[80px] bg-neutral-200 rounded-lg flex items-center justify-center'>
                <div className='text-xs'>프로필</div>
              </div>
              <div>
                <CardTitle className='font-medium'>감성큐레이터</CardTitle>
                <CardDescription className='text-xs text-neutral-600 font-medium mt-2'>
                  <p>선호 장르: 에세이, 심리</p>
                  <p>소개문구: 감성 독서를 사랑하는 독자입니다.</p>
                </CardDescription>
              </div>
            </div>
            <CardAction className='self-center'>
              <Button>팔로우</Button>
            </CardAction>
          </CardHeader>
        </Card>
        <div>큐레이션 구매 정보 카드</div>
        <Card className='py-4 pb-3 bg-neutral-200 border-0'>
          <CardHeader className='px-4'>
            <div>
              <CardDescription className='text-xs text-neutral-600 font-medium mb-1'>
                큐레이션 가격
              </CardDescription>
              <CardTitle className='text-lg font-semibold'>18,500원</CardTitle>
            </div>
            <CardAction className='self-center'>
              <Button>이 큐레이션 구매하기</Button>
            </CardAction>
          </CardHeader>
        </Card>
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
      </div>
    </div>
  )
}
