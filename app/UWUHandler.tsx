'use client'

import { redirect, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function UWUHandler() {
  const query = useSearchParams()

  useEffect(() => {
    if (query?.has('uwu')) {
      if (query.get('uwu') === '0') {
        localStorage.removeItem('uwu')
      } else {
        localStorage.setItem('uwu', '1')
      }
      redirect('/')
    }
  }, [query])
  return null
}
