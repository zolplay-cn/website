'use client'
import dynamic from 'next/dynamic'

export const Toasts = dynamic(() => import('./toasts.tsx').then((mod) => mod.Toasts), {
  ssr: false,
})
