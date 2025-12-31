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
    <div className='mb-4 flex flex-col items-center gap-1 text-xs opacity-50'>
      <a className='my-1' href='https://beian.miit.gov.cn/' target='_blank' rel='noreferrer'>
        粤ICP备2025454293号
      </a>
      <span>公司办公地址：深圳市南山区高新南七道软件园 T3 栋四楼 A03</span>
      <span>联系电话：18923441049</span>
    </div>
  )
}
