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
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Toggle,
  Checkbox,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  AspectRatio,
} from '@/shared/ui'
import { Heart, MessageSquare, CircleUser, Search, Settings, Menu } from 'lucide-react'
import sampleImage from '@/assets/images/sample_image.jpeg'
import sampleImage1 from '@/assets/images/sample_image_01.jpeg'
import sampleImage2 from '@/assets/images/sample_image_02.jpeg'
import sampleImage3 from '@/assets/images/sample_image_03.jpeg'
import CurationCardFull from '@/features/curation/components/CurationCardFull'
import CurationCardBasic from '@/features/curation/components/CurationCardBasic'
import CurationCardSocial from '@/features/curation/components/CurationCardSocial'
import CuratorProfileCard from '@/features/curation/components/CuratorProfileCard'
import CurationPurchaseCard from '@/features/curation/components/CurationPurchaseCard'
import { BookSearchSection } from '@/features/curation/components/BookSearchSection'
import { ThumbnailSelector } from '@/features/curation/components/ThumbnailSelector'
import Thumbnail from '@/shared/components/Thumbnail'
import { mockCuratorData } from '@/data/mockCuratorData'
import { mockCurationData } from '@/data/mockCurationData'
import { useState } from 'react'
import type { Book } from '@/features/curation/types/curation.types'

