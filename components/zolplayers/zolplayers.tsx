'use client'

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { WithFrame } from '../mdx'
import { ZOLPLAYERS_SORTED } from './datasource'
import { SocialLink } from './social-link'

export function Zolplayers() {
  const t = useTranslations('About')
  const locale = useLocale()

  return (
    <>
      <h1>{t('MeetOurTeam')}</h1>
      <section
        className='
          not-prose w-full
          bg-[image:repeating-linear-gradient(0deg,_var(--grid-color)_0,_var(--grid-color)_1px,_transparent_1px,_transparent_80px),repeating-linear-gradient(90deg,_var(--grid-color)_0,_var(--grid-color)_1px,_transparent_1px,_transparent_80px)]
          bg-[size:100%_80px,80px_100%]
          bg-fixed
          [--grid-color:var(--color-stone-100)] dark:[--grid-color:var(--color-stone-800)]
          border-t border-(--grid-border-color)
        '
      >
        {ZOLPLAYERS_SORTED.map((member, i) => {
          return (
            <article key={member.slug} className='border-b border-(--grid-border-color)'>
              <div className='w-full text-left grid grid-cols-12 items-start gap-x-2 md:gap-x-3 hover:bg-black/2 dark:hover:bg-white/2 transition-colors duration-75'>
                <span className='col-span-2 md:col-span-1 pl-2 pt-2 text-[10px] md:text-xs uppercase text-[var(--accent)]/60'>
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className='col-span-10 md:col-span-7 tracking-tight flex flex-col p-2 gap-3'>
                  <span className='leading-none text-2xl md:text-3xl text-[var(--accent)]'>{member.name}</span>
                  <span className='text-sm md:text-base -tracking-[0.01em] text-[var(--accent)]/70 block'>
                    {member.role[locale]}
                  </span>

                  <div className='col-span-12 md:col-span-10'>
                    {member.social && member.social.length > 0 ? (
                      <ul className='flex flex-wrap items-center gap-2 '>
                        {member.social.map((social) => (
                          <SocialLink social={social} key={social.url} />
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>

                <div className='relative col-span-5 md:col-span-4 col-start-8 md:col-start-9'>
                  <WithFrame>
                    <Image
                      src={member.portrait.url}
                      alt={member.name}
                      width={280}
                      height={280}
                      className='w-full aspect-square object-contain mix-blend-multiply dark:mix-blend-normal'
                      placeholder='blur'
                    />
                  </WithFrame>
                </div>
              </div>
            </article>
          )
        })}
      </section>
    </>
  )
}
