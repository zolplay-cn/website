'use client'

import { clsxm } from '@zolplay/utils'
import { useFormatter } from 'next-intl'
import React from 'react'

export function Clock({ className }: { className?: string }) {
  const [time, setTime] = React.useState(() => new Date())
  const [mounted, setMounted] = React.useState(false)
  const { dateTime: formatDateTime } = useFormatter()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className={clsxm('flex items-center md:px-2 md:py-1', className)}>
      <span className='select-none text-xs font-mono text-(--navbar-fg)/70 md:text-(--sidebar-fg)/70'>
        {formatDateTime(time, {
          timeZone: 'Asia/Shanghai',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          weekday: 'short',
        })}
      </span>
    </div>
  )
}
