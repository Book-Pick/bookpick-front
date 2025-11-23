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
      <h2 className='text-lg font-semibold text-foreground'>{title}</h2>

      {/* 카드 리스트 */}
      <div className='flex flex-row gap-[30px] overflow-x-auto pb-2 sm:overflow-x-visible scrollbar-hide'>
        {picks.map((pick) => (
          <div key={pick.id} className='flex-shrink-0 w-[280px] sm:flex-1 sm:w-auto sm:flex-shrink'>
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
