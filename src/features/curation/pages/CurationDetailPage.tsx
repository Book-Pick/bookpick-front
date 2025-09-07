import CuratorProfileCard from '../components/CuratorProfileCard'
import CurationPurchaseCard from '../components/CurationPurchaseCard'
import CommentSection from '../components/CommentSection'
import { mockCuratorData } from '@/data/mockCuratorData'
import { mockCurationData } from '@/data/mockCurationData'
import { mockCommentData, type CommentData } from '@/data/mockCommentData'
import { Badge, AspectRatio } from '@/shared/ui'
import sampleMap from '@/assets/images/sample_map.png'
import { useState } from 'react'

export default function CurationDetailPage() {
  const [comments, setComments] = useState<CommentData[]>(mockCommentData)

  const handleAddComment = (content: string) => {
    const newComment: CommentData = {
      id: Date.now(),
      author: '현재 사용자',
      authorId: 999,
      content,
      date: new Date()
        .toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
        .replace(/\./g, '.')
        .replace(/\s/g, ''),
      likes: 0,
      isLiked: false,
      replies: [],
    }
    setComments([newComment, ...comments])
  }

  const handleReply = (parentId: number, content: string) => {
    const newReply: CommentData = {
      id: Date.now(),
      author: '현재 사용자',
      authorId: 999,
      content,
      date: new Date()
        .toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
        .replace(/\./g, '.')
        .replace(/\s/g, ''),
      likes: 0,
      isLiked: false,
      replies: [],
    }

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === parentId ? { ...comment, replies: [...comment.replies, newReply] } : comment,
      ),
    )
  }

  const handleLike = (commentId: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          }
        }
        // 답글에서도 좋아요 처리
        return {
          ...comment,
          replies: comment.replies.map((reply) =>
            reply.id === commentId
              ? {
                  ...reply,
                  isLiked: !reply.isLiked,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                }
              : reply,
          ),
        }
      }),
    )
  }

  return (
    // 중복 제거하고 MainLayout으로 빼기
    <div className='max-w-[1440px] mx-auto px-14 py-16'>
      {/* 큐레이션 내용 */}
      <div className='mb-15'>
        <h2 className='text-4xl font-bold mb-15'>위로 받고 싶은 당신에게 추천드리는...</h2>
        {mockCuratorData.slice(0, 1).map((curator) => (
          <CuratorProfileCard
            key={curator.id}
            curatorId={curator.id}
            name={curator.name}
            favoriteGenres={curator.favoriteGenres}
            introduction={curator.introduction}
            isSubscribed={curator.isSubscribed}
          />
        ))}
        <h3 className='text-2xl font-semibold my-12'>오늘, 나에게 작은 위로가 필요하다면</h3>
        <p className='text-xl leading-normal mb-12'>
          어른이 된다는 건 괜찮지 않아도 괜찮은 척하는 법을 배우는 과정일지도 모릅니다. 이 책은 그런
          우리에게 '굳이 애쓰지 않아도 괜찮다'고, '너는 너 자체로 충분하다'고 다정하게 속삭여줍니다.
          특히 저는 주인공이 실패를 딛고 일어서는 장면에서 큰 감동을 받았습니다. 화려한 성공기가
          아니라, 서툴지만 한 걸음씩 나아가는 모습이 마치 내 이야기 같아서 몇 번이고 그 페이지를
          다시 읽었습니다.
        </p>
        <div>
          <Badge key={1} variant='text' size='xs' className='text-base'>
            #에세이
          </Badge>
          <Badge key={1} variant='text' size='xs' className='text-base'>
            #위로
          </Badge>
          <Badge key={1} variant='text' size='xs' className='text-base'>
            #성장
          </Badge>
        </div>
      </div>
      {/* 큐레이션 구매 정보 */}
      {mockCurationData.slice(0, 1).map((curation) => (
        <CurationPurchaseCard
          key={curation.id}
          curationId={curation.id}
          price={curation.price}
          className='bg-neutral-100'
        />
      ))}
      {/* 지도 */}
      <div className='mt-16 mb-8'>
        <AspectRatio ratio={2} className='w-full rounded-2xl overflow-hidden shadow-lg'>
          <img
            src={sampleMap}
            alt='책을 읽기 좋은 카페와 서점이 표시된 지도'
            className='w-full h-full object-cover'
          />
        </AspectRatio>
      </div>

      {/* 댓글 및 피드백 */}
      <CommentSection
        comments={comments}
        onAddComment={handleAddComment}
        onReply={handleReply}
        onLike={handleLike}
        className='mt-12'
      />
    </div>
  )
}
