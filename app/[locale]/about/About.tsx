'use client'

import { useTranslations } from 'next-intl'
import React from 'react'
import Balancer from 'react-wrap-balancer'
import { DefaultRichTextComponents } from '~/i18n/RichText'

export function About() {
  const t = useTranslations('About')

  return (
    <>
      <h1>
        <Balancer>{t('Heading')}</Balancer>
      </h1>

      <p>
        <Balancer>{t.rich('Intro', DefaultRichTextComponents)}</Balancer>
      </p>

      <h2>{t('Founder.Title')}</h2>

      <p>
        <Balancer>{t.rich('Founder.Description', DefaultRichTextComponents)}</Balancer>
      </p>
    </>
  )
}
