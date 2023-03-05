'use client'

import { useTranslations } from 'next-intl'

export function Careers() {
  const t = useTranslations('Careers')

  return (
    <>
      <h1>{t('Heading')}</h1>
      <p>
        We're on a mission to build next-generation applications, we need your
        wizardry to make it happen. If you're a believer in the power of
        crafting enchanting software experiences, we want to chat with you.
        Let's conjure up something extraordinary together - apply now and let
        the magic begin!
      </p>
    </>
  )
}
