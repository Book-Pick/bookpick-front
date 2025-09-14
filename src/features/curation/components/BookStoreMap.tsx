import { AspectRatio } from '@/shared/ui'

const BookStoreMap = () => {
  return (
    <>
      <div className='mt-16 mb-8'>
        <AspectRatio ratio={2} className='w-full rounded-2xl border-none overflow-hidden shadow-lg'>
          <div className='w-full h-full border-none'>
            <a
              href='https://map.kakao.com/?urlX=493980&urlY=1132955&urlLevel=3&map_type=TYPE_MAP&map_hybrid=false'
              target='_blank'
              rel='noopener noreferrer'
              className='block w-full h-full'
            >
              <img
                width='504'
                height='310'
                src='https://map2.daum.net/map/mapservice?FORMAT=PNG&SCALE=2.5&MX=493980&MY=1132955&S=0&IW=504&IH=310&LANG=0&COORDSTM=WCONGNAMUL&logo=kakao_logo'
                alt='카카오맵'
                className='w-full h-full object-cover'
              />
            </a>
            <div
              className='hidden'
              style={{
                overflow: 'hidden',
                padding: '7px 11px',
                border: '1px solid #dfdfdf',
                borderColor: 'rgba(0,0,0,.1)',
                borderRadius: '0 0 2px 2px',
                backgroundColor: '#f9f9f9',
                width: '482px',
              }}
            >
              <strong style={{ float: 'left' }}>
                <img
                  src='//t1.daumcdn.net/localimg/localimages/07/2018/pc/common/logo_kakaomap.png'
                  width='72'
                  height='16'
                  alt='카카오맵'
                />
              </strong>
              <div style={{ float: 'right', position: 'relative' }}>
                <a
                  style={{
                    fontSize: '12px',
                    textDecoration: 'none',
                    float: 'left',
                    height: '15px',
                    paddingTop: '1px',
                    lineHeight: '15px',
                    color: '#000',
                  }}
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://map.kakao.com/?urlX=493980&urlY=1132955&urlLevel=3&map_type=TYPE_MAP&map_hybrid=false'
                >
                  지도 크게 보기
                </a>
              </div>
            </div>
          </div>
        </AspectRatio>
      </div>
    </>
  )
}

export default BookStoreMap
