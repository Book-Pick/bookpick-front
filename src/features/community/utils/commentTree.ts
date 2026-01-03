export interface CommentTreeNode {
  commentId: number
  parentId: number | null
  curationId?: number
  userId?: number
  nickname: string
  profileImageUrl: string | null
  content: string
  createdAt: string
  updatedAt: string | null
  replies: CommentTreeNode[]
}

/**
 * 플랫(Flat)한 배열의 댓글을 트리 구조로 변환
 * @param comments - 플랫(Flat)한 배열의 댓글 목록
 * @returns 대댓글이 포함된 트리 구조의 댓글 목록
 */
export function buildCommentTree(
  comments: Array<{
    commentId: number
    parentId: number | null
    curationId?: number
    userId?: number
    nickname: string
    profileImageUrl: string | null
    content: string
    createdAt: string
    updatedAt: string | null
  }>,
): CommentTreeNode[] {
  const commentMap = new Map<number, CommentTreeNode>()
  const rootComments: CommentTreeNode[] = []

  // 모든 댓글 노드 생성
  comments.forEach((comment) => {
    commentMap.set(comment.commentId, {
      ...comment,
      replies: [],
    })
  })

  // 트리 구조 생성
  comments.forEach((comment) => {
    const node = commentMap.get(comment.commentId)!

    if (comment.parentId === null || comment.parentId === 0) {
      rootComments.push(node)
    } else {
      const parent = commentMap.get(comment.parentId)
      if (parent) {
        parent.replies.push(node)
      } else {
        // 부모를 찾을 수 없으면 최상위로 처리
        rootComments.push(node)
      }
    }
  })

  return rootComments
}
