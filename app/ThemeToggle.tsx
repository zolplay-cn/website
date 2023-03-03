'use client'

import { useTheme } from 'next-themes'
import React from 'react'

export const ThemeToggle = () => {
  const [mounted, setMounted] = React.useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  React.useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isLight = resolvedTheme === `light`
  const oppositeTheme = isLight ? `dark` : `light`

  const toggleTheme = () => setTheme(oppositeTheme)

  return (
    <button onClick={toggleTheme}>{`Switch to ${oppositeTheme} mode`}</button>
  )
}
