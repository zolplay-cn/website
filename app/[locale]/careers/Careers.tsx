'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Balancer from 'react-wrap-balancer'

import FeaturedImage from './careers-workshop.jpg'

export function Careers() {
  const t = useTranslations('Careers')

  return (
    <>
      <h1>
        <Balancer>{t('Heading')}</Balancer>
      </h1>
      <p>{t('Intro')}</p>
      <Image src={FeaturedImage} alt={t('Title')} placeholder="blur" />
    </>
  )
}
