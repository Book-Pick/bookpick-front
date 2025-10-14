export interface CurationData {
  id: number
  similarity: number
  title: string
  description: string
  curator: string
  curatorId: number
  likes: number
  comments: number
  views: number
  date: string
  tags: string[]
  price: number
  thumbnailImage?: string | null
  thumbnailColor?: string | null
}

export const mockCurationData: CurationData[] = [
  {
    id: 1,
    similarity: 95,
    title:
      '회사 다니면서 읽은 철학책들이 제 인생을 바꿔놨어요. 진짜 우울했던 시절에 도움된 책 추천해드려요',
    description:
      '저 정말 2년 전만 해도 매일 지하철에서 핸드폰만 보고, 점심시간엔 그냥 유튜브 보면서 시간 때우고 살았거든요. 그런데 우연히 도서관에서 집어든 철학책 한 권이 제 삶을 완전 바꿔놨어요. 처음엔 "철학? 그게 뭔 도움이 되겠어" 싶었는데, 읽다보니까 제가 왜 이렇게 허무하고 답답했는지 알게 되더라고요. 특히 직장에서 받는 스트레스, 상사랑 갈등, 미래에 대한 막연한 불안감... 이런 것들이 제가만 겪는 게 아니라 다들 겪는 보편적인 고민이었구나 하는 깨달음이 정말 위로가 되었어요. 지금은 출퇴근길에 음악 대신 오디오북 들으면서 하루하루가 좀 더 의미있게 느껴져서 행복해요.',
    curator: '사유하는 직장인',
    curatorId: 1,
    likes: 24,
    comments: 8,
    views: 127,
    date: '2024.01.15',
    tags: ['철학', '일상', '에세이'],
    price: 18500,
    thumbnailImage: '/images/sample_image_01.jpeg',
    thumbnailColor: null,
  },
  {
    id: 2,
    similarity: 92,
    title: '이별 후 울었던 밤들에 위로가 되어준 에세이 모음집',
    description:
      '작년에 3년 사귄었던 연인과 헤어지고 나서 정말 힘들었어요. 매일 밤에 울고, 아침에 일어나서도 아무거도 하기 싫고... 그럴 때 친구가 추천해준 에세이들이 정말 도움이 되더라고요. 누군가는 나보다 더 아프고 슬픔다가도 다시 일어나 날 새로이 맞이하는 법을 배웠고, 작은 일들에서도 행복을 찾는 방법을 알게 되었어요. 지금은 혼자서도 그나마 괜찮게 살고 있어요.',
    curator: '감성큐레이터',
    curatorId: 2,
    likes: 18,
    comments: 5,
    views: 89,
    date: '2024.01.12',
    tags: ['힐링', '에세이', '감성'],
    price: 15900,
    thumbnailImage: null,
    thumbnailColor: '#FEE2E2',
  },
  {
    id: 3,
    similarity: 89,
    title: '직장에서 인정받고 싶어서 읽기 시작한 자기계발서 베스트',
    description:
      '조기 진급하고 싶거나 매너리스가 되고 싶다거나 그런 마음은 아니었는데, 그냥 동기들이 저보다 회의에서 잘 말하고 주로리 끊는 모습이 살짝 부러웠어요. 그래서 처음에는 따라 해보려고 책 번호 점찍해놔던 것들이었는데, 의외로 정말 많이 배웠어요. 특히 시간 관리나 단순한 놀잕 스킬들이 생각보다 살아가는 데 진짜 필요한 거더라고요!',
    curator: '성장멘토',
    curatorId: 3,
    likes: 31,
    comments: 12,
    views: 203,
    date: '2024.01.10',
    tags: ['자기계발', '성장', '비즈니스'],
    price: 22000,
    thumbnailImage: '/images/sample_image_02.jpeg',
    thumbnailColor: null,
  },
  {
    id: 4,
    similarity: 87,
    title: '밤샘각오 각오하세요! 잠 못 자고 읽었던 추리소설 모음',
    description:
      '저는 평소에 책 잘 안 읽는 편인데 추리소설만큼은 예외예요. 한 번 잡으면 정말 끝까지 안 놓고 읽게 되더라고요. 그러다 보니 회사에서 엄청 졸리기도 하고, 주말에도 집에서 계속 읽으니까 엄마가 곱도 안 좋은 눈으로 보셨어요 ㅎㅎ 그래도 범인 찾는 재미가 그렇게 짜릿할 수가 없어요. 요즘 같이 열 받을 사람 찾고 있어요!',
    curator: '미스터리헌터',
    curatorId: 4,
    likes: 27,
    comments: 9,
    views: 156,
    date: '2024.01.08',
    tags: ['추리소설', '미스터리', '스릴러'],
    price: 17500,
    thumbnailImage: null,
    thumbnailColor: '#FFEDD5',
  },
  {
    id: 5,
    similarity: 85,
    title: '문과생이었던 제가 과학책에 빠진 이유 (수학 싫어하는 분들도 OK)',
    description:
      '저 진짜 학창시절에 수학, 과학 엄청 싫어했어요. 묘한 공식이나 외울 것 투성이라 사기에 지럻하다가... 사회인 되고 우연히 읽은 과학 대중서가 너무 재미있더라고요! 총 맞아 죽는 사람의 마지막 7분간에 일어나는 일들, DNA가 어떻게 사랑을 만드는지... 이런 것들이 살아가는 데 이렇게 연결되어 있다니 신기해요. 이제 일상에서 보는 모든 것들이 다 과학적으로 설명 가능하다는 게 신기해요!',
    curator: '과학탐험가',
    curatorId: 5,
    likes: 15,
    comments: 6,
    views: 78,
    date: '2024.01.05',
    tags: ['과학', '교양', '캐주얼'],
    price: 19800,
    thumbnailImage: '/images/sample_image_03.jpeg',
    thumbnailColor: null,
  },
  {
    id: 6,
    similarity: 83,
    title: '드라마 보다 재밌더라! 역사 싫어했던 제가 읽은 역사서',
    description:
      '전 원래 역사에 별로 관심 없었어요. 외울 것도 많고 지루하다고 생각했는데... 조선왕조 드라마 보다가 궁금해져서 책 몇 권 읽어보니까 진짜 드라마보다 재벌더라고요! 그대로 살았던 사람들의 이야기니까 더 리얼하고... 그때도 지금이나 비슷하게 사랑하고 배신하고 질투하고 그랬다는 게 신기해요. 요즘은 여행갈 때도 그 지역 역사 미리 찾아보고 가요!',
    curator: '역사탐구',
    curatorId: 1,
    likes: 21,
    comments: 7,
    views: 134,
    date: '2024.01.03',
    tags: ['역사', '인문학', '교양'],
    price: 16500,
    thumbnailImage: null,
    thumbnailColor: '#FEF3C7',
  },
  {
    id: 7,
    similarity: 81,
    title: '코로나 때 못 가본 여행지들을 책으로라도... 여행 에세이 추천',
    description:
      '코로나 터지고 나서 해외여행은 꿈도 못 꾸잖아요. 그래서 답답한 마음에 여행 에세이들 읽기 시작했는데 생각보다 너무 좋더라고요! 특히 작가가 직접 그 나라에서 생활하면서 쓴 글들 보면 가이드북에서는 절대 알 수 없는 현지 사람들의 진짜 모습을 볼 수 있어서 재밌어요. 읽다 보면 진짜 그 나라 가서 그 음식도 먹어보고 그 길도 걸어보고 싶어져요. 언젠가 코로나 끝나면 이 책들에 나온 곳들 다 가볼 거예요!',
    curator: '여행작가',
    curatorId: 2,
    likes: 19,
    comments: 4,
    views: 92,
    date: '2023.12.28',
    tags: ['여행', '세계문화', '토어'],
    price: 14900,
    thumbnailImage: '/images/sample_image_01.jpeg',
    thumbnailColor: null,
  },
  {
    id: 8,
    similarity: 79,
    title: '글쓰기 시작하고 싶은데 막막했던 저에게 용기 준 책들',
    description:
      '회사에서 맨날 보고서만 쓰다가 문득 "나도 뭔가 창작해보고 싶다"는 생각이 들었어요. 소설은 아니더라도 일기라도 좀 더 재미있게 써보고, 브런치 같은 곳에 글도 올려보고... 그런데 막상 하려니까 어디서부터 시작해야 할지 모르겠더라고요. 이런 책들 읽으면서 "아, 글쓰기도 기술이 있구나" "이런 식으로 접근하면 되는구나" 하는 걸 알게 되었어요. 아직 대단한 글은 못 쓰지만 예전보다는 훨씬 재미있게 글 쓰고 있어요!',
    curator: '창작멘토',
    curatorId: 3,
    likes: 13,
    comments: 3,
    views: 67,
    date: '2023.12.25',
    tags: ['창작', '예술', '자기계발'],
    price: 21000,
    thumbnailImage: null,
    thumbnailColor: '#ECFCCB',
  },
]
