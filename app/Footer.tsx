'use client'

import { clsxm } from '@zolplay/utils'
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('Copyright')

  return (
    <footer
      className={clsxm(
        'absolute inset-x-0 bottom-10 flex h-20 flex-col items-center justify-center'
      )}
    >
      <div className="h-px w-1/2 rounded-xl bg-gradient-to-r from-stone-50 to-stone-200 dark:from-stone-900 dark:to-stone-700" />

      <p className="mb-1 mt-4 text-sm dark:text-stone-400">
        {t('Text', {
          year: new Date().getFullYear(),
        })}
      </p>

      <p className="text-sm dark:text-stone-400">
        <a href="https://beian.miit.gov.cn/">粤ICP备2023102271号</a>
      </p>
    </footer>
  )
}
