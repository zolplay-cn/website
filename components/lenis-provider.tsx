'use client'
import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode
}

export function LenisProvider({ children }: Props) {
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const wrapperEl = (typeof window !== 'undefined' && document.getElementById('scroll-root')) || undefined
    const contentEl = (typeof window !== 'undefined' && document.getElementById('scroll-content')) || undefined

    // If a custom scroll container exists (Radix ScrollArea viewport), bind Lenis to it.
    // Otherwise, fall back to window scrolling.
    const lenis = new Lenis(
      wrapperEl
        ? {
            wrapper: wrapperEl,
            content: contentEl ?? undefined,
            autoRaf: true,
            smoothWheel: true,
            anchors: true,
            allowNestedScroll: true,
          }
        : {
            autoRaf: true,
            smoothWheel: true,
            anchors: true,
            allowNestedScroll: true,
          },
    )

    lenisRef.current = lenis

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Smoothly scroll to top on route changes
  useEffect(() => {
    if (!lenisRef.current) return
    lenisRef.current.scrollTo(0, { duration: 0.7 })
  }, [pathname])

  return <>{children}</>
}
