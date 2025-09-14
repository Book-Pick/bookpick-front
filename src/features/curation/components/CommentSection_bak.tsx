import { useState } from 'react'
import { Card, CardHeader, CardContent, Button, Textarea, Avatar, Badge } from '@/shared/ui'
import { Heart, MessageCircle } from 'lucide-react'
import { type CommentData } from '@/data/mockCommentData'

interface CommentItemProps {
  comment: CommentData
  onReply?: (parentId: number, content: string) => void
  onLike?: (commentId: number) => void
  isReply?: boolean
}

const CommentItem = ({ comment, onReply, onLike, isReply = false }: CommentItemProps) => {
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyContent, setReplyContent] = useState('')

  const handleReplySubmit = () => {
    if (replyContent.trim() && onReply) {
      onReply(comment.id, replyContent.trim())
      setReplyContent('')
      setShowReplyInput(false)
    }
  }

  const handleLike = () => {
    onLike?.(comment.id)
  }

  return (
    <div className={`${isReply ? 'ml-12 pl-4 border-l-2 border-neutral-200' : ''}`}>
      <div className='flex gap-3 mb-4'>
        <Avatar className='w-10 h-10 flex-shrink-0'>
          {comment.profileImage ? (
            <img
              src={comment.profileImage}
              alt={comment.author}
              className='w-full h-full object-cover'
            />
          ) : (
            <div className='w-full h-full bg-neutral-200 flex items-center justify-center text-xs text-neutral-500'>
              {comment.author.slice(0, 2)}
            </div>
          )}
        </Avatar>
        <div className='flex-1'>
          <div className='flex items-center gap-2 mb-1'>
            <span className='font-medium text-sm'>{comment.author}</span>
            <span className='text-xs text-neutral-500'>{comment.date}</span>
          </div>
          <p className='text-sm text-neutral-700 mb-2 leading-relaxed'>{comment.content}</p>
          <div className='flex items-center gap-4'>
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-xs transition-colors ${
                comment.isLiked
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-neutral-500 hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`} />
              {comment.likes}
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
                placeholder='답글을 입력해주세요...'
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
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onLike={onLike}
              isReply={true}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface CommentSectionProps {
  comments: CommentData[]
  onAddComment?: (content: string) => void
  onReply?: (parentId: number, content: string) => void
  onLike?: (commentId: number) => void
  className?: string
}

const CommentSection = ({
  comments,
  onAddComment,
  onReply,
  onLike,
  className,
}: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('')

  const handleSubmit = () => {
    if (newComment.trim() && onAddComment) {
      onAddComment(newComment.trim())
      setNewComment('')
    }
  }

  return (
    <Card className={`${className || ''}`}>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <h3 className='text-xl font-semibold'>댓글 및 피드백</h3>
          <Badge variant='outline' size='sm'>
            <MessageCircle className='w-3 h-3 mr-1' />
            {comments.length}개
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* 새 댓글 작성 */}
        <div className='p-4 bg-neutral-50 rounded-lg'>
          <Textarea
            placeholder='이 큐레이션에 대한 의견을 남겨주세요...'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className='mb-3 min-h-[100px]'
          />
          <div className='flex justify-end'>
            <Button onClick={handleSubmit} disabled={!newComment.trim()}>
              댓글 작성
            </Button>
          </div>
        </div>

        {/* 댓글 목록 */}
        <div className='space-y-6'>
          {comments.length === 0 ? (
            <div className='text-center py-8 text-neutral-500'>
              <MessageCircle className='w-12 h-12 mx-auto mb-3 opacity-50' />
              <p>첫 번째 댓글을 남겨보세요!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} onReply={onReply} onLike={onLike} />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default CommentSection
