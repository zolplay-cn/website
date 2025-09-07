'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import UnicornScene from 'unicornstudio-react/next'

interface Props {
  className?: string
  onEnterViewport?: () => void
  onExitViewport?: () => void
}

export default function WordmarkMorphScene({ className, onEnterViewport, onExitViewport }: Props) {
  // Start at a lower scale, then bump to 1 after initial load
  const [scale, setScale] = useState<number>(1)
  // Force remounts to kick the scene if initial load stalls
  const [attempt, setAttempt] = useState(0)
  const loadedRef = useRef(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleLoad = useCallback(() => {
    loadedRef.current = true
    setScale((prev) => (prev !== 1 ? 1 : prev))
  }, [])

  const handleError = useCallback(() => {
    if (attempt < 2) {
      setTimeout(() => setAttempt((a) => a + 1), 250)
    }
  }, [attempt])

  useEffect(() => {
    const t = setTimeout(() => {
      if (!loadedRef.current) setAttempt((a) => a + 1)
    }, 800)
    return () => clearTimeout(t)
  }, [])

  // Viewport intersection listeners
  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof window === 'undefined') return

    const dispatch = (type: 'unicorn:enter' | 'unicorn:exit') => {
      el.dispatchEvent(new CustomEvent(type, { bubbles: true }))
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          onEnterViewport?.()
          dispatch('unicorn:enter')
          if (!loadedRef.current) setAttempt((a) => a + 1)
        } else {
          onExitViewport?.()
          dispatch('unicorn:exit')
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.1 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [onEnterViewport, onExitViewport])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <UnicornScene
        key={`scene-${attempt}`}
        jsonFilePath='/assets/zolplay-wordmark-dither-morph.json'
        fps={60}
        dpi={1.5}
        scale={scale}
        lazyLoad={true}
        production={true}
        width='100%'
        height='100%'
        className={className}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  )
}
