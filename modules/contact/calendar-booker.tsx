'use client'

import Cal, { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'

export default function CalendarBooker() {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: 'intro' })
      cal('ui', { hideEventTypeDetails: true, layout: 'month_view' })
    })()
  }, [])

  return (
    <Cal
      namespace='intro'
      calLink='calicastle/intro'
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      config={{ layout: 'month_view' }}
    />
  )
}
