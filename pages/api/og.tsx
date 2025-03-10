import type { NextRequest } from 'next/server'
import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'edge',
}

const enFont = fetch(new URL('../../public/assets/fonts/DMSans-Light.ttf', import.meta.url)).then((res) =>
  res.arrayBuffer(),
)

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = searchParams.get('title') ?? ''
  const locale = searchParams.get('locale') ?? 'zh-CN'

  // og background image path
  const ogBgPath = `/assets/og-bg.jpg`

  let fontData: ArrayBuffer
  switch (locale) {
    default:
      fontData = await enFont
  }

  return new ImageResponse(
    (
      <div
        lang={locale}
        style={{
          position: 'relative',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          // eslint-disable-next-line node/prefer-global/process
          backgroundImage: `url(${process.env.NEXT_PUBLIC_DOMAIN || 'https://zolplay.com'}${ogBgPath})`,
        }}
      >
        <div
          style={{
            marginLeft: 50,
            marginTop: 60,
            paddingRight: 450,
            display: 'flex',
            fontSize: 78,
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
    },
  )
}
