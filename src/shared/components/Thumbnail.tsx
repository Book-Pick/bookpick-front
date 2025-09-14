import { Image } from 'lucide-react'

interface ThumbnailProps {
  className?: string
}

const Thumbnail = ({ className }: ThumbnailProps) => {
  return (
    <div
      className={`bg-neutral-200 rounded-sm flex items-center justify-center aspect-[5/6] w-full ${className || ''}`}
    >
      <Image
        className='text-neutral-500'
        style={{
          width: 'clamp(16px, 25%, 48px)',
          height: 'clamp(16px, 25%, 48px)',
        }}
      />
    </div>
  )
}

export default Thumbnail
