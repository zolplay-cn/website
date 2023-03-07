import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

const cnFont = fetch(
  new URL('../../public/assets/fonts/NotoSansSC-Black.otf', import.meta.url)
).then((res) => res.arrayBuffer())
const enFont = fetch(
  new URL('../../public/assets/fonts/Manrope-ExtraBold.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = searchParams.get('title') ?? ''
  const locale = searchParams.get('locale') ?? 'zh-CN'
  let fontData: ArrayBuffer
  switch (locale) {
    case 'en':
      fontData = await enFont
      break
    default:
      fontData = await cnFont
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundImage: `url(http://localhost:3333/assets/og-bg-${locale}.jpg)`,
        }}
      >
        <div
          style={{
            marginLeft: 50,
            marginRight: 50,
            display: 'flex',
            fontSize: 80,
            fontFamily: 'Zolplay',
            letterSpacing: '-0.065em',
            fontStyle: 'normal',
            color: '#1a1a1a',
            lineHeight: '80px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Zolplay',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  )
}
