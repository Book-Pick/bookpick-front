import { useState } from 'react'
import { Card, CardHeader, CardContent, Button, Textarea } from '@/shared/ui'
import { MessageCircle } from 'lucide-react'
import CommentItem from './CommentItem'

import { type CommentData } from '@/data/mockCommentData'

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
        <div className='flex items-center justify-between mb-5'>
          <h3 className='text-xl font-semibold'>댓글</h3>
          {/* <Badge variant='outline' size='sm'>
            <MessageCircle className='w-3 h-3 mr-1' />
            {comments.length}개
          </Badge> */}
        </div>
      </CardHeader>
      <CardContent className='space-y-6'>
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

        {/* 새 댓글 작성 */}
        <div>
          <Textarea
            placeholder='이 큐레이션에 답글 남기기'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className='mb-3 min-h-[100px] rounded-none'
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default CommentSection
