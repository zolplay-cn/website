'use client'

import { useTranslations } from 'next-intl'
import { CgLinear } from 'react-icons/cg'
import {
  TbBrandFigma,
  TbBrandGithub,
  TbBrandGoogleDrive,
  TbBrandNotion,
  TbBrandSlack,
  TbBrandVercel,
} from 'react-icons/tb'
import { ZpBrandArc } from '~/components/icons/ZpBrandArc'

const icons = [
  TbBrandSlack,
  TbBrandGoogleDrive,
  TbBrandGithub,
  CgLinear,
  TbBrandVercel,
  TbBrandFigma,
  TbBrandNotion,
  ZpBrandArc,
]

export function OurTools() {
  const t = useTranslations('Careers.OurTools')

  return (
    <section className='pb-2'>
      <h2>{t('Title')}</h2>
      <ul>
        {t.raw('Content').map((tool, i) => {
          const Icon = icons[i]
          return (
            <li key={i}>
              <Icon className='mr-1 inline-block h-5 w-5' />
              <strong>{tool.split(':')[0]}:</strong>
              {tool.split(':')[1]}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
