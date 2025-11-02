/**
 * 큐레이션 API 목업 데이터 - API 연결 후 삭제 예정
 */

import type {
  ReadingPreference,
  Curation,
  SetReadingPreferenceResponse,
  GetReadingPreferenceResponse,
  UpdateReadingPreferenceResponse,
  GetCurationsResponse,
  CreateCurationResponse,
  SaveCurationResponse,
  UpdateCurationResponse,
  DeleteCurationResponse,
} from '../types/curation.types'

// 목업 독서 취향 데이터 (API 스펙에 맞춤)
export const mockReadingPreference: ReadingPreference = {
  preferenceId: 1,
  mbti: 'INFJ',
  favoriteBooks: ['데미안', '어린왕자', '1984'],
  authors: ['무라카미 하루키', '김영하'],
  moods: ['퇴근 후', '카페', '침대에서'],
  readingHabits: ['한 번에 완독하는 편', '밑줄 긋거나 형광펜으로 표시하는 편'],
  genres: ['소설', '에세이', '심리학'],
  keywords: ['위로', '성장', '공감'],
  trends: ['몰입형', '감성적', '깊이 있는 사색'],
}

// 목업 큐레이션 데이터
export const mockCurations: Curation[] = [
  {
    id: 1,
    userId: 1,
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
    tags: ['철학', '일상', '에세이'],
    price: 18500,
    thumbnailImage: '/images/sample_image_01.jpeg',
    thumbnailColor: null,
    status: 'published',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 2,
    userId: 2,
    similarity: 92,
    title: '이별 후 울었던 밤들에 위로가 되어준 에세이 모음집',
    description:
      '작년에 3년 사귄었던 연인과 헤어지고 나서 정말 힘들었어요. 매일 밤에 울고, 아침에 일어나서도 아무거도 하기 싫고... 그럴 때 친구가 추천해준 에세이들이 정말 도움이 되더라고요. 누군가는 나보다 더 아프고 슬픔다가도 다시 일어나 날 새로이 맞이하는 법을 배웠고, 작은 일들에서도 행복을 찾는 방법을 알게 되었어요. 지금은 혼자서도 그나마 괜찮게 살고 있어요.',
    curator: '감성큐레이터',
    curatorId: 2,
    likes: 18,
    comments: 5,
    views: 89,
    tags: ['힐링', '에세이', '감성'],
    price: 15900,
    thumbnailImage: null,
    thumbnailColor: '#FEE2E2',
    status: 'published',
    createdAt: '2024-01-12T10:00:00Z',
    updatedAt: '2024-01-12T10:00:00Z',
  },
  {
    id: 3,
    userId: 3,
    similarity: 89,
    title: '직장에서 인정받고 싶어서 읽기 시작한 자기계발서 베스트',
    description:
      '조기 진급하고 싶거나 매너리스가 되고 싶다거나 그런 마음은 아니었는데, 그냥 동기들이 저보다 회의에서 잘 말하고 주로리 끊는 모습이 살짝 부러웠어요. 그래서 처음에는 따라 해보려고 책 번호 점찍해놔던 것들이었는데, 의외로 정말 많이 배웠어요. 특히 시간 관리나 단순한 놀잕 스킬들이 생각보다 살아가는 데 진짜 필요한 거더라고요!',
    curator: '성장멘토',
    curatorId: 3,
    likes: 31,
    comments: 12,
    views: 203,
    tags: ['자기계발', '성장', '비즈니스'],
    price: 22000,
    thumbnailImage: '/images/sample_image_02.jpeg',
    thumbnailColor: null,
    status: 'draft',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z',
  },
  {
    id: 4,
    userId: 4,
    similarity: 87,
    title: '밤샘각오 각오하세요! 잠 못 자고 읽었던 추리소설 모음',
    description:
      '저는 평소에 책 잘 안 읽는 편인데 추리소설만큼은 예외예요. 한 번 잡으면 정말 끝까지 안 놓고 읽게 되더라고요. 그러다 보니 회사에서 엄청 졸리기도 하고, 주말에도 집에서 계속 읽으니까 엄마가 곱도 안 좋은 눈으로 보셨어요 ㅎㅎ 그래도 범인 찾는 재미가 그렇게 짜릿할 수가 없어요. 요즘 같이 열 받을 사람 찾고 있어요!',
    curator: '미스터리헌터',
    curatorId: 4,
    likes: 27,
    comments: 9,
    views: 156,
    tags: ['추리소설', '미스터리', '스릴러'],
    price: 17500,
    thumbnailImage: null,
    thumbnailColor: '#FFEDD5',
    status: 'published',
    createdAt: '2024-01-08T10:00:00Z',
    updatedAt: '2024-01-08T10:00:00Z',
  },
  {
    id: 5,
    userId: 5,
    similarity: 85,
    title: '문과생이었던 제가 과학책에 빠진 이유 (수학 싫어하는 분들도 OK)',
    description:
      '저 진짜 학창시절에 수학, 과학 엄청 싫어했어요. 묘한 공식이나 외울 것 투성이라 사기에 지럻하다가... 사회인 되고 우연히 읽은 과학 대중서가 너무 재미있더라고요! 총 맞아 죽는 사람의 마지막 7분간에 일어나는 일들, DNA가 어떻게 사랑을 만드는지... 이런 것들이 살아가는 데 이렇게 연결되어 있다니 신기해요. 이제 일상에서 보는 모든 것들이 다 과학적으로 설명 가능하다는 게 신기해요!',
    curator: '과학탐험가',
    curatorId: 5,
    likes: 15,
    comments: 6,
    views: 78,
    tags: ['과학', '교양', '캐주얼'],
    price: 19800,
    thumbnailImage: '/images/sample_image_03.jpeg',
    thumbnailColor: null,
    status: 'published',
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-05T10:00:00Z',
  },
  {
    id: 6,
    userId: 1,
    similarity: 83,
    title: '드라마 보다 재밌더라! 역사 싫어했던 제가 읽은 역사서',
    description:
      '전 원래 역사에 별로 관심 없었어요. 외울 것도 많고 지루하다고 생각했는데... 조선왕조 드라마 보다가 궁금해져서 책 몇 권 읽어보니까 진짜 드라마보다 재벌더라고요! 그대로 살았던 사람들의 이야기니까 더 리얼하고... 그때도 지금이나 비슷하게 사랑하고 배신하고 질투하고 그랬다는 게 신기해요. 요즘은 여행갈 때도 그 지역 역사 미리 찾아보고 가요!',
    curator: '역사탐구',
    curatorId: 1,
    likes: 21,
    comments: 7,
    views: 134,
    tags: ['역사', '인문학', '교양'],
    price: 16500,
    thumbnailImage: null,
    thumbnailColor: '#FEF3C7',
    status: 'published',
    createdAt: '2024-01-03T10:00:00Z',
    updatedAt: '2024-01-03T10:00:00Z',
  },
  {
    id: 7,
    userId: 2,
    similarity: 81,
    title: '코로나 때 못 가본 여행지들을 책으로라도... 여행 에세이 추천',
    description:
      '코로나 터지고 나서 해외여행은 꿈도 못 꾸잖아요. 그래서 답답한 마음에 여행 에세이들 읽기 시작했는데 생각보다 너무 좋더라고요! 특히 작가가 직접 그 나라에서 생활하면서 쓴 글들 보면 가이드북에서는 절대 알 수 없는 현지 사람들의 진짜 모습을 볼 수 있어서 재밌어요. 읽다 보면 진짜 그 나라 가서 그 음식도 먹어보고 그 길도 걸어보고 싶어져요. 언젠가 코로나 끝나면 이 책들에 나온 곳들 다 가볼 거예요!',
    curator: '여행작가',
    curatorId: 2,
    likes: 19,
    comments: 4,
    views: 92,
    tags: ['여행', '세계문화', '토어'],
    price: 14900,
    thumbnailImage: '/images/sample_image_01.jpeg',
    thumbnailColor: null,
    status: 'published',
    createdAt: '2023-12-28T10:00:00Z',
    updatedAt: '2023-12-28T10:00:00Z',
  },
  {
    id: 8,
    userId: 3,
    similarity: 79,
    title: '글쓰기 시작하고 싶은데 막막했던 저에게 용기 준 책들',
    description:
      '회사에서 맨날 보고서만 쓰다가 문득 "나도 뭔가 창작해보고 싶다"는 생각이 들었어요. 소설은 아니더라도 일기라도 좀 더 재미있게 써보고, 브런치 같은 곳에 글도 올려보고... 그런데 막상 하려니까 어디서부터 시작해야 할지 모르겠더라고요. 이런 책들 읽으면서 "아, 글쓰기도 기술이 있구나" "이런 식으로 접근하면 되는구나" 하는 걸 알게 되었어요. 아직 대단한 글은 못 쓰지만 예전보다는 훨씬 재미있게 글 쓰고 있어요!',
    curator: '창작멘토',
    curatorId: 3,
    likes: 13,
    comments: 3,
    views: 67,
    tags: ['창작', '예술', '자기계발'],
    price: 21000,
    thumbnailImage: null,
    thumbnailColor: '#ECFCCB',
    status: 'published',
    createdAt: '2023-12-25T10:00:00Z',
    updatedAt: '2023-12-25T10:00:00Z',
  },
  {
    id: 9,
    userId: 6,
    similarity: 96,
    title: 'ㄹㅇ 인생책... 이거 안 읽으면 손해',
    description:
      '진심 레전드임ㅋㅋ 처음엔 그냥 심심해서 집어들었는데 3일만에 다 읽음. 밑줄 그은 거 보니까 책 반이 형광펜 칠해져 있더라 ㅠㅠ',
    curator: 'Gen_Z',
    curatorId: 6,
    likes: 42,
    comments: 15,
    views: 234,
    tags: ['핫템', '감동', '에세이'],
    price: 16000,
    thumbnailImage: null,
    thumbnailColor: '#E0E7FF',
    status: 'published',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z',
  },
  {
    id: 10,
    userId: 7,
    similarity: 77,
    title: '퇴근 후 30분 투자로 경제 감각 키우기',
    description:
      '본 큐레이션은 경제/금융 입문자를 위한 필독서 3권으로 구성되어 있습니다. 각 도서는 난이도별로 배치하였으며, 실생활에 적용 가능한 실용적 지식을 담고 있습니다. 투자 초보자부터 중급자까지 단계별로 학습할 수 있도록 선별하였습니다.',
    curator: '경제전문가',
    curatorId: 7,
    likes: 38,
    comments: 11,
    views: 189,
    tags: ['경제', '재테크', '투자'],
    price: 23500,
    thumbnailImage: '/images/sample_image_02.jpeg',
    thumbnailColor: null,
    status: 'published',
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z',
  },
  {
    id: 11,
    userId: 8,
    similarity: 91,
    title: '새벽 4시까지 울었던 소설',
    description: '눈물버튼 고장남',
    curator: '감성러버',
    curatorId: 8,
    likes: 56,
    comments: 23,
    views: 312,
    tags: ['소설', '감동', '힐링'],
    price: 14500,
    thumbnailImage: null,
    thumbnailColor: '#DBEAFE',
    status: 'published',
    createdAt: '2024-01-22T10:00:00Z',
    updatedAt: '2024-01-22T10:00:00Z',
  },
  {
    id: 12,
    userId: 9,
    similarity: 88,
    title: '이 책들을 추천하는 이유',
    description:
      '1. 실용성 → 바로 적용 가능한 내용들\n2. 가독성 → 어렵지 않게 쓰여있음\n3. 깊이감 → 단순 자기계발이 아닌 본질적 성찰 가능\n4. 가성비 → 이 가격에 이 정도 통찰력이면 충분\n\n특히 20-30대 직장인들에게 강추합니다.',
    curator: '실용주의자',
    curatorId: 9,
    likes: 29,
    comments: 7,
    views: 145,
    tags: ['자기계발', '실용서', '추천'],
    price: 19900,
    thumbnailImage: '/images/sample_image_03.jpeg',
    thumbnailColor: null,
    status: 'draft',
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z',
  },
  {
    id: 13,
    userId: 10,
    similarity: 84,
    title: '왜 우리는 이 책을 읽어야 할까요?',
    description:
      '질문 하나 던져볼게요. 여러분은 하루에 몇 번이나 "행복하다"고 느끼시나요? 저는 이 책을 읽기 전까지 단 한 번도 생각해본 적 없었어요. 이 책은 바로 그 질문에서 시작합니다.',
    curator: '질문하는사람',
    curatorId: 10,
    likes: 17,
    comments: 4,
    views: 98,
    tags: ['철학', '에세이', '사색'],
    price: 17000,
    thumbnailImage: null,
    thumbnailColor: '#FED7AA',
    status: 'published',
    createdAt: '2024-01-14T10:00:00Z',
    updatedAt: '2024-01-14T10:00:00Z',
  },
  {
    id: 14,
    userId: 11,
    similarity: 93,
    title: '30대 중반, 뒤돌아보니 후회만 가득했던 나에게',
    description:
      '서른다섯. 결혼도 안 했고, 집도 없고, 저축도 별로 없어요. 친구들 만나면 자꾸 비교되고 초라해지더라고요. 그러다 이 책들을 만났어요. "너는 지금도 충분히 잘하고 있어"라고 말해주는 것 같았어요. 남들과 비교하지 말고, 내 속도로 가면 된다는 걸 배웠습니다. 아직도 불안하지만, 예전보다는 나 자신을 좀 더 사랑하게 됐어요.',
    curator: '서른다섯',
    curatorId: 11,
    likes: 67,
    comments: 28,
    views: 401,
    tags: ['힐링', '에세이', '공감'],
    price: 15500,
    thumbnailImage: '/images/sample_image_01.jpeg',
    thumbnailColor: null,
    status: 'published',
    createdAt: '2024-01-21T10:00:00Z',
    updatedAt: '2024-01-21T10:00:00Z',
  },
  {
    id: 15,
    userId: 12,
    similarity: 74,
    title: '코딩 공부 시작하려는 분들께 (비전공자 환영)',
    description:
      '비전공자 출신 개발자입니다. 독학으로 공부해서 취업까지 했는데요, 그 과정에서 정말 도움 됐던 책들만 추려봤어요. 유튜브나 강의도 좋지만 책으로 기본기 다지는 게 진짜 중요해요. 이 책들 순서대로 보시면 됩니다!',
    curator: '코딩러너',
    curatorId: 12,
    likes: 44,
    comments: 19,
    views: 267,
    tags: ['개발', '프로그래밍', '입문'],
    price: 28000,
    thumbnailImage: null,
    thumbnailColor: '#D1FAE5',
    status: 'published',
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z',
  },
  {
    id: 16,
    userId: 13,
    similarity: 90,
    title: '커피 한 잔의 여유',
    description:
      '비 오는 일요일 오후, 창가 자리에 앉아 커피 한 잔과 함께 읽기 좋은 책들을 모았습니다. 서두르지 않아도 되는 시간, 그저 페이지를 넘기는 소리와 빗소리만 들리는 그런 순간을 위한 책들이에요.',
    curator: '카페지기',
    curatorId: 13,
    likes: 33,
    comments: 9,
    views: 176,
    tags: ['감성', '에세이', '힐링'],
    price: 16800,
    thumbnailImage: null,
    thumbnailColor: '#E9D5FF',
    status: 'published',
    createdAt: '2024-01-13T10:00:00Z',
    updatedAt: '2024-01-13T10:00:00Z',
  },
  {
    id: 17,
    userId: 14,
    similarity: 82,
    title: '회사 그만두고 싶은 사람 손🙋‍♀️ (feat. 퇴사 후 1년)',
    description:
      '작년에 7년 다니던 회사 때려치우고 나왔어요ㅋㅋㅋ 다들 미쳤다고 했는데 저는 이 책들 읽고 용기 얻어서 결심했거든요? 지금? 프리랜서로 일하면서 개꿀입니다ㅎㅎ 물론 불안하긴 한데 그래도 행복도는 10배 상승! 진지하게 고민 중이신 분들 읽어보세요.',
    curator: '자유인',
    curatorId: 14,
    likes: 51,
    comments: 31,
    views: 389,
    tags: ['퇴사', '자유', '용기'],
    price: 18900,
    thumbnailImage: '/images/sample_image_02.jpeg',
    thumbnailColor: null,
    status: 'published',
    createdAt: '2024-01-19T10:00:00Z',
    updatedAt: '2024-01-19T10:00:00Z',
  },
  {
    id: 18,
    userId: 15,
    similarity: 76,
    title: '육아맘이 추천하는 아이와 함께 읽는 그림책',
    description:
      '5살 아들 키우는 엄마예요. 매일 밤 잠들기 전에 책 읽어주는데 아이도 좋아하고 저도 힐링돼요. 어른이 읽어도 감동적인 그림책들이 많더라고요. 아이와 함께 성장하는 느낌?',
    curator: '육아맘',
    curatorId: 15,
    likes: 25,
    comments: 12,
    views: 142,
    tags: ['육아', '그림책', '힐링'],
    price: 13500,
    thumbnailImage: null,
    thumbnailColor: '#FBCFE8',
    status: 'published',
    createdAt: '2024-01-11T10:00:00Z',
    updatedAt: '2024-01-11T10:00:00Z',
  },
  {
    id: 19,
    userId: 1,
    similarity: 86,
    title: '불면증으로 고생하는 분들께. 이 책들이 도움됐어요',
    description:
      '밤마다 천장만 바라보던 날들이 2년 넘게 계속됐어요. 수면제도 먹어보고 여러 방법 시도했는데 별 효과 없더라고요. 그러다 명상과 심리학 관련 책들을 읽기 시작했는데, 조금씩 나아지는 게 느껴졌어요. 특히 잠들기 전에 읽으면 마음이 차분해져요. 지금은 많이 좋아졌어요.',
    curator: '불면증탈출',
    curatorId: 1,
    likes: 39,
    comments: 14,
    views: 221,
    tags: ['심리', '명상', '수면'],
    price: 20500,
    thumbnailImage: '/images/sample_image_03.jpeg',
    thumbnailColor: null,
    status: 'published',
    createdAt: '2024-01-09T10:00:00Z',
    updatedAt: '2024-01-09T10:00:00Z',
  },
  {
    id: 20,
    userId: 2,
    similarity: 94,
    title: '이번 생은 망했다 싶을 때 읽는 책',
    description:
      '제목 그대로입니다ㅋㅋ 취업 7번 떨어지고, 연애는 또 차이고, 통장엔 10만원... 진짜 이번 생 망한 줄 알았어요. 근데 이 책 읽고 "아 나만 그런 게 아니구나" "다들 이렇게 살다가 결국 괜찮아지는구나" 하는 위로를 받았어요. 지금 힘드신 분들, 같이 읽어요💪',
    curator: '희망찾기',
    curatorId: 2,
    likes: 73,
    comments: 34,
    views: 456,
    tags: ['위로', '힐링', '공감'],
    price: 16500,
    thumbnailImage: null,
    thumbnailColor: '#FEF3C7',
    status: 'published',
    createdAt: '2024-01-23T10:00:00Z',
    updatedAt: '2024-01-23T10:00:00Z',
  },
]

