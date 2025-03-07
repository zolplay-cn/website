'use client'
import dynamic from 'next/dynamic'

export const Toasts = dynamic(() => import('./toasts').then((mod) => mod.Toasts), {
  ssr: false,
})
