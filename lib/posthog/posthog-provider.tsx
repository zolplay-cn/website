/* eslint-disable node/prefer-global/process */
'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
if (typeof window !== 'undefined' && KEY) {
  posthog.init(KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
  })
}

export function PostHogPageview() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  // Track pageviews
  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname
      if (searchParams && searchParams.toString()) {
        url = `${url}?${searchParams.toString()}`
      }
      posthog.capture('$pageview', {
        $current_url: url,
      })
    }
  }, [pathname, searchParams])
  return <></>
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