export default function UIPreview() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isToggled, setIsToggled] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [selectedCurations, setSelectedCurations] = useState<number[]>([])

  const handleSubscribeToggle = (curatorId: number, isSubscribed: boolean) => {
    console.log(`큐레이터 ${curatorId} 구독 상태 변경:`, isSubscribed ? '구독' : '구독취소')
  }

  const handlePurchase = (curationId: number, price: number) => {
    console.log(`큐레이션 ${curationId} 구매 요청, 가격: ${price}원`)
  }

  const handleSelectCuration = (id: number | string) => {
    const numId = typeof id === 'string' ? parseInt(id) : id
    setSelectedCurations((prev) =>
      prev.includes(numId) ? prev.filter((i) => i !== numId) : [...prev, numId],
    )
  }

  const handleDeleteSelected = () => {
    console.log('선택된 큐레이션 삭제:', selectedCurations)
    alert(`${selectedCurations.length}개의 큐레이션이 선택되었습니다.`)
  }

  const handleBookSelect = (book: Book | null) => {
    setSelectedBook(book)
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>UI 컴포넌트 갤러리</h1>
          <p className='text-gray-600'>북픽 프로젝트의 모든 UI 컴포넌트들을 한눈에 확인하세요</p>
        </div>

        <Tabs defaultValue='basic' className='w-full'>
          <TabsList className='grid w-full grid-cols-3 mb-8'>
            <TabsTrigger value='basic'>기본 컴포넌트</TabsTrigger>
            <TabsTrigger value='interactive'>인터랙티브 컴포넌트</TabsTrigger>
            <TabsTrigger value='features'>기능별 컴포넌트</TabsTrigger>
          </TabsList>

          <TabsContent value='basic' className='space-y-12'>
            {/* Button Section */}
            <section className='bg-white rounded-lg p-6 shadow-sm'>
              <h2 className='text-2xl font-bold mb-6'>Button</h2>
              <div className='space-y-4'>
                <div className='flex flex-wrap gap-3'>
                  <Button variant='default' size='sm'>
                    Primary Small
                  </Button>
                  <Button variant='secondary' size='default'>
                    Secondary Medium
                  </Button>
                  <Button variant='outline' size='lg'>
                    Outline Large
                  </Button>
                  <Button variant='destructive' size='lg'>
                    Destructive
                  </Button>
                  <Button variant='ghost' size='lg'>
                    Ghost
                  </Button>
                  <Button variant='link' size='lg'>
                    Link
                  </Button>
                  <Button disabled size='lg'>
                    Disabled
                  </Button>
                </div>
                <div className='flex flex-wrap gap-3'>
                  <Button variant='default' size='xs'>
                    Extra Small
                  </Button>
                  <Button variant='default' size='sm'>
                    Small
                  </Button>
                  <Button variant='default' size='default'>
                    Default
                  </Button>
                  <Button variant='default' size='lg'>
                    Large
                  </Button>
                  <Button variant='default' size='xl'>
                    Extra Large
                  </Button>
                  <Button variant='default' size='icon'>
                    <Search size={16} />
                  </Button>
                </div>
              </div>
            </section>

            {/* Input Section */}
            <section className='bg-white rounded-lg p-6 shadow-sm'>
              <h2 className='text-2xl font-bold mb-6'>Input</h2>
              <div className='space-y-6'>
                {/* Size Variants */}
                <div>
                  <h3 className='text-lg font-semibold mb-3'>사이즈 변형</h3>
                  <div className='space-y-4'>
                    <div className='flex items-center gap-4'>
                      <div className='w-20 text-sm text-gray-600'>Small</div>
                      <Input size='sm' placeholder='작은 입력' />
                    </div>
                    <div className='flex items-center gap-4'>
                      <div className='w-20 text-sm text-gray-600'>Medium</div>
                      <Input size='md' placeholder='기본 입력' />
                    </div>
                    <div className='flex items-center gap-4'>
                      <div className='w-20 text-sm text-gray-600'>Large</div>
                      <Input size='lg' placeholder='큰 입력' />
                    </div>
                  </div>
                </div>

                {/* States */}
                <div>
                  <h3 className='text-lg font-semibold mb-3'>상태별 변형</h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <Input placeholder='기본 상태' />
                    <Input
                      placeholder='포커스 상태'
                      className='border-ring ring-ring/50 ring-[3px]'
                    />
                    <Input placeholder='라벨과 함께' label='사용자 이름' />
                    <Input disabled value='비활성화 상태' />
                    <Input placeholder='에러 상태' errorMessage='8자리 이상 입력하세요' />
                    <Input
                      placeholder='라벨과 에러'
                      label='비밀번호'
                      errorMessage='비밀번호를 입력하세요'
                    />
                  </div>
                </div>

                {/* Size with Labels and Errors */}
                <div>
                  <h3 className='text-lg font-semibold mb-3'>사이즈별 라벨과 에러</h3>
                  <div className='space-y-4'>
                    <div className='flex items-center gap-4'>
                      <div className='w-20 text-sm text-gray-600'>Small</div>
                      <Input
                        size='sm'
                        label='이메일'
                        placeholder='small@example.com'
                        errorMessage='올바른 이메일을 입력하세요'
                      />
                    </div>
                    <div className='flex items-center gap-4'>
                      <div className='w-20 text-sm text-gray-600'>Medium</div>
                      <Input size='md' label='사용자명' placeholder='username' />
                    </div>
                    <div className='flex items-center gap-4'>
                      <div className='w-20 text-sm text-gray-600'>Large</div>
                      <Input size='lg' label='전화번호' placeholder='010-1234-5678' />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Badge Section */}
            <section className='bg-white rounded-lg p-6 shadow-sm'>
              <h2 className='text-2xl font-bold mb-6'>Badge</h2>
              <div className='space-y-4'>
                <div className='flex flex-wrap gap-2'>
                  <Badge variant='default'>Primary</Badge>
                  <Badge variant='secondary'>Secondary</Badge>
                  <Badge variant='outline'>Outline</Badge>
                  <Badge variant='text'>Text Only</Badge>
                </div>
                <div className='flex flex-wrap gap-2'>
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
                <div className='flex flex-wrap gap-2'>
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
            </section>

            {/* Card Section */}
            <section className='bg-white rounded-lg p-6 shadow-sm'>
              <h2 className='text-2xl font-bold mb-6'>Card</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <Card>
                  <CardHeader>
                    <CardTitle>기본 카드</CardTitle>
                    <CardDescription>카드의 기본 형태입니다.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>카드 내용이 여기에 표시됩니다.</p>
                  </CardContent>
                  <CardFooter>
                    <Button size='sm'>액션</Button>
                  </CardFooter>
                </Card>
                <Card className='bg-neutral-100 border-0'>
                  <CardHeader>
                    <CardDescription className='text-xs text-neutral-900 font-medium'>
                      취향 유사도 95%
                    </CardDescription>
                    <CardTitle className='text-lg font-medium'>
                      일상에서 발견하는 철학적 순간들
                    </CardTitle>
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
              </div>
            </section>

            {/* Textarea Section */}
            <section className='bg-white rounded-lg p-6 shadow-sm'>
              <h2 className='text-2xl font-bold mb-6'>Textarea</h2>
              <div className='space-y-4'>
                <Textarea placeholder='입력하세요' />
                <Textarea disabled placeholder='비활성화 상태' />
              </div>
            </section>

            {/* Avatar Section */}
            <section className='bg-white rounded-lg p-6 shadow-sm'>
              <h2 className='text-2xl font-bold mb-6'>Avatar</h2>
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
            </section>
          </TabsContent>

          <TabsContent value='interactive' className='space-y-12'>
            {/* Toggle Section */}
            <section className='bg-white rounded-lg p-6 shadow-sm'>
              <h2 className='text-2xl font-bold mb-6'>Toggle</h2>
              <div className='flex gap-4'>
                <Toggle pressed={isToggled} onPressedChange={setIsToggled}>
                  <Settings size={16} />
                </Toggle>
                <Toggle pressed={false}>
                  <Menu size={16} />
                </Toggle>
              </div>
            </section>

            {/* Checkbox Section */}
            <section className='bg-white rounded-lg p-6 shadow-sm'>
              <h2 className='text-2xl font-bold mb-6'>Checkbox</h2>
              <div className='space-y-4'>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='terms'
                    checked={isChecked}
                    onCheckedChange={(checked) => setIsChecked(checked === true)}
                  />
                  <label
                    htmlFor='terms'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    이용약관에 동의합니다
                  </label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='marketing' />
                  <label
                    htmlFor='marketing'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    마케팅 정보 수신에 동의합니다
                  </label>
                </div>
              </div>
            </section>

            {/* Popover Section */}
            <section className='bg-white rounded-lg p-6 shadow-sm'>
              <h2 className='text-2xl font-bold mb-6'>Popover</h2>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant='outline'>팝오버 열기</Button>
                </PopoverTrigger>
                <PopoverContent className='w-80'>
                  <div className='space-y-2'>
                    <h4 className='font-medium leading-none'>팝오버 제목</h4>
                    <p className='text-sm text-muted-foreground'>
                      팝오버 내용이 여기에 표시됩니다.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </section>

            {/* Sheet Section */}
            <section className='bg-white rounded-lg p-6 shadow-sm'>
              <h2 className='text-2xl font-bold mb-6'>Sheet</h2>
              <Button onClick={() => setIsSheetOpen(true)}>시트 열기</Button>
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>시트 제목</SheetTitle>
                  </SheetHeader>
                  <div className='py-4'>
                    <p>시트 내용이 여기에 표시됩니다.</p>
                  </div>
                </SheetContent>
              </Sheet>
            </section>

            {/* Tabs Section */}
            <section className='bg-white rounded-lg p-6 shadow-sm'>
              <h2 className='text-2xl font-bold mb-6'>Tabs</h2>
              <div className='space-y-6'>
                <div>
                  <h3 className='text-lg font-semibold mb-3'>기본 탭</h3>
                  <Tabs defaultValue='tab1' className='w-full'>
                    <TabsList className='grid w-full grid-cols-3'>
                      <TabsTrigger value='tab1'>탭 1</TabsTrigger>
                      <TabsTrigger value='tab2'>탭 2</TabsTrigger>
                      <TabsTrigger value='tab3'>탭 3</TabsTrigger>
                    </TabsList>
                    <TabsContent value='tab1' className='mt-4 p-4 border rounded-md'>
                      <p>첫 번째 탭의 내용입니다.</p>
                    </TabsContent>
                    <TabsContent value='tab2' className='mt-4 p-4 border rounded-md'>
                      <p>두 번째 탭의 내용입니다.</p>
                    </TabsContent>
                    <TabsContent value='tab3' className='mt-4 p-4 border rounded-md'>
                      <p>세 번째 탭의 내용입니다.</p>
                    </TabsContent>
                  </Tabs>
                </div>
                <div>
                  <h3 className='text-lg font-semibold mb-3'>세로 탭</h3>
                  <Tabs defaultValue='vertical1' orientation='vertical' className='w-full flex'>
                    <TabsList className='flex-col h-auto w-40'>
                      <TabsTrigger value='vertical1'>세로 탭 1</TabsTrigger>
                      <TabsTrigger value='vertical2'>세로 탭 2</TabsTrigger>
                      <TabsTrigger value='vertical3'>세로 탭 3</TabsTrigger>
                    </TabsList>
                    <TabsContent value='vertical1' className='flex-1 ml-4 p-4 border rounded-md'>
                      <p>세로 탭의 첫 번째 내용입니다.</p>
                    </TabsContent>
                    <TabsContent value='vertical2' className='flex-1 ml-4 p-4 border rounded-md'>
                      <p>세로 탭의 두 번째 내용입니다.</p>
                    </TabsContent>
                    <TabsContent value='vertical3' className='flex-1 ml-4 p-4 border rounded-md'>
                      <p>세로 탭의 세 번째 내용입니다.</p>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </section>

            {/* AspectRatio Section */}
            <section className='bg-white rounded-lg p-6 shadow-sm'>
              <h2 className='text-2xl font-bold mb-6'>AspectRatio</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <AspectRatio ratio={16 / 9} className='bg-muted rounded-md'>
                  <div className='flex items-center justify-center h-full'>
                    <span className='text-muted-foreground'>16:9 비율</span>
                  </div>
                </AspectRatio>
                <AspectRatio ratio={1} className='bg-muted rounded-md'>
                  <div className='flex items-center justify-center h-full'>
                    <span className='text-muted-foreground'>1:1 비율</span>
                  </div>
                </AspectRatio>
              </div>
            </section>
          </TabsContent>

          <TabsContent value='features' className='space-y-12'>
            {/* Curation Cards Section */}
            <section className='bg-white rounded-lg p-6 shadow-sm'>
              <h2 className='text-2xl font-bold mb-6'>큐레이션 카드</h2>
              <div className='space-y-6'>
                <div>
                  <h3 className='text-lg font-semibold mb-3'>기본 큐레이션 카드</h3>
                  <CurationCardBasic
                    similarity={95}
                    title='일상에서 발견하는 철학적 순간들'
                    description='우리가 무심코 지나치는 하루의 조각들 속에 얼마나 많은 질문과 해답이 숨어있는지 생각해보신 적 있으신가요?'
                    curator='사유하는 직장인'
                    likes={24}
                    comments={8}
                  />
                </div>
                <div>
                  <h3 className='text-lg font-semibold mb-3'>상세 큐레이션 카드</h3>
                  <CurationCardFull
                    title='결국 어른이 된다는 건, 아픔과 불안, 외로움을 숨기면서도 하루하루를 살아내는 법을 배워가는 일'
                    description='어른이 된다는 건 단순히 나이를 먹는 게 아니라, 세상 속에서 살아남기 위해 새로운 방식을 배우는 과정 같아. 진짜로 괜찮지 않아도, 사람들 앞에서는 웃을 줄 알고 괜찮아라는 말을 입에 달고 사는 법을 익히는 거지.'
                    curator='감성큐레이터'
                    likes={24}
                    comments={8}
                    views={156}
                    date='2025.08.25'
                    tags={['에세이', '성장', '힐링']}
                    thumbnailSrc={sampleImage1}
                  />
                </div>
                <div>
                  <h3 className='text-lg font-semibold mb-3'>SNS 스타일 큐레이션 카드</h3>
                  <p className='text-sm text-gray-600 mb-4'>
                    모바일 친화적인 소셜 미디어 스타일의 큐레이션 카드입니다.
                  </p>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl'>
                    {mockCurationData.slice(0, 3).map((curation, index) => (
                      <CurationCardSocial
                        key={curation.id}
                        id={curation.id}
                        similarity={curation.similarity}
                        title={curation.title}
                        description={curation.description}
                        curator={curation.curator}
                        curatorBio={`${curation.tags[0]} 전문 큐레이터`}
                        likes={curation.likes}
                        comments={curation.comments}
                        views={curation.views}
                        tags={curation.tags.join(', ')}
                        thumbnailSrc={[sampleImage1, sampleImage2, sampleImage3][index]}
                        onClick={() => console.log(`클릭된 큐레이션: ${curation.title}`)}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className='text-lg font-semibold mb-3'>편집 모드 (EditMode)</h3>
                  <p className='text-sm text-gray-600 mb-4'>
                    체크박스로 여러 큐레이션을 선택하여 삭제할 수 있습니다. 카드를 클릭하거나
                    체크박스를 클릭하여 선택하세요.
                  </p>
                  <div className='mb-4 flex items-center gap-3'>
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={handleDeleteSelected}
                      disabled={selectedCurations.length === 0}
                    >
                      선택 삭제 ({selectedCurations.length})
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setSelectedCurations([])}
                      disabled={selectedCurations.length === 0}
                    >
                      선택 해제
                    </Button>
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl'>
                    {mockCurationData.slice(0, 3).map((curation, index) => (
                      <CurationCardSocial
                        key={curation.id}
                        id={curation.id}
                        similarity={curation.similarity}
                        title={curation.title}
                        description={curation.description}
                        curator={curation.curator}
                        curatorBio={`${curation.tags[0]} 전문 큐레이터`}
                        likes={curation.likes}
                        comments={curation.comments}
                        views={curation.views}
                        tags={curation.tags.join(', ')}
                        thumbnailSrc={[sampleImage1, sampleImage2, sampleImage3][index]}
                        editMode={true}
                        isSelected={selectedCurations.includes(curation.id)}
                        onSelect={handleSelectCuration}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Curator Profile Cards Section */}
            <section className='bg-white rounded-lg p-6 shadow-sm'>
              <h2 className='text-2xl font-bold mb-6'>큐레이터 프로필 카드</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
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
            </section>

            {/* Purchase Cards Section */}
            <section className='bg-white rounded-lg p-6 shadow-sm'>
              <h2 className='text-2xl font-bold mb-6'>큐레이션 구매 정보 카드</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {mockCurationData.slice(0, 2).map((curation) => (
                  <CurationPurchaseCard
                    key={curation.id}
                    curationId={curation.id}
                    price={curation.price}
                    onPurchase={handlePurchase}
                    onCart={handlePurchase}
                  />
                ))}
              </div>
            </section>

            {/* Book Search Section */}
            <section className='bg-white rounded-lg p-6 shadow-sm'>
              <h2 className='text-2xl font-bold mb-6'>책 검색 섹션</h2>
              <BookSearchSection selectedBook={selectedBook} onBookSelect={handleBookSelect} />
            </section>

            {/* Thumbnail Selector Section */}
            <section className='bg-white rounded-lg p-6 shadow-sm'>
              <h2 className='text-2xl font-bold mb-6'>썸네일 선택기</h2>
              <ThumbnailSelector thumbnail={thumbnail} onThumbnailChange={setThumbnail} />
            </section>

            {/* Thumbnail Component Section */}
            <section className='bg-white rounded-lg p-6 shadow-sm'>
              <h2 className='text-2xl font-bold mb-6'>썸네일 컴포넌트</h2>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                <Thumbnail />
                <Thumbnail />
                <Thumbnail />
                <Thumbnail />
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
