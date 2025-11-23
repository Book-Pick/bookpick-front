import Thumbnail from '@/shared/components/Thumbnail'

interface CurationThumbnailProps {
  thumbnailImage?: string | null
  thumbnailColor?: string | null
  title: string
  className?: string
}

const CurationThumbnail = ({
  thumbnailImage,
  thumbnailColor,
  title,
  className,
}: CurationThumbnailProps) => {
  // 이미지가 있으면 이미지 표시
  if (thumbnailImage) {
    return (
      <img
        src={thumbnailImage}
        alt={title}
        className={`w-full h-full object-cover ${className || ''}`}
      />
    )
  }

  // 컬러가 있으면 배경색 + 타이틀 표시
  if (thumbnailColor) {
    return (
      <div
        style={{ backgroundColor: thumbnailColor }}
        className={`w-full h-full flex items-center justify-center p-4 ${className || ''}`}
      >
        <h3 className='font-bold text-center text-white line-clamp-3'>{title}</h3>
      </div>
    )
  }

  // 둘 다 없으면 기본 Thumbnail
  return <Thumbnail className={className} />
}

export default CurationThumbnail
