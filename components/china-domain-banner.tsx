import { cookies, headers } from 'next/headers'

import { ChinaDomainBannerClient } from './china-domain-banner-client'

export async function ChinaDomainBanner({ locale }: { locale: string }) {
  // Only for Simplified Chinese locale
  if (locale !== 'zh-CN') return null

  const hdrs = await headers()
  const cookieStore = await cookies()

  // Respect dismissal cookie
  const dismissed = cookieStore.get('cnBannerDismissed')?.value
  if (dismissed === '1') return null

  const host = (hdrs.get('x-forwarded-host') || hdrs.get('host') || '').toLowerCase()
  // Only show on the .com domain (Vercel), never on the China-optimized domain
  if (host.endsWith('zolplay.com.cn')) return null
  if (!host.endsWith('zolplay.com')) return null

  // Show only to visitors from mainland China (Vercel geo header)
  const country = (hdrs.get('x-vercel-ip-country') || '').toUpperCase()
  if (country !== 'CN') return null

  // Also avoid on localhost/dev
  if (host.includes('localhost') || host.endsWith('.local')) return null

  // At this point, render the client-controlled dismissible banner
  return <ChinaDomainBannerClient />
}
