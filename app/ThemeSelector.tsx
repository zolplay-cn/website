'use client'

import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import React from 'react'
import { TbCircleHalf2, TbMoon, TbSun } from 'react-icons/tb'

import { Select } from '~/components/ui/Select'

const themes = [
  {
    label: 'Light',
    value: 'light',
    icon: TbSun,
  },
  {
    label: 'Dark',
    value: 'dark',
    icon: TbMoon,
  },
  {
    label: 'System',
    value: 'system',
    icon: TbCircleHalf2,
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
    <Select.Root value={theme} defaultValue="system" onValueChange={setTheme}>
      <Select.Trigger className="flex w-fit justify-start space-x-1 border-none font-bold text-stone-400 transition-colors hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-200 md:w-40">
        <Select.Value placeholder={t('Placeholder')} />
      </Select.Trigger>
      <Select.Content position="popper">
        {themes.map(({ label, value, icon: Icon }) => (
          <Select.Item key={value} value={value}>
            <span className="inline-flex select-none items-center space-x-2 font-bold">
              <Icon className="h-4 w-4 stroke-current" />
              <span>{t(label as any)}</span>
            </span>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}
