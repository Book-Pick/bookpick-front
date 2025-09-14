export interface CuratorData {
  id: number
  name: string
  profileImage?: string
  favoriteGenres: string[]
  introduction: string
  isSubscribed: boolean
  subscriberCount: number
  curationCount: number
}

export const mockCuratorData: CuratorData[] = [
  {
    id: 1,
    name: '사유하는 직장인',
    profileImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    favoriteGenres: ['철학', '에세이', '인문학'],
    introduction: '출퇴근길 지하철에서 읽은 철학책들로 삶이 바뀐 평범한 회사원입니다.',
    isSubscribed: false,
    subscriberCount: 1234,
    curationCount: 15,
  },
  {
    id: 2,
    name: '감성큐레이터',
    favoriteGenres: ['에세이', '심리', '힐링'],
    introduction: '감성 독서를 사랑하는 독자입니다. 위로가 필요한 순간에 도움되는 책들을 소개해요.',
    isSubscribed: true,
    subscriberCount: 892,
    curationCount: 8,
  },
  {
    id: 3,
    name: '성장멘토',
    profileImage:
      'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face',
    favoriteGenres: ['자기계발', '비즈니스', '경영'],
    introduction: '더 나은 내일을 만들어가는 사람들과 함께 성장하고 싶어요.',
    isSubscribed: false,
    subscriberCount: 2156,
    curationCount: 23,
  },
  {
    id: 4,
    name: '미스터리헌터',
    favoriteGenres: ['추리소설', '미스터리', '스릴러'],
    introduction: '밤샘 각오하고 읽을 만한 추리소설들을 발굴해서 공유합니다!',
    isSubscribed: true,
    subscriberCount: 567,
    curationCount: 12,
  },
  {
    id: 5,
    name: '과학탐험가',
    favoriteGenres: ['과학', '교양', '수학'],
    introduction: '문과생도 재미있게 읽을 수 있는 과학책들을 찾아서 소개해드려요.',
    isSubscribed: false,
    subscriberCount: 743,
    curationCount: 9,
  },
]
