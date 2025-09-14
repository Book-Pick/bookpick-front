export interface CommentData {
  id: number
  author: string
  authorId: number
  profileImage?: string
  content: string
  date: string
  likes: number
  isLiked: boolean
  replies: CommentData[]
}

export const mockCommentData: CommentData[] = [
  {
    id: 1,
    author: '독서광 김민수',
    authorId: 101,
    profileImage:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
    content:
      '정말 좋은 큐레이션이에요! 특히 철학책 추천 부분이 마음에 들었습니다. 저도 비슷한 고민을 하고 있었는데 많은 도움이 되었어요.',
    date: '2024.01.20',
    likes: 12,
    isLiked: false,
    replies: [
      {
        id: 11,
        author: '사유하는 직장인',
        authorId: 1,
        content: '감사합니다! 같은 고민을 가진 분들께 도움이 되었다니 정말 기뻐요 ㅎㅎ',
        date: '2024.01.20',
        likes: 3,
        isLiked: false,
        replies: [],
      },
    ],
  },
  {
    id: 2,
    author: '책벌레다정',
    authorId: 102,
    content:
      '추천해주신 책들 중에 2권 정도 이미 읽어봤는데, 정말 인생 책이었어요. 나머지 책들도 꼭 읽어보려고 합니다!',
    date: '2024.01.19',
    likes: 8,
    isLiked: true,
    replies: [],
  },
  // {
  //   id: 3,
  //   author: '철학초보자',
  //   authorId: 103,
  //   profileImage:
  //     'https://images.unsplash.com/photo-1494790108755-2616b612b6fd?w=50&h=50&fit=crop&crop=face',
  //   content:
  //     '철학책은 너무 어려울 것 같아서 망설이고 있었는데, 이 큐레이션 보니까 도전해보고 싶어졌어요. 입문자도 읽기 쉬운 책 순서로 추천해주신 것 같아서 좋네요.',
  //   date: '2024.01.18',
  //   likes: 15,
  //   isLiked: false,
  //   replies: [
  //     {
  //       id: 31,
  //       author: '사유하는 직장인',
  //       authorId: 1,
  //       content:
  //         '처음 시작하시는 분들을 위해 쉬운 책부터 차례대로 정리했어요. 천천히 읽어보시면 분명 도움이 될 거예요!',
  //       date: '2024.01.18',
  //       likes: 5,
  //       isLiked: false,
  //       replies: [],
  //     },
  //     {
  //       id: 32,
  //       author: '철학러버',
  //       authorId: 104,
  //       content: '저도 처음엔 어려워했는데 이런 큐레이션으로 시작하면 정말 좋을 것 같아요. 화이팅!',
  //       date: '2024.01.19',
  //       likes: 2,
  //       isLiked: true,
  //       replies: [],
  //     },
  //   ],
  // },
]
