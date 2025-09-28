# UIPreview 페이지 컴포넌트 추가 가이드

UIPreview 페이지에 새로운 컴포넌트를 추가할 때 사용하는 가이드입니다.

## 🎯 **기본 사용법**

```
UIPreview 페이지에 새로운 컴포넌트를 추가해주세요.

**컴포넌트 정보:**
- 컴포넌트명: [컴포넌트명]
- import 경로: [import 경로] (예: @/shared/ui, @/features/curation/components/ComponentName)
- 설명: [컴포넌트 설명] (선택사항)

**추가 요구사항:**
1. 현재 페이지의 3개 탭 구조를 유지하세요:
   - 기본 컴포넌트 탭: shared/ui의 기본 UI 컴포넌트들
   - 인터랙티브 컴포넌트 탭: 사용자 상호작용이 있는 컴포넌트들
   - 기능별 컴포넌트 탭: features 폴더의 비즈니스 로직 컴포넌트들

2. 적절한 탭에 새로운 섹션을 추가하세요:
   - 섹션 제목: "컴포넌트명" (예: "Button", "CurationCard")
   - 섹션 설명: 컴포넌트의 용도와 특징
   - 다양한 variant, size, props 예시들
   - 인터랙티브한 예제 (필요한 경우)

3. 기존 코드 스타일을 유지하세요:
   - section className='bg-white rounded-lg p-6 shadow-sm'
   - h2 className='text-2xl font-bold mb-6'
   - 적절한 간격과 레이아웃
   - 반응형 그리드 사용

4. 필요한 경우 상태 관리 추가:
   - useState 훅 사용
   - 이벤트 핸들러 함수
   - 적절한 타입 정의

5. 린트 에러가 없도록 주의하세요:
   - 올바른 import 구문
   - 타입 안전성
   - 포맷팅 규칙 준수
```

## 📝 **사용 예시**

### 예시 1: 기본 컴포넌트 추가

```
컴포넌트명: Alert
import 경로: @/shared/ui
설명: 사용자에게 알림을 표시하는 컴포넌트
```

### 예시 2: 인터랙티브 컴포넌트 추가

```
컴포넌트명: Slider
import 경로: @/shared/ui
설명: 값 범위를 선택할 수 있는 슬라이더 컴포넌트
```

### 예시 3: 기능별 컴포넌트 추가

```
컴포넌트명: CommentItem
import 경로: @/features/curation/components/CommentItem
설명: 댓글을 표시하는 컴포넌트
```

## 🎨 **탭별 분류 가이드**

### 기본 컴포넌트 탭

- **적합한 컴포넌트**: Button, Input, Badge, Card, Textarea, Avatar, Alert, Progress 등
- **특징**: 기본적인 UI 요소, 정적 또는 단순한 상호작용
- **예시**: 다양한 variant, size, 상태 표시

### 인터랙티브 컴포넌트 탭

- **적합한 컴포넌트**: Toggle, Checkbox, Popover, Sheet, Tabs, Slider, Switch 등
- **특징**: 사용자 상호작용이 필요한 컴포넌트
- **예시**: 상태 변경, 이벤트 핸들링, 동적 동작

### 기능별 컴포넌트 탭

- **적합한 컴포넌트**: CurationCard, CuratorProfile, BookSearch, CommentItem 등
- **특징**: 비즈니스 로직이 포함된 복합 컴포넌트
- **예시**: 실제 데이터와 함께 사용, 복잡한 props

## 📋 **섹션 구조 템플릿**

```jsx
{
  /* ComponentName Section */
}
;<section className='bg-white rounded-lg p-6 shadow-sm'>
  <h2 className='text-2xl font-bold mb-6'>ComponentName</h2>
  <div className='space-y-4'>
    {/* 기본 예시 */}
    <div>
      <h3 className='text-lg font-semibold mb-3'>기본 사용법</h3>
      <ComponentName />
    </div>

    {/* 다양한 variant 예시 */}
    <div>
      <h3 className='text-lg font-semibold mb-3'>다양한 스타일</h3>
      <div className='flex flex-wrap gap-3'>
        <ComponentName variant='default' />
        <ComponentName variant='secondary' />
        <ComponentName variant='outline' />
      </div>
    </div>

    {/* 인터랙티브 예시 (필요한 경우) */}
    <div>
      <h3 className='text-lg font-semibold mb-3'>인터랙티브 예시</h3>
      <ComponentName value={value} onChange={setValue} />
    </div>
  </div>
</section>
```

## ⚠️ **주의사항**

1. **Import 구문**: 올바른 경로와 타입 import 사용
2. **상태 관리**: 필요한 경우 useState와 이벤트 핸들러 추가
3. **타입 안전성**: TypeScript 타입 에러 방지
4. **린트 규칙**: ESLint 규칙 준수
5. **반응형**: 모바일과 데스크톱에서 잘 보이도록 그리드 사용

## 🚀 **빠른 추가 방법**

1. **컴포넌트명만 알려주면**: 자동으로 적절한 탭과 섹션 생성
2. **import 경로까지 알려주면**: 정확한 import 구문으로 추가
3. **설명까지 알려주면**: 더 정확한 예시와 설명 추가

이 가이드를 사용하면 어떤 컴포넌트든 현재 페이지 구조에 맞게 자동으로 추가할 수 있습니다!
