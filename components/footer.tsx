'use client'

import { clsxm } from '@zolplay/utils'
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('Copyright')

  return (
    <footer
      className={clsxm(
        'absolute inset-x-0 bottom-10 flex h-20 flex-col items-center justify-center',
        'before:absolute before:top-0 before:left-[-100vw] before:w-[200vw] before:h-px before:bg-(--grid-border-color)',
        'after:absolute after:bottom-0 after:right-[-100vw] after:w-[200vw] after:h-px after:bg-(--grid-border-color)',
      )}
    >
      <p className='my-2 text-sm opacity-50'>
        {t('Text', {
          year: new Date().getFullYear(),
        })}
      </p>
    </footer>
  )
}
