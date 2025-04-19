'use client'

import { clsxm } from '@zolplay/utils'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import React from 'react'
import { Select } from '~/components/ui/select'

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={clsxm('stroke-current', className)}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12 23V22M4.22183 19.7782L4.92893 19.0711M1 12H2M4.22183 4.22183L4.92893 4.92893M12 2V1M19.0711 4.92893L19.7782 4.22183M22 12H23M19.0711 19.0711L19.7782 19.7782M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={clsxm('stroke-current', className)}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M20.9999 11.9659C19.8486 13.7891 17.8157 15.0001 15.5 15.0001C11.9101 15.0001 9 12.09 9 8.50012C9 6.18432 10.2111 4.15137 12.0344 3.00006C12.0229 3.00002 12.0115 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 11.9886 21 11.9773 20.9999 11.9659Z'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

function SystemIcon({ className }: { className?: string }) {
  return (
    <svg
      className={clsxm('stroke-current', className)}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2.8501 12.0001C2.8501 17.0535 6.94669 21.1501 12.0001 21.1501C17.0535 21.1501 21.1501 17.0535 21.1501 12.0001C21.1501 6.94669 17.0535 2.8501 12.0001 2.8501C6.94669 2.8501 2.8501 6.94669 2.8501 12.0001Z'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

const themes = [
  {
    label: 'Light',
    value: 'light',
    icon: SunIcon,
  },
  {
    label: 'Dark',
    value: 'dark',
    icon: MoonIcon,
  },
  {
    label: 'System',
    value: 'system',
    icon: SystemIcon,
  },
]
export function ThemeSelector() {
  const [mounted, setMounted] = React.useState(false)
  const { setTheme, theme } = useTheme()
  const t = useTranslations('Themes')

  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }

  return (
    <Select.Root value={theme} defaultValue='system' onValueChange={setTheme}>
      <Select.Trigger
        className='flex justify-between border-none font-medium text-(--sidebar-fg) transition-colors hover:text-stone-600 dark:hover:text-stone-200 h-10 rounded-none'
        aria-label={t('Placeholder')}
      >
        <Select.Value placeholder={t('Placeholder')} />
      </Select.Trigger>
      <Select.Content position='popper'>
        {themes.map(({ label, value, icon: Icon }) => (
          <Select.Item key={value} value={value}>
            <span className='inline-flex select-none items-center space-x-2 font-medium'>
              <Icon className='w-4 stroke-current' />
              <span>{t(label as any)}</span>
            </span>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}
