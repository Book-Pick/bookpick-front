import { useState, useMemo } from 'react'
import { Card, CardHeader, CardContent, Textarea, Button, Input } from '@/shared/ui'
import { MessageCircle, ArrowRight } from 'lucide-react'
import CommentItem from './CommentItem'
import {
  useGetInfiniteComments,
  useCreateComment,
  useUpdateComment,
  useDeleteComment,
} from '../hooks/useCommunity'
import { buildCommentTree } from '../utils/commentTree'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useConfirm } from '@/app/providers'

interface CommentSectionProps {
  curationId: number
  className?: string
}

const CommentSection = ({ curationId, className }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('')
  const { user } = useAuth()
  const { confirm } = useConfirm()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetInfiniteComments(curationId)

  const { mutate: createCommentMutate, isPending: isCreateCommentPending } =
    useCreateComment(curationId)
  const { mutate: updateCommentMutate } = useUpdateComment(curationId)
  const { mutate: deleteCommentMutate } = useDeleteComment(curationId)

  const commentTree = useMemo(() => {
    if (!data?.pages) return []
    const allComments = data.pages.flatMap((page) => page.comments)
    return buildCommentTree(allComments)
  }, [data])

  const totalComments = data?.pages[0]?.pageInfo.totalElements || 0

  const handleSubmit = () => {
    if (newComment.trim() && !isCreateCommentPending) {
      createCommentMutate(
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
    createCommentMutate({ parentId, content })
  }

  const handleEdit = (commentId: number, content: string) => {
    updateCommentMutate({ commentId, content })
  }

  const handleDelete = async (commentId: number) => {
    const confirmed = await confirm({
      title: '댓글 삭제',
      description: '이 댓글을 삭제하시겠습니까?\n삭제된 댓글은 복구할 수 없습니다.',
      confirmText: '삭제',
      cancelText: '취소',
      variant: 'destructive',
    })

    if (confirmed) {
      deleteCommentMutate(commentId)
    }
  }

  return (
    <Card className={`${className || ''} pb-0 md:pb-6`}>
      <CardHeader>
        <div className='flex items-center justify-between mb-5'>
          <h3 className='text-xl font-semibold'>댓글</h3>
          {totalComments > 0 && <span className='text-sm text-neutral-500'>{totalComments}개</span>}
        </div>
      </CardHeader>
      <CardContent className='space-y-6'>
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
                <CommentItem
                  key={comment.commentId}
                  comment={comment}
                  onReply={handleReply}
                  currentUserId={user?.userId}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}

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

        {/* 댓글 입력창 - 모바일 */}
        <div className='md:hidden'>
          <Input
            placeholder='이 추천사에 답글 남기기'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSubmit()
              }
            }}
            disabled={isCreateCommentPending}
            rightElement={
              <button
                type='button'
                onClick={handleSubmit}
                disabled={!newComment.trim() || isCreateCommentPending}
                className='disabled:opacity-40'
              >
                <ArrowRight className='size-4 text-neutral-900' />
              </button>
            }
          />
        </div>

        {/* 댓글 입력창 - 데스크톱 */}
        <div className='hidden md:block'>
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
            disabled={isCreateCommentPending}
          />
          <div className='flex justify-end'>
            <Button
              size='sm'
              onClick={handleSubmit}
              disabled={!newComment.trim() || isCreateCommentPending}
            >
              {isCreateCommentPending ? '작성 중...' : '댓글 작성'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CommentSection
