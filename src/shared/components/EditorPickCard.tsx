interface EditorPickCardProps {
  title: string
  imageUrl: string
  onClick?: () => void
}

export function EditorPickCard({ title, imageUrl, onClick }: EditorPickCardProps) {
  return (
    <div
      onClick={onClick}
      className='relative w-full h-[140px] rounded-2xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity'
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 반투명 오버레이 + 블러 효과 */}
      <div className='absolute inset-0 bg-black/50 backdrop-blur-[10px] flex items-center justify-center p-4'>
        <h3 className='text-white text-lg md:text-xl font-normal text-center break-keep'>
          {title}
        </h3>
      </div>
    </div>
  )
}
