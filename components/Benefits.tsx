'use client'

import { useTranslations } from 'next-intl'
import {
  TbArmchair2,
  TbArrowBigUpLine,
  TbCash,
  TbDeviceGamepad,
  TbMoodSmile,
  TbTiltShift,
  TbTools,
} from 'react-icons/tb'

const icons = [
  TbTiltShift,
  TbArmchair2,
  TbCash,
  TbMoodSmile,
  TbArrowBigUpLine,
  TbDeviceGamepad,
  TbTools,
]

export function Benefits() {
  const t = useTranslations('Careers.Benefits')

  return (
    <section className="pb-2">
      <h2>{t('Title')}</h2>
      <ul>
        {t.raw('Content').map((benefit, i) => {
          const Icon = icons[i]
          return (
            <li key={i}>
              <Icon className="mr-1 inline-block h-5 w-5" />
              <strong>{benefit.split(':')[0]}:</strong>
              {benefit.split(':')[1]}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
