import { useTranslations } from 'next-intl'
import {
  TbAccessible,
  TbArmchair2,
  TbArrowBigUpLine,
  TbCash,
  TbDeviceGamepad,
  TbMoodSmile,
  TbTiltShift,
  TbTools,
} from 'react-icons/tb'

const icons = [TbTiltShift, TbArmchair2, TbCash, TbMoodSmile, TbArrowBigUpLine, TbDeviceGamepad, TbTools, TbAccessible]

export function Benefits() {
  const t = useTranslations('Careers.Benefits')

  return (
    <section className='pb-2'>
      <h2>{t('Title')}</h2>
      <ul>
        {t.raw('Content').map((benefit, i) => {
          const Icon = icons[i]
          const benefitKey = `benefit-${i}-${benefit.split(':')[0].substring(0, 3)}`

          return (
            <li key={benefitKey}>
              <Icon className='inline-block w-5 h-5 mr-1' />
              <strong>{benefit.split(':')[0]}:</strong>
              {benefit.split(':')[1]}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
