'use client'

import { useTranslations } from 'next-intl'
import Balancer from 'react-wrap-balancer'

export function Careers() {
  const t = useTranslations('Careers')

  return (
    <>
      <h1>
        <Balancer>{t('Heading')}</Balancer>
      </h1>
      <p>{t('Intro')}</p>
    </>
  )
}
