'use client'

import { useLocale } from 'next-intl'
import { useEffect, useState } from 'react'

export function ICPRecord() {
  const locale = useLocale()
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    const host = window.location.hostname.toLowerCase()
    // Show ICP record for Chinese locale OR when on zolplay.com.cn domain
    if (locale === 'zh-CN' || host.endsWith('zolplay.com.cn')) {
      setShouldShow(true)
    }
  }, [locale])

  if (!shouldShow) return null

  return (
    <a className='my-2 text-xs opacity-50' href='https://beian.miit.gov.cn/' target='_blank' rel='noreferrer'>
      粤ICP备2025454293号
    </a>
  )
}
