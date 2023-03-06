'use client'

import { clsxm } from '@zolplay/utils'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { TbArrowUpRight } from 'react-icons/tb'

import { i18n } from '~/i18n'

export function Footer() {
  const locale = useLocale()
  const t = useTranslations('Copyright')

  return (
    <footer
      className={clsxm(
        'absolute inset-x-0 bottom-10 flex h-20 flex-col items-center justify-center'
      )}
    >
      <div className="h-px w-1/2 rounded-xl bg-gradient-to-r from-stone-50 to-stone-200 dark:from-stone-900 dark:to-stone-700" />

      <p className="mt-4 mb-1 text-sm dark:text-stone-400">
        {t('Text', {
          year: new Date().getFullYear(),
        })}
      </p>
      {locale === i18n.defaultLocale && (
        <p className="text-sm dark:text-stone-500">
          <Link
            href="https://beian.miit.gov.cn/#/Integrated/index"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-wide hover:underline"
            title="Fuckin' ICP"
          >
            粤ICP备2021175747号-1
            <TbArrowUpRight className="ml-0.5 inline-block h-3 w-3" />
          </Link>
        </p>
      )}
    </footer>
  )
}
