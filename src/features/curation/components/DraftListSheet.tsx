import { useState } from 'react'
import { Calendar, FileText, Trash2 } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Button,
  Card,
  CardContent,
} from '@/shared/ui'
import { DRAFT_CURATIONS, type DraftCuration } from '../constants/curationCreateData'

interface DraftListSheetProps {
  isOpen: boolean
  onClose: () => void
  onSelectDraft: (draft: DraftCuration) => void
}

export function DraftListSheet({ isOpen, onClose, onSelectDraft }: DraftListSheetProps) {
  const [drafts, setDrafts] = useState<DraftCuration[]>(DRAFT_CURATIONS)

  const handleSelectDraft = (draft: DraftCuration) => {
    onSelectDraft(draft)
    onClose()
  }

  const handleDeleteDraft = (draftId: string) => {
    setDrafts(drafts.filter((draft) => draft.id !== draftId))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='w-[400px] sm:w-[540px]'>
        <SheetHeader>
          <SheetTitle>임시 저장된 글</SheetTitle>
        </SheetHeader>

        <div className='mt-6 space-y-4 px-4'>
          {drafts.length === 0 ? (
            <div className='text-center py-8 text-muted-foreground'>
              <FileText size={48} className='mx-auto mb-4 text-gray-300' />
              <p>임시 저장된 글이 없습니다.</p>
            </div>
          ) : (
            drafts.map((draft) => (
              <Card key={draft.id} className='cursor-pointer hover:bg-gray-50 transition-colors'>
                <CardContent className='p-4'>
                  <div className='flex items-start justify-between gap-3'>
                    <div className='flex-1 min-w-0' onClick={() => handleSelectDraft(draft)}>
                      <h4 className='font-semibold text-lg mb-2 line-clamp-2'>{draft.title}</h4>
                      <p className='text-sm text-muted-foreground mb-3 line-clamp-2'>
                        {draft.content}
                      </p>
                      <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                        <Calendar size={12} />
                        {formatDate(draft.createdAt)}
                      </div>
                    </div>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleDeleteDraft(draft.id)}
                      className='text-destructive hover:text-destructive hover:bg-destructive/10'
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
