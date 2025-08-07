'use client'

import { useTranslations } from 'next-intl'
import { SiElectron, SiPostgresql, SiSwift } from 'react-icons/si'
import {
  TbBrandDocker,
  TbBrandFramerMotion,
  TbBrandGit,
  TbBrandKotlin,
  TbBrandLaravel,
  TbBrandNextjs,
  TbBrandReact,
  TbBrandTailwind,
  TbBrandTypescript,
} from 'react-icons/tb'

const icons = [
  TbBrandReact,
  TbBrandNextjs,
  TbBrandTypescript,
  TbBrandTailwind,
  TbBrandFramerMotion,
  TbBrandLaravel,
  SiPostgresql,
  TbBrandGit,
  TbBrandDocker,
  SiElectron,
  SiSwift,
  TbBrandKotlin,
]

export function OurStacks() {
  const t = useTranslations('Careers.OurStacks')

  return (
    <section className='pb-2'>
      <h2>{t('Title')}</h2>
      <ul>
        {t.raw('Content').map((stack, i) => {
          const Icon = icons[i]
          const stackKey = `stack-${i}-${stack.split(':')[0].substring(0, 3)}`
          return (
            <li key={stackKey}>
              <Icon className='inline-block mr-1 w-5 h-5' />
              <strong>{stack.split(':')[0]}:</strong>
              {stack.split(':')[1]}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
