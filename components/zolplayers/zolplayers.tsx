'use client'

import { useTranslations } from 'next-intl'
import { ZOLPLAYERS_SORTED } from './datasource'
import { ZolplayerCard } from './zolplayer-card'

export function Zolplayers() {
  const t = useTranslations('About')

  return (
    <>
      <svg width={0} height={0} viewBox='0 0 372 346'>
        <defs>
          <clipPath id='member-arch' clipPathUnits='objectBoundingBox' transform='scale(0.002688172 0.0028901734)'>
            <path d='M0 160C0 71.6344 71.6344 0 160 0H212C300.366 0 372 71.6344 372 160V334C372 340.627 366.627 346 360 346H12C5.37259 346 0 340.627 0 334V160Z' />
          </clipPath>
        </defs>
      </svg>

      <h2>{t('MeetOurTeam')}</h2>
      <section className='grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-5'>
        {ZOLPLAYERS_SORTED.map((member) => (
          <ZolplayerCard key={member.slug} member={member} />
        ))}
      </section>
    </>
  )
}
