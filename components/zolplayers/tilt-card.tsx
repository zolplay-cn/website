'use client'
import type { ReactNode } from 'react'

import type { Zolplayer } from './datasource'
import { clsxm } from '@zolplay/utils'
import { useEffect, useState } from 'react'
import Tilt from 'react-parallax-tilt'

export function TiltCard({ children, zolplayer }: { children: ReactNode; zolplayer: Zolplayer }) {
  const [tiltEnabled, setTiltEnabled] = useState(true)
  // only enable tilt on non-mobile devices
  useEffect(() => {
    if (/Mobi|Android|iPhone|iPad/i.test(window.navigator.userAgent)) {
      setTiltEnabled(false)
    }
  }, [])

  return (
    <Tilt
      className={clsxm([
        'not-prose group flex flex-col justify-between rounded-none',
        'border-x border-(--grid-border-color) bg-stone-50 text-[var(--accent)] dark:bg-stone-900',
        '[--accent:var(--mb-accent)] dark:[--accent:var(--mb-accent-dark)]',
        'transform-3d',
        'with-separator z-50 hover:z-[51]',
      ])}
      style={{
        '--mb-accent': zolplayer.portrait.palette.background.light,
        '--mb-accent-dark': zolplayer.portrait.palette.background.dark,
      }}
      tiltEnable={tiltEnabled}
      perspective={1000}
      scale={1.05}
      glareEnable={false}
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
    >
      {children}
    </Tilt>
  )
}
