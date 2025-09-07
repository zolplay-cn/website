'use client'

import Script from 'next/script'
import { useEffect, useRef } from 'react'

interface Props {
  className?: string
  // Allow overriding the Unicorn Studio project id if needed
  projectId?: string
}

/**
 * WordmarkMorphScene
 *
 * Next.js-friendly client component that integrates Unicorn Studio JS SDK
 * without relying on unicornstudio-react. It loads the SDK via next/script,
 * initializes once it is available, and supports multiple mounts safely.
 */
export default function WordmarkMorphScene({ className }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Initialize if SDK already present (e.g., loaded elsewhere in the app)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const us: any = (window as any).UnicornStudio
    if (us && typeof us.init === 'function') {
      try {
        us.init()
      } catch {}
    }
  }, [])

  return (
    <div ref={containerRef} className={className} style={{ width: '100%', height: '100%' }}>
      <div data-us-project-src='/assets/zolplay-wordmark-dither-morph.json' style={{ width: '100%', height: '100%' }} />

      {/* Load the Unicorn Studio SDK once and init on load */}
      <Script
        id='unicornstudio-sdk'
        src='https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.30/dist/unicornStudio.umd.js'
        strategy='afterInteractive'
        onLoad={() => {
          try {
            const w = window as any
            if (!w.__US_INITIALIZED && w.UnicornStudio && typeof w.UnicornStudio.init === 'function') {
              w.UnicornStudio.init()
              w.__US_INITIALIZED = true
            }
          } catch {
            // no-op
          }
        }}
      />
    </div>
  )
}
