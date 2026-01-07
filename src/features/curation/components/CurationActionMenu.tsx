import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/shared/ui'
import { MoreVertical, Share2, Bookmark, Pencil, Trash2 } from 'lucide-react'

type CurationActionMenuVariant = 'viewer' | 'owner' | 'draft'

interface CurationActionMenuProps {
  id?: number | string
  variant?: CurationActionMenuVariant
  onShare?: (id: number | string) => void
  onBookmark?: (id: number | string) => void
  onEdit?: (id: number | string) => void
  onDelete?: (id: number | string) => void
}

const CurationActionMenu = ({
  id,
  variant = 'viewer',
  onShare,
  onBookmark,
  onEdit,
  onDelete,
}: CurationActionMenuProps) => {
  const menuItems = [
    // viewer, owner: 공유/저장 표시
    ...(variant !== 'draft'
      ? [
          { icon: Share2, label: '공유', onClick: onShare, variant: 'muted' as const },
          { icon: Bookmark, label: '저장', onClick: onBookmark, variant: 'muted' as const },
        ]
      : []),
    // owner, draft: 수정/삭제 표시
    ...(variant !== 'viewer'
      ? [
          { icon: Pencil, label: '수정', onClick: onEdit, variant: 'muted' as const },
          {
            icon: Trash2,
            label: '삭제',
            onClick: onDelete,
            variant: 'destructive' as const,
            className: 'text-red-600 focus:text-red-600',
          },
        ]
      : []),
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className='p-1 rounded-md hover:bg-gray-100 transition-colors'
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className='w-5 h-5 text-gray-400' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        sideOffset={0}
        alignOffset={15}
        className='flex flex-row gap-1 p-2 rounded-xl rounded-tr-none shadow-lg w-fit min-w-0'
      >
        {menuItems.map(({ icon: Icon, label, onClick, variant, className }) => (
          <DropdownMenuItem
            key={label}
            onClick={(e) => {
              e.stopPropagation()
              if (id !== undefined && onClick) onClick(id)
            }}
            className={`flex flex-col items-center gap-1 px-3 py-2 cursor-pointer rounded-lg ${className || ''}`}
            variant={variant}
          >
            <Icon className='w-5 h-5' />
            <span className='text-xs'>{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CurationActionMenu
