import { useState } from 'react'
import type { CommentTreeNode } from '../utils/commentTree'
import { formatRelativeTime } from '@/shared/utils/dateFormat'
import {
  Avatar,
  Textarea,
  Button,
  Input,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/shared/ui'
import { Heart, ArrowRight, X, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

interface CommentItemProps {
  comment: CommentTreeNode
  onReply: (parentId: number, content: string) => void
  isReply?: boolean
  currentUserId?: number
  onEdit?: (commentId: number, content: string) => void
  onDelete?: (commentId: number) => void
}

const CommentItem = ({
  comment,
  onReply,
  isReply = false,
  currentUserId,
  onEdit,
  onDelete,
}: CommentItemProps) => {
  const isOwner = currentUserId !== undefined && comment.userId === currentUserId
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      onReply(comment.commentId, replyContent.trim())
      setReplyContent('')
      setShowReplyInput(false)
    }
  }

  const handleEditSubmit = () => {
    if (editContent.trim() && onEdit) {
      onEdit(comment.commentId, editContent.trim())
      setIsEditing(false)
    }
  }

  const handleEditCancel = () => {
    setEditContent(comment.content)
    setIsEditing(false)
  }

  return (
    <div className={`${isReply ? 'ml-12 pl-4' : ''}`}>
      <div className='flex gap-3 mb-4'>
        <Avatar className='w-10 h-10 flex-shrink-0'>
          {comment.profileImageUrl ? (
            <img
              src={comment.profileImageUrl}
              alt={comment.nickname}
              className='w-full h-full object-cover'
            />
          ) : (
            <div className='w-full h-full bg-neutral-200 flex items-center justify-center text-xs text-neutral-500'>
              {comment.nickname?.slice(0, 2) ?? '??'}
            </div>
          )}
        </Avatar>
        <div className='flex-1'>
          <div className='flex items-center justify-between mb-1'>
            <div className='flex items-center gap-2'>
              <span className='font-medium text-sm'>{comment.nickname}</span>
              <span className='text-xs text-neutral-500'>
                {formatRelativeTime(comment.createdAt)}
              </span>
            </div>
            {isOwner && !isEditing && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className='p-1 rounded-md hover:bg-neutral-100 transition-colors'>
                    <MoreHorizontal className='w-4 h-4 text-neutral-400' />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='min-w-[80px]'>
                  <DropdownMenuItem
                    onClick={() => {
                      setIsEditing(true)
                      setShowReplyInput(false)
                      setReplyContent('')
                    }}
                    className='cursor-pointer text-xs px-2 py-1'
                    variant='muted'
                  >
                    <Pencil className='w-3 h-3 mr-1.5' />
                    수정
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDelete?.(comment.commentId)}
                    className='cursor-pointer text-xs px-2 py-1 text-red-600 focus:text-red-600'
                    variant='destructive'
                  >
                    <Trash2 className='w-3 h-3 mr-1.5' />
                    삭제
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* 수정 모드 */}
          {isEditing ? (
            <>
              {/* 모바일: 인라인 Input */}
              <div className='md:hidden'>
                <Input
                  placeholder='수정중...'
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleEditSubmit()
                    }
                    if (e.key === 'Escape') {
                      handleEditCancel()
                    }
                  }}
                  rightElement={
                    <button type='button' onClick={handleEditCancel} className='text-neutral-400'>
                      <X className='size-4' />
                    </button>
                  }
                />
              </div>

              {/* 데스크톱: Textarea */}
              <div className='hidden md:block p-3 bg-neutral-50 rounded-lg'>
                <Textarea
                  placeholder='수정중...'
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleEditSubmit()
                    }
                    if (e.key === 'Escape') {
                      handleEditCancel()
                    }
                  }}
                  className='mb-2 min-h-[80px]'
                />
                <div className='flex justify-end gap-2'>
                  <Button size='sm' variant='outline' onClick={handleEditCancel}>
                    취소
                  </Button>
                  <Button size='sm' onClick={handleEditSubmit} disabled={!editContent.trim()}>
                    수정 완료
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <p className='text-sm text-neutral-700 mb-2 leading-relaxed'>{comment.content}</p>
          )}
          {!isEditing && (
            <div className='flex items-center gap-4'>
              {/* Like button - disabled (placeholder for future feature) */}
              <button
                disabled
                className='flex items-center gap-1 text-xs text-neutral-300 cursor-not-allowed'
              >
                <Heart className='w-4 h-4' />
                <span>0</span>
              </button>
              {!isReply && (
                <button
                  onClick={() => {
                    setShowReplyInput(!showReplyInput)
                    setIsEditing(false)
                    setEditContent(comment.content)
                  }}
                  className='text-xs text-neutral-500 hover:text-neutral-700 transition-colors'
                >
                  답글 달기
                </button>
              )}
            </div>
          )}
          {showReplyInput && (
            <>
              {/* 모바일: 인라인 Input */}
              <div className='mt-3 md:hidden'>
                <Input
                  placeholder={`@${comment.nickname} 답글 입력...`}
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleReplySubmit()
                    }
                  }}
                  rightElement={
                    replyContent.trim() ? (
                      <button
                        type='button'
                        onClick={handleReplySubmit}
                        className='text-neutral-900'
                      >
                        <ArrowRight className='size-4' />
                      </button>
                    ) : (
                      <button
                        type='button'
                        onClick={() => {
                          setShowReplyInput(false)
                          setReplyContent('')
                        }}
                        className='text-neutral-400'
                      >
                        <X className='size-4' />
                      </button>
                    )
                  }
                />
              </div>

              {/* 데스크톱: Textarea */}
              <div className='mt-3 p-3 bg-neutral-50 rounded-lg hidden md:block'>
                <Textarea
                  placeholder='답글을 입력해주세요.'
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleReplySubmit()
                    }
                  }}
                  className='mb-2 min-h-[80px]'
                />
                <div className='flex justify-end gap-2'>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => {
                      setShowReplyInput(false)
                      setReplyContent('')
                    }}
                  >
                    취소
                  </Button>
                  <Button size='sm' onClick={handleReplySubmit} disabled={!replyContent.trim()}>
                    답글 작성
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {comment.replies.length > 0 && (
        <div className='mt-4'>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.commentId}
              comment={reply}
              onReply={onReply}
              isReply={true}
              currentUserId={currentUserId}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CommentItem
