// 랜덤 닉네임 생성에 사용되는 동물 이름 목록
export const ANIMALS = [
  '꾀꼬리',
  '참새',
  '까치',
  '비둘기',
  '독수리',
  '부엉이',
  '앵무새',
  '제비',
  '고래',
  '돌고래',
  '펭귄',
  '나비',
  '사슴',
  '토끼',
  '여우',
  '다람쥐',
  '햄스터',
  '고양이',
  '강아지',
  '거북이',
]

/**
 * 랜덤 닉네임을 생성합니다.
 * 형식: {동물이름}{100-999 사이의 숫자}
 * 예시: 꾀꼬리123, 고양이456
 */
export const generateRandomNickname = (): string => {
  const randomAnimal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)]
  const randomNumber = Math.floor(Math.random() * 900) + 100 // 100-999

  return `${randomAnimal}${randomNumber}`
}
