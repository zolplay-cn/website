'use client'

import { useTranslations } from 'next-intl'
import { ZOLPLAYERS_SORTED } from './datasource'
import { ZolplayerCard } from './zolplayer-card'

export function Zolplayers() {
  const t = useTranslations('About')

  return (
    <>
      <h2>{t('MeetOurTeam')}</h2>
      <section className='grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-6 bg-[image:repeating-linear-gradient(135deg,_var(--pattern-color)_0,_var(--pattern-color)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-color:var(--color-stone-100)] dark:[--pattern-color:var(--color-stone-800)]'>
        {ZOLPLAYERS_SORTED.map((member) => (
          <ZolplayerCard key={member.slug} member={member} />
        ))}
      </section>
    </>
  )
}
