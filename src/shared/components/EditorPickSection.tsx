import { EditorPickCard } from './EditorPickCard'

interface EditorPick {
  id: string
  title: string
  imageUrl: string
}

interface EditorPickSectionProps {
  title: string
  picks: EditorPick[]
  onCardClick?: (id: string) => void
}

export function EditorPickSection({ title, picks, onCardClick }: EditorPickSectionProps) {
  return (
    <div className='space-y-3'>
      {/* 제목 */}
      <h2 className='text-2xl font-semibold text-foreground'>{title}</h2>

      {/* 카드 리스트 */}
      <div className='flex flex-col sm:flex-row gap-[30px]'>
        {picks.map((pick) => (
          <div key={pick.id} className='flex-1 min-w-0'>
            <EditorPickCard
              title={pick.title}
              imageUrl={pick.imageUrl}
              onClick={() => onCardClick?.(pick.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
