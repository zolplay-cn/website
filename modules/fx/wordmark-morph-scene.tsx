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
export default function WordmarkMorphScene({ className, projectId = 'm51awCqQ9gmrAHsw8ot6' }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const initializedRef = useRef(false)
  const visibleRef = useRef(false)

  // Encapsulate init to guard multiple calls
  const tryInit = () => {
    if (initializedRef.current) return
    const w = typeof window !== 'undefined' ? (window as any) : null
    const us = w?.UnicornStudio
    if (us && typeof us.init === 'function' && visibleRef.current) {
      try {
        us.init()
        initializedRef.current = true
        w.__US_INITIALIZED = true
      } catch {
        // no-op
      }
    }
  }

  // Observe visibility and init when entering viewport (lazy-init)
  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof window === 'undefined') return

    const onIntersect: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          visibleRef.current = true
          tryInit()
        }
      }
    }

    const observer = new IntersectionObserver(onIntersect, {
      root: null,
      threshold: 0.1,
    })
    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={containerRef} className={className} style={{ width: '100%', height: '100%' }}>
      <div data-us-project={projectId} style={{ width: '100%', height: '100%' }} />

      {/* Load the Unicorn Studio SDK once and init on load */}
      <Script
        id='unicornstudio-sdk'
        src='https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.30/dist/unicornStudio.umd.js'
        strategy='afterInteractive'
        onLoad={() => {
          try {
            const w = window as any
            // Mark as loaded; actual init is triggered by visibility
            w.__US_LOADED = true
            // If already visible when the script loads, try to init now
            tryInit()
          } catch {
            // no-op
          }
        }}
      />
    </div>
  )
}
