import { ImageResponse } from '@vercel/og'
import { i18n } from '~/i18n'
import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

const enFont = fetch(
  new URL('../../public/assets/fonts/DMSans-Light.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = searchParams.get('title') ?? ''
  const subtitle = searchParams.get('subtitle') ?? ''
  const locale = searchParams.get('locale') ?? 'zh-CN'
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
          backgroundImage: `url(https://zolplay.com/assets/og-bg-${locale}.jpg)`,
        }}
      >
        {subtitle && (
          <div
            style={{
              position: 'absolute',
              top: 58,
              left: 140,
              fontFamily: 'Zolplay',
              fontSize: 30,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: '#111111',
              opacity: 0.4,
            }}
          >
            {`/ ${subtitle}`}
          </div>
        )}
        <div
          style={{
            marginTop: 60,
            marginLeft: 50,
            paddingRight: locale === i18n.defaultLocale ? 450 : 200,
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
    }
  )
}
