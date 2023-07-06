'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import OfficeShot from './zolplay-office-couch-shot.jpg'
import Poster from './zolplay-poster.png'

export default function Home() {
  const t = useTranslations('Home')

  return (
    <>
      <h1>👋&nbsp;{t('Heading')}</h1>
      <p>{t.rich('Paragraph1')}</p>
      <Image src={Poster} alt="Zolplay Poster" placeholder="blur" />
      <p>{t.rich('Paragraph2')}</p>
      <Image src={OfficeShot} alt="Zolplay Office Shot" placeholder="blur" />
      <p className="-mt-4 text-center text-sm text-stone-400 dark:text-stone-500">
        {t('Caption')}
      </p>
    </>
  )
}
