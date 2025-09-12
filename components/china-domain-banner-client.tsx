'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function ChinaDomainBannerClient() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // If someone sets the cookie manually, respect it on mount
    const dismissed = document.cookie
      .split('; ')
      .find((c) => c.startsWith('cnBannerDismissed='))
      ?.split('=')[1]
    if (dismissed === '1') setVisible(false)
  }, [])

  if (!visible) return null

  const onClose = () => {
    const maxAge = 60 * 60 * 24 * 30 // 30 days
    document.cookie = `cnBannerDismissed=1; path=/; max-age=${maxAge}`
    setVisible(false)
  }

  return (
    <div className='fixed top-14 md:top-0 left-0 right-0 z-[1001]'>
      <div className='mx-auto max-w-3xl lg:max-w-4xl'>
        <div className='mx-2 md:mx-4 lg:mx-0 mt-2 border border-(--grid-border-color) bg-emerald-50 text-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-100 backdrop-blur px-3 py-2 text-sm shadow-2xl flex items-center justify-between gap-3'>
          <div className='leading-tight'>
            为了获得更快更稳定的访问体验，建议访问中国大陆优化域名
            <Link
              href='https://zolplay.com.cn'
              className='font-medium underline underline-offset-2 ml-1 hover:opacity-90'
              rel='noopener noreferrer'
            >
              zolplay.com.cn
            </Link>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='shrink-0 rounded px-2 py-1 border border-emerald-200/70 dark:border-emerald-800/60 hover:bg-emerald-100/60 dark:hover:bg-emerald-800/30 transition'
            aria-label='关闭提示'
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}
