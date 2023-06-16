'use client'

import { useTheme } from 'next-themes'
import { Toaster } from 'sonner'

export function Toasts() {
  const { resolvedTheme } = useTheme()
  return (
    <Toaster theme={resolvedTheme === 'light' ? 'light' : 'dark'} closeButton />
  )
}
