import { Button, Input, Badge, Card, Textarea, Avatar } from '@/shared/ui'

export default function HomePage() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='text-2xl font-bold'>Button</div>
      <div>
        <Button variant='primary' size='sm'>
          Click me
        </Button>
        <Button variant='secondary' size='md'>
          Click me
        </Button>
        <Button variant='outline' size='lg'>
          Click me
        </Button>
      </div>
      <div className='text-2xl font-bold'>Input</div>
      <div className='flex flex-col gap-4'>
        <Input />
        <Input state='error' errorMessage='This is an error message' />
        <Input size='sm' placeholder='Small' type='password' />
        <Input size='md' placeholder='Medium' />
        <Input size='lg' placeholder='Large' />
      </div>
      <div className='text-2xl font-bold'>Badge</div>
      <div>
        <Badge variant='primary'>Primary</Badge>
        <Badge variant='secondary'>Secondary</Badge>
        <Badge variant='outline'>Outline</Badge>
      </div>
      <div className='text-2xl font-bold'>Card</div>
      <div className='flex flex-col gap-4'>
        <Card variant='default'>Default</Card>
        <Card variant='outlined'>Outlined</Card>
      </div>
      <div className='text-2xl font-bold'>Textarea</div>
      <div className='flex flex-col gap-4'>
        <Textarea />
        <Textarea state='error' errorMessage='This is an error message' />
        <Textarea size='sm' placeholder='Small' />
        <Textarea size='md' placeholder='Medium' />
        <Textarea size='lg' placeholder='Large' />
      </div>
      <div className='text-2xl font-bold'>Avatar</div>
      <div className='flex gap-4 items-center'>
        <Avatar src='https://via.placeholder.com/150' alt='avatar' size='sm' status='online' />
        <Avatar name='Ginger' size='md' status='online' />
        <Avatar src='https://via.placeholder.com/150' alt='avatar' size='lg' status='online' />
      </div>
    </div>
  )
}
