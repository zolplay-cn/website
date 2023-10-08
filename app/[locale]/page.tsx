'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Fuwu from './aidbo-fuwu.png'

export default function Home() {
  const t = useTranslations('Home')

  return (
    <>
      <h1>👋&nbsp;{t('Heading')}</h1>
      <p>{t.rich('Paragraph1')}</p>
      <a
        href="https://fuwu.weixin.qq.com/profile/sq_oWTzf6t7Vrzf099ONaqXS5vMc0L4"
        target="_blank"
      >
        <Image src={Fuwu} alt="Aidbo Fuwu" placeholder="blur" />
      </a>
      <p className="-mt-4 text-center text-sm text-stone-400 dark:text-stone-500">
        {t('Caption')}
      </p>
    </>
  )
}
