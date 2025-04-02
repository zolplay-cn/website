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
        'not-prose group flex flex-col justify-between rounded-2xl p-2.5 md:p-4',
        'border border-stone-100 bg-white text-[var(--accent)] dark:border-stone-800 dark:bg-stone-900',
        '[--accent:var(--mb-accent)] dark:[--accent:var(--mb-accent-dark)]',
        'transform-3d',
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
