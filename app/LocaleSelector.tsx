'use client'

import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { usePathname } from 'next-intl/client'
import React from 'react'

import { Select } from '~/components/ui/Select'

const languages = [
  {
    label: 'English',
    value: 'en',
    icon: () => <span>🇺🇸</span>,
    url: 'https://zolplay.com',
  },
  {
    label: '简体中文',
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
        router.push(languages.find((lang) => lang.value === locale)?.url || '/')
      }
    },
    [router, pathname]
  )

  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }

  return (
    <Select.Root value={locale} onValueChange={onChange}>
      <Select.Trigger className="flex w-fit justify-start space-x-1 border-none font-bold text-stone-400 transition-colors hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-200 md:w-40">
        <Select.Value placeholder="Select a language" />
      </Select.Trigger>
      <Select.Content className="relative z-50" position="popper">
        {languages.map(({ label, value, icon: Icon }) => (
          <Select.Item key={value} value={value}>
            <span className="inline-flex select-none items-center space-x-2 font-bold">
              <Icon />
              <span>{label}</span>
            </span>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}
