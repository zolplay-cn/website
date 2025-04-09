'use client'

import { useFormatter } from 'next-intl'
import React from 'react'

export function Clock() {
  const [time, setTime] = React.useState(new Date())
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
    <div className='flex items-center px-2 py-1'>
      <span className='select-none text-xs font-mono text-(--sidebar-fg)/70'>
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
