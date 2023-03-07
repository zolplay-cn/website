'use client'

import { useTranslations } from 'next-intl'

export default function RootError() {
  const t = useTranslations()

  return (
    <>
      <h2>{t('Error')}</h2>
    </>
  )
}