// API 응답 목업 데이터
export const mockSetReadingPreferenceResponse: SetReadingPreferenceResponse = {
  status: 200,
  message: '독서 취향이 성공적으로 설정되었습니다.',
  data: mockReadingPreference,
}

export const mockGetReadingPreferenceResponse: GetReadingPreferenceResponse = {
  status: 200,
  data: mockReadingPreference,
}

export const mockUpdateReadingPreferenceResponse: UpdateReadingPreferenceResponse = {
  status: 200,
  message: '독서 취향이 성공적으로 수정되었습니다.',
  data: mockReadingPreference,
}

export const mockGetCurationsResponse: GetCurationsResponse = {
  status: 200,
  data: {
    curations: mockCurations.filter((c) => c.status === 'published'),
    total: 20,
    page: 1,
    limit: 10,
  },
}

export const mockGetPersonalizedCurationsResponse: GetCurationsResponse = {
  status: 200,
  data: {
    curations: mockCurations.filter((c) => c.status === 'published'),
    total: 20,
    page: 1,
    limit: 10,
  },
}

export const mockGetCurationsByFieldResponse: GetCurationsResponse = {
  status: 200,
  data: {
    curations: mockCurations.filter((c) => c.status === 'published').slice(0, 1),
    total: 1,
    page: 1,
    limit: 10,
  },
}

