import { useState } from 'react'
import type { CommentTreeNode } from '@/shared/utils/dateFormat'
import { formatRelativeTime } from '@/shared/utils/dateFormat'
import { Avatar, Textarea, Button } from '@/shared/ui'
import { Heart } from 'lucide-react'

interface CommentItemProps {
  comment: CommentTreeNode
  onReply: (parentId: number, content: string) => void
  isReply?: boolean
}

const CommentItem = ({ comment, onReply, isReply = false }: CommentItemProps) => {
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyContent, setReplyContent] = useState('')

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      onReply(comment.commentId, replyContent.trim())
      setReplyContent('')
      setShowReplyInput(false)
    }
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
          <div className='flex items-center gap-2 mb-1'>
            <span className='font-medium text-sm'>{comment.nickname}</span>
            <span className='text-xs text-neutral-500'>
              {formatRelativeTime(comment.createdAt)}
            </span>
          </div>
          <p className='text-sm text-neutral-700 mb-2 leading-relaxed'>{comment.content}</p>
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
                onClick={() => setShowReplyInput(!showReplyInput)}
                className='text-xs text-neutral-500 hover:text-neutral-700 transition-colors'
              >
                답글 달기
              </button>
            )}
          </div>
          {showReplyInput && (
            <div className='mt-3 p-3 bg-neutral-50 rounded-lg'>
              <Textarea
                placeholder='답글을 입력해주세요.'
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
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
          )}
        </div>
      </div>
      {comment.replies.length > 0 && (
        <div className='mt-4'>
          {comment.replies.map((reply) => (
            <CommentItem key={reply.commentId} comment={reply} onReply={onReply} isReply={true} />
          ))}
        </div>
      )}
    </div>
  )
}

export default CommentItem
