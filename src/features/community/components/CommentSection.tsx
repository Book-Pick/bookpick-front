import { useState, useMemo } from 'react'
import { Card, CardHeader, CardContent, Textarea, Button } from '@/shared/ui'
import { MessageCircle } from 'lucide-react'
import CommentItem from './CommentItem'
import { useGetInfiniteComments, useCreateComment } from '../hooks/useCommunity'
import { buildCommentTree } from '@/shared/utils/dateFormat'

interface CommentSectionProps {
  curationId: number
  className?: string
}

const CommentSection = ({ curationId, className }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('')

  // Fetch comments with infinite scroll
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetInfiniteComments(curationId)

  // Create comment mutation
  const createComment = useCreateComment(curationId)

  // Flatten all pages and build tree structure
  const commentTree = useMemo(() => {
    if (!data?.pages) return []
    const allComments = data.pages.flatMap((page) => page.comments)
    return buildCommentTree(allComments)
  }, [data])

  const totalComments = data?.pages[0]?.pageInfo.totalElements || 0

  const handleSubmit = () => {
    if (newComment.trim()) {
      createComment.mutate(
        { content: newComment.trim() },
        {
          onSuccess: () => {
            setNewComment('')
          },
        },
      )
    }
  }

  const handleReply = (parentId: number, content: string) => {
    createComment.mutate({ parentId, content })
  }

  return (
    <Card className={`${className || ''}`}>
      <CardHeader>
        <div className='flex items-center justify-between mb-5'>
          <h3 className='text-xl font-semibold'>댓글</h3>
          {totalComments > 0 && <span className='text-sm text-neutral-500'>{totalComments}개</span>}
        </div>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Comment list */}
        <div className='space-y-6'>
          {isLoading ? (
            <div className='text-center py-8 text-neutral-500'>
              <p>댓글을 불러오는 중...</p>
            </div>
          ) : commentTree.length === 0 ? (
            <div className='text-center py-8 text-neutral-500'>
              <MessageCircle className='w-12 h-12 mx-auto mb-3 opacity-50' />
              <p>첫 번째 댓글을 남겨보세요!</p>
            </div>
          ) : (
            <>
              {commentTree.map((comment) => (
                <CommentItem key={comment.commentId} comment={comment} onReply={handleReply} />
              ))}

              {/* Load more button */}
              {hasNextPage && (
                <div className='flex justify-center pt-4'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage ? '로딩 중...' : '댓글 더보기'}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        {/* New comment form */}
        <div>
          <Textarea
            placeholder='이 추천사에 답글 남기기'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className='mb-3 min-h-[100px] rounded-none'
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit()
              }
            }}
            disabled={createComment.isPending}
          />
          <div className='flex justify-end'>
            <Button
              size='sm'
              onClick={handleSubmit}
              disabled={!newComment.trim() || createComment.isPending}
            >
              {createComment.isPending ? '작성 중...' : '댓글 작성'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CommentSection
