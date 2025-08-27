'use client'
import dynamic from 'next/dynamic'

export const Toasts = dynamic(() => import('./toasts.jsx').then((mod) => mod.Toasts), {
  ssr: false,
})
