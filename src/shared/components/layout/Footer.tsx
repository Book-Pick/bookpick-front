import { Facebook, Instagram } from 'lucide-react'
import { TwitterIcon } from '@/assets/icons/TwitterIcon'
import { Button } from '@/shared/ui/button'

export function Footer() {
  return (
    <footer className='bg-background border-t border-border py-12'>
      <div className='max-w-[1440px] mx-auto px-4'>
        <div className='flex flex-col lg:flex-row gap-8'>
          <div className='lg:w-2/5'>
            <div className='mb-6'>
              <h3 className='text-2xl font-semibold text-foreground mb-10'>BOOKPICK</h3>
              <p className='text-muted-foreground leading-normal tracking-tight mb-10'>
                "당신에게 꼭 맞는 책, 북픽이 찾아드릴게요."
                <br />
                지금의 기분, 상황, 취향을 바탕으로 추천받는 독서 큐레이션
              </p>
            </div>

            {/* 소셜 미디어 아이콘 */}
            <div className='flex gap-4'>
              <Button variant='ghost' size='icon' className='h-9 w-9 rounded-full shadow-xl'>
                <Facebook className='h-4 w-4' />
              </Button>
              <Button variant='ghost' size='icon' className='h-9 w-9 rounded-full shadow-xl'>
                <TwitterIcon className='h-4 w-4' />
              </Button>
              <Button variant='ghost' size='icon' className='h-9 w-9 rounded-full shadow-xl'>
                <Instagram className='h-4 w-4' />
              </Button>
            </div>
          </div>

          <div className='lg:w-3/5 grid grid-cols-2 md:grid-cols-3 gap-8'>
            <div>
              <h4 className='text-xl font-semibold text-foreground mb-10'>About</h4>
              <ul className='space-y-5'>
                <li>
                  <a
                    href='#'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    서비스 소개
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    팀 소개
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    자주 묻는 질문
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='text-xl font-semibold text-foreground mb-10'>Community</h4>
              <ul className='space-y-5'>
                <li>
                  <a
                    href='#'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    리뷰 & 추천
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    뉴스레터 구독
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    고객센터/문의하기
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='text-xl font-semibold text-foreground mb-10'>Socials</h4>
              <ul className='space-y-5'>
                <li>
                  <a
                    href='#'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    인스타그램
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    트위터/X
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    블로그/브런치
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
