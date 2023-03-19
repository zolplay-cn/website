'use client'

import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next-intl/client'
import React from 'react'

import { Select } from '~/components/ui/Select'

const languages = [
  {
    value: 'en',
    icon: () => <span>🇺🇸</span>,
    url: 'https://zolplay.com',
  },
  {
    value: 'zh-CN',
    icon: () => <span>🇨🇳</span>,
    url: 'https://cn.zolplay.com',
  },
]
export function LocaleSelector() {
  const locale = useLocale()
  const [mounted, setMounted] = React.useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const onChange = React.useCallback(
    (locale: string) => {
      if (process.env.NODE_ENV === 'development') {
        router.push(`/${locale}${pathname}`)
      } else {
        const domain =
          languages.find((lang) => lang.value === locale)?.url || ''
        router.push(`${domain}/${pathname}`)
      }
    },
    [router, pathname]
  )

  React.useEffect(() => setMounted(true), [])

  const t = useTranslations('Languages')

  if (!mounted) {
    return null
  }

  return (
    <Select.Root value={locale} onValueChange={onChange}>
      <Select.Trigger
        className="flex w-fit justify-start space-x-1 border-none font-bold text-stone-400 transition-colors hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-200 md:w-40"
        aria-label={t('Placeholder')}
      >
        <Select.Value placeholder={t('Placeholder')} />
      </Select.Trigger>
      <Select.Content className="relative z-50" position="popper">
        {languages.map(({ value, icon: Icon }) => (
          <Select.Item key={value} value={value}>
            <span className="inline-flex select-none items-center space-x-2 font-bold">
              <Icon />
              <span>{t(value as any)}</span>
            </span>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}
