import { Button } from '@/shared/ui'

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
    </div>
  )
}
