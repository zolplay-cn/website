'use client'

import { AbstractIntlMessages } from 'next-intl'
import { NextIntlClientProvider } from 'next-intl/client'
import React from 'react'

import { DefaultRichTextComponents } from '~/components/ui/RichText'

type Props = {
  messages: AbstractIntlMessages
  locale: string
  children: React.ReactNode
}

export default function IntlProvider({ messages, locale, children }: Props) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      defaultTranslationValues={DefaultRichTextComponents}
    >
      {children}
    </NextIntlClientProvider>
  )
}
