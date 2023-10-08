'use client'

import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('Home')

  return (
    <>
      <h1>👋&nbsp;{t('Heading')}</h1>
      <p>{t.rich('Paragraph1')}</p>
    </>
  )
}