export const mockCreateCurationResponse: CreateCurationResponse = {
  status: 201,
  message: '큐레이션이 성공적으로 작성되었습니다.',
  data: mockCurations[0],
}

export const mockSaveCurationResponse: SaveCurationResponse = {
  status: 200,
  message: '큐레이션이 성공적으로 저장되었습니다.',
  data: mockCurations[0],
}

export const mockUpdateCurationResponse: UpdateCurationResponse = {
  status: 200,
  message: '큐레이션이 성공적으로 수정되었습니다.',
  data: mockCurations[0],
}

export const mockGetMyCurationsResponse: GetCurationsResponse = {
  status: 200,
  data: {
    curations: mockCurations.filter((c) => c.userId === 1 && c.status === 'published'),
    total: 3,
    page: 1,
    limit: 10,
  },
}

export const mockGetMyDraftCurationsResponse: GetCurationsResponse = {
  status: 200,
  data: {
    curations: mockCurations.filter((c) => c.userId === 1 && c.status === 'draft'),
    total: 0,
    page: 1,
    limit: 10,
  },
}

export const mockDeleteCurationResponse: DeleteCurationResponse = {
  status: 200,
  message: '큐레이션이 성공적으로 삭제되었습니다.',
  data: null,
}

export const mockGetPopularCurationsResponse: GetCurationsResponse = {
  status: 200,
  data: {
    curations: mockCurations
      .filter((c) => c.status === 'published')
      .sort((a, b) => b.likes - a.likes),
    total: 18,
    page: 1,
    limit: 10,
  },
}

export const mockGetRecentCurationsResponse: GetCurationsResponse = {
  status: 200,
  data: {
    curations: mockCurations
      .filter((c) => c.status === 'published')
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()),
    total: 18,
    page: 1,
    limit: 10,
  },
}

export const mockGetBooksResponse = {
  status: 200,
  message: '책 검색 결과입니다.',
  data: {
    books: [
      {
        title: '1984',
        author: '조지 오웰',
        image: '/images/1984_thumbnail.jpeg',
      },
      {
        title: '데미안',
        author: '헤르만 헤세',
        image: '/images/demian_thumbnail.jpg',
      },
      {
        title: '어린 왕자',
        author: '앙투안 드 생텍쥐페리',
        image: '/images/little_prince_thumbnail.jpeg',
      },
    ],
    pageInfo: {
      currentPage: 1,
      totalPages: 5,
      totalElements: 45,
      hasNext: true,
    },
  },
}
