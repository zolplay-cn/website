'use client'

import { useTranslations } from 'next-intl'

import { Hr } from '~/components/ui/Hr'
import { DefaultRichTextComponents } from '~/components/ui/RichText'

export function Portfolios({ children }) {
  const t = useTranslations('Portfolios')

  return (
    <>
      <h1>{t('Title')}</h1>
      <p>{t.rich('Description', DefaultRichTextComponents)}</p>

      <Hr />

      {children}
    </>
  )
}
