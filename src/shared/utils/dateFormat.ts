/**
 * Format ISO date string to relative time
 * @param isoString - ISO 8601 date string (UTC)
 * @returns Relative time string (e.g., "Just now", "3 hours ago", "2024.01.20")
 */
export function formatRelativeTime(isoString: string): string {
  // 서버에서 오는 시간이 UTC 기준이므로, 타임존 정보가 없으면 Z를 붙여서 UTC로 파싱
  const date = new Date(isoString.endsWith('Z') ? isoString : isoString + 'Z')
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  // Less than 1 minute
  if (diffInSeconds < 60) {
    return '방금 전'
  }

  // Less than 1 hour
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`
  }

  // Less than 1 day
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`
  }

  // Less than 7 days
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `${diffInDays}일 전`
  }

  // More than 7 days: show date
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}.${month}.${day}`
}

/**
 * Build nested comment tree structure from flat array
 * @param comments - Flat array of comments
 * @returns Nested comment tree (top-level comments with replies)
 */
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

  // First pass: create all comment nodes
  comments.forEach((comment) => {
    commentMap.set(comment.commentId, {
      ...comment,
      replies: [],
    })
  })

  // Second pass: build tree structure
  comments.forEach((comment) => {
    const node = commentMap.get(comment.commentId)!

    if (comment.parentId === null || comment.parentId === 0) {
      // Top-level comment
      rootComments.push(node)
    } else {
      // Reply - add to parent's replies
      const parent = commentMap.get(comment.parentId)
      if (parent) {
        parent.replies.push(node)
      } else {
        // Parent not found, treat as top-level
        rootComments.push(node)
      }
    }
  })

  return rootComments
}
