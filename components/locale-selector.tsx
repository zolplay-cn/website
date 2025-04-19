'use client'

import { clsxm } from '@zolplay/utils'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Select } from '~/components/ui/select'
import { usePathname } from '~/modules/i18n/navigation'

const languages = [
  {
    value: 'en',
    icon: ({ className }: { className?: string }) => <span className={clsxm('w-4', className)}>🇺🇸</span>,
    url: '/',
  },
  {
    value: 'zh-CN',
    icon: ({ className }: { className?: string }) => <span className={clsxm('w-4', className)}>🇨🇳</span>,
    url: '/zh-CN',
  },
]
export function LocaleSelector() {
  const locale = useLocale()
  const [mounted, setMounted] = React.useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const onChange = React.useCallback(
    (locale: string) => {
      router.push(`/${locale}${pathname}`)
    },
    [router, pathname],
  )

  React.useEffect(() => setMounted(true), [])

  const t = useTranslations('Languages')

  if (!mounted) {
    return null
  }

  return (
    <Select.Root value={locale} onValueChange={onChange}>
      <Select.Trigger
        className='flex justify-between border-none font-medium text-(--sidebar-fg) transition-colors hover:text-stone-600 dark:hover:text-stone-200 h-10 rounded-none'
        aria-label={t('Placeholder')}
      >
        <Select.Value placeholder={t('Placeholder')} />
      </Select.Trigger>
      <Select.Content className='relative z-50' position='popper'>
        {languages.map(({ value, icon: Icon }) => (
          <Select.Item key={value} value={value}>
            <span className='inline-flex select-none items-center space-x-2 font-medium'>
              <Icon />
              <span>{t(value as any)}</span>
            </span>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}
