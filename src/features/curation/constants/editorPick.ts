export interface EditorPickItem {
  title: string
  description: string
  curationIds: number[]
}

export const editorPickData: Record<string, EditorPickItem> = {
  '1': {
    title: '#필사하기 좋은 문장이 있는 책 모음',
    description: '아름다운 문장을 필사하며 마음을 정돈해보세요.',
    curationIds: [125, 126, 128, 129, 130, 132, 133, 135, 137, 138, 139, 142],
  },
  '2': {
    title: '#INFP 감성 겨울 도서 모음',
    description: 'INFP라면 마음에 꼭 맞는 책을 찾아보세요.',
    curationIds: [124, 131, 136, 141, 143, 144, 146, 148, 149, 150, 151, 152],
  },
  '3': {
    title: '#올해의 시작으로 읽기 좋은 책 모음',
    description: '새해를 맞아 산뜻하게 읽기 좋은 책을 찾아보세요.',
    curationIds: [127, 134, 140, 145, 147, 153, 154, 161, 162, 167, 174, 175],
  },
}
