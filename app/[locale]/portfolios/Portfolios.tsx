'use client'

import { useTranslations } from 'next-intl'
import { Hr } from '~/components/ui/Hr'
import { DefaultRichTextComponents } from '~/components/ui/RichText'

export function Portfolios({ children }) {
  const t = useTranslations('Portfolios')

  return (
    <>
      <h1>{t.rich('Heading', DefaultRichTextComponents)}</h1>
      <p>{t.rich('Intro', DefaultRichTextComponents)}</p>

      <Hr className='my-12' />

      <section className='flex flex-col gap-8'>{children}</section>
    </>
  )
}
