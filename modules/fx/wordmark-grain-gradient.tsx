/** @paper-design/shaders-react@0.0.52 */
'use client'

import { GrainGradient } from '@paper-design/shaders-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import wordmark from '~/public/assets/wordmark.png'

const MAX_OFFSET = 0.03

export default function WordmarkGrainGradient() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  // We keep target and displayed offsets to enable a smooth magnetic-feel lerp
  const targetRef = useRef({ x: 0, y: 0 })
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  const animate = useCallback(() => {
    // Smaller k = smoother, slower ease on hover-in
    const k = 0.03
    // Snap when very close to avoid micro jitter (relative to MAX_OFFSET)
    const eps = MAX_OFFSET * 0.02 // ~0.0006 with MAX_OFFSET=0.03
    setOffset((curr) => {
      const dx = targetRef.current.x - curr.x
      const dy = targetRef.current.y - curr.y
      const nx = Math.abs(dx) < eps ? targetRef.current.x : curr.x + dx * k
      const ny = Math.abs(dy) < eps ? targetRef.current.y : curr.y + dy * k
      return { x: nx, y: ny }
    })
    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [animate])

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width // 0..1
    const y = (e.clientY - rect.top) / rect.height // 0..1
    // Map to -1..1 then scale to MAX_OFFSET
    const mappedX = (x * 2 - 1) * MAX_OFFSET
    const mappedY = (y * 2 - 1) * MAX_OFFSET
    // Clamp to ±MAX_OFFSET
    const clamp = (v: number) => Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, v))
    targetRef.current = { x: clamp(mappedX), y: clamp(mappedY) }
  }, [])

  const handlePointerEnter = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const mappedX = (x * 2 - 1) * MAX_OFFSET
    const mappedY = (y * 2 - 1) * MAX_OFFSET
    const clamp = (v: number) => Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, v))
    const start = { x: clamp(mappedX), y: clamp(mappedY) }
    // Only set the target so we ease from current state (no snap on enter)
    targetRef.current = start
  }, [])

  const handlePointerLeave = useCallback(() => {
    // Ease back to center when leaving the area
    targetRef.current = { x: 0, y: 0 }
  }, [])

  return (
    <div
      ref={containerRef}
      className='w-full aspect-[3/1] contain-layout relative flex items-center justify-center'
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <GrainGradient
        className='w-full h-full bg-neutral-50 dark:bg-black dark:mix-blend-hard-light absolute inset-0'
        colors={['#29262A', '#E6E6E6', '#817F7E']}
        colorBack='#00000000'
        speed={0.83}
        scale={1}
        rotation={0}
        offsetX={offset.x}
        offsetY={offset.y}
        softness={0.86}
        intensity={0.15}
        noise={0.5}
        shape='wave'
      />
      <Image src={wordmark} alt='Zolplay Wordmark' className='invert-75 dark:invert-0 mix-blend-color-dodge w-10/12' />
    </div>
  )
}
