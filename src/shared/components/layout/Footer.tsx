// import { Facebook, Twitter, Instagram } from 'lucide-react'
import { Button } from '@/shared/ui/button'

export function Footer() {
  return (
    <footer className='bg-background border-t border-border py-12'>
      <div className='max-w-[1200px] mx-auto px-4'>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* 좌측 40% - 로고, 슬로건, 소셜 링크 */}
          <div className='lg:w-2/5'>
            <div className='mb-6'>
              <h3 className='text-2xl font-bold text-foreground mb-3'>BookPick</h3>
              <p className='text-muted-foreground text-sm leading-relaxed'>
                당신에게 꼭 맞는 책을 찾아드립니다.
                <br />
                지금의 기분, 상황, 취향을 바탕으로 하는
                <br />
                개인화된 독서 큐레이션 서비스
              </p>
            </div>

            {/* 소셜 미디어 아이콘 */}
            <div className='flex gap-3'>
              <Button variant='outline' size='icon' className='h-10 w-10'>
                {/* <Facebook className='h-4 w-4' /> */}
                <span className='sr-only'>Facebook</span>
              </Button>
              <Button variant='outline' size='icon' className='h-10 w-10'>
                {/* <Twitter className='h-4 w-4' /> */}
                <span className='sr-only'>Twitter</span>
              </Button>
              <Button variant='outline' size='icon' className='h-10 w-10'>
                {/* <Instagram className='h-4 w-4' /> */}
                <span className='sr-only'>Instagram</span>
              </Button>
            </div>
          </div>

          {/* 우측 60% - 링크 섹션들 */}
          <div className='lg:w-3/5 grid grid-cols-2 md:grid-cols-3 gap-8'>
            <div>
              <h4 className='text-sm font-semibold text-foreground mb-4'>서비스</h4>
              <ul className='space-y-3'>
                <li>
                  <a
                    href='#'
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                    큐레이션 받기
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                    인기 큐레이션
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                    큐레이터 찾기
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                    북리뷰
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className='text-sm font-semibold text-foreground mb-4'>고객지원</h4>
              <ul className='space-y-3'>
                <li>
                  <a
                    href='#'
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                    고객센터
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                    이용약관
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                    개인정보처리방침
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className='text-sm font-semibold text-foreground mb-4'>회사</h4>
              <ul className='space-y-3'>
                <li>
                  <a
                    href='#'
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                    회사소개
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                    채용정보
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                    보도자료
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                    제휴문의
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 하단 구분선 및 저작권 */}
        <div className='border-t border-border mt-12 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-xs text-muted-foreground'>© 2025 BookPick. All rights reserved.</p>
            <p className='text-xs text-muted-foreground'>
              문의: support@bookpick.co.kr | 대표: 북픽 | 사업자등록번호: 123-45-67890
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
