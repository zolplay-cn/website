/* eslint-disable @next/next/no-img-element */
/* eslint-disable node/prefer-global/process */
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

interface OpenGraphImageProps {
  text: string
  locale: string
}

export async function OpenGraphImageTemplate({ text, locale }: OpenGraphImageProps) {
  const font = await readFile(join(process.cwd(), 'app/_fonts/DMSans-Light.ttf'))
  const bgImageData = await readFile(join(process.cwd(), 'public/assets/og-bg.jpg'))
  const bgImageSrc = Uint8Array.from(bgImageData).buffer

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
        }}
      >
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'transparent',
          }}
        >
          <img
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            src={bgImageSrc as any}
            width={1200}
            height={630}
            alt='Zolplay Banner'
          />
        </div>
        <div
          style={{
            marginLeft: 50,
            marginTop: 60,
            paddingRight: 450,
            display: 'flex',
            fontSize: 78,
            fontFamily: 'ZolplaySans',
            letterSpacing: '-0.065em',
            fontStyle: 'normal',
            color: '#1a1a1a',
            lineHeight: '86px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {text}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: 'ZolplaySans', data: font, style: 'normal', weight: 400 }],
    },
  )
}
