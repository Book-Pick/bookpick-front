export interface EditorPickItem {
  title: string
  description: string
  curationIds: number[]
}

export const editorPickData: Record<string, EditorPickItem> = {
  '1': {
    title: '#필사하기 좋은 문장이 있는 책 모음',
    description: '아름다운 문장을 필사하며 마음을 정돈해보세요.',
    curationIds: [113, 114, 115, 116, 117, 118, 119, 120, 121],
  },
  '2': {
    title: '#INFP 책방지기의 겨울 도서',
    description: 'INFP 책방지기가 엄선한 겨울에 읽기 좋은 책들입니다.',
    curationIds: [140, 142, 144, 146, 147, 148, 150, 152, 153],
  },
  '3': {
    title: '#올해의 시작으로 읽기 좋은 에세이',
    description: '새해를 맞아 산뜻하게 읽기 좋은 에세이 모음입니다.',
    curationIds: [180, 183, 184, 191, 194, 196, 197, 198, 200],
  },
}
