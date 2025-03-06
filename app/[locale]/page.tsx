'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useUWU } from '~/hooks/useUWU'
import { DefaultRichTextComponents } from '~/i18n/RichText'
import UwU from './zolplay-logo-uwu.png'
import OfficeShot from './zolplay-office-couch-shot.jpg'
import Poster from './zolplay-poster.png'

export default function Home() {
  const t = useTranslations('Home')
  const isUWU = useUWU()

  return (
    <>
      <h1>👋&nbsp;{t('Heading')}</h1>
      <p>{t.rich('Paragraph1', DefaultRichTextComponents)}</p>
      <Image src={isUWU ? UwU : Poster} alt='Zolplay Poster' placeholder='blur' />
      <Image src={OfficeShot} alt='Zolplay Office Shot' placeholder='blur' />
      <p className='-mt-4 text-center text-sm text-stone-400 dark:text-stone-500'>{t('Caption')}</p>
    </>
  )
}
