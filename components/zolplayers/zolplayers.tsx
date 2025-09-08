'use client'

import { useFormatter, useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import { LogoHelmetOutline } from '../logo'
import { ZOLPLAYERS_SORTED } from './datasource'
import { SocialLink } from './social-link'

export function Zolplayers() {
  const t = useTranslations('About')
  const locale = useLocale()
  const { dateTime: formatDateTime } = useFormatter()

  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <>
      <h2>{t('MeetOurTeam')}</h2>
      <section
        className='
          w-full
          bg-[image:repeating-linear-gradient(0deg,_var(--grid-color)_0,_var(--grid-color)_1px,_transparent_1px,_transparent_80px),repeating-linear-gradient(90deg,_var(--grid-color)_0,_var(--grid-color)_1px,_transparent_1px,_transparent_80px)]
          bg-[size:100%_80px,80px_100%]
          bg-fixed
          [--grid-color:var(--color-stone-100)] dark:[--grid-color:var(--color-stone-800)]
          border-t border-(--grid-border-color)
        '
      >
        {ZOLPLAYERS_SORTED.map((member, i) => {
          const joined = formatDateTime(new Date(member.joinedDate), {
            year: 'numeric',
            month: 'long',
          })

          const isActive = i === activeIndex

          return (
            <article key={member.slug} className='border-b border-(--grid-border-color)'>
              <button
                type='button'
                aria-expanded={isActive}
                aria-controls={`panel-${member.slug}`}
                onClick={() => setActiveIndex(i)}
                className='
                  w-full text-left
                  grid grid-cols-12 items-baseline gap-x-3 md:gap-x-4
                  py-4 md:py-6
                  hover:bg-black/2 dark:hover:bg-white/2 transition-colors
                '
              >
                <span className='col-span-2 md:col-span-1 text-[10px] md:text-xs uppercase tracking-[0.15em] text-[var(--accent)]/60'>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className='col-span-7 md:col-span-8 font-medium leading-none text-2xl md:text-4xl tracking-tight'>
                  {member.name}
                </span>
                <span className='col-span-3 md:col-span-3 justify-self-end text-xs md:text-sm -tracking-[0.01em] text-[var(--accent)]/70'>
                  {member.role[locale]}
                </span>
              </button>

              <div
                id={`panel-${member.slug}`}
                hidden={!isActive}
                className='
                  overflow-hidden
                '
              >
                <div className='px-1 md:px-2 pb-6 md:pb-10'>
                  <div className='grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6'>
                    <div className='md:col-span-5 order-2 md:order-1'>
                      <div className='border-t border-(--grid-border-color) pt-3 md:pt-4'>
                        <p className='text-xs uppercase tracking-[0.2em] text-[var(--accent)]/60 mb-2'>{t('Joined')}</p>
                        <time className='block text-sm md:text-base text-[var(--accent)]/80'>{joined}</time>
                      </div>

                      {member.social && member.social.length > 0 ? (
                        <ul className='mt-4 md:mt-6 flex flex-wrap items-center gap-2 border-t border-(--grid-border-color) pt-3 md:pt-4'>
                          {member.social.map((social) => (
                            <SocialLink social={social} key={social.url} />
                          ))}
                        </ul>
                      ) : (
                        <div className='mt-4 md:mt-6 border-t border-(--grid-border-color) pt-3 md:pt-4' />
                      )}

                      <div className='mt-6 flex items-center justify-between border-t border-(--grid-border-color) pt-3'>
                        <span className='text-[10px] md:text-xs uppercase tracking-[0.2em] text-[var(--accent)]/50'>
                          Zolplay
                        </span>
                        <LogoHelmetOutline className='size-4 md:size-5 opacity-60' />
                      </div>
                    </div>

                    <div className='md:col-span-7 order-1 md:order-2 md:border-l border-(--grid-border-color) md:pl-6'>
                      <div className='w-full flex items-center justify-center md:justify-start'>
                        <div
                          className='relative'
                          style={{
                            background: `linear-gradient(0deg, ${member.portrait.palette.background.light}, ${member.portrait.palette.background.light})`,
                          }}
                        >
                          <Image
                            src={member.portrait.url}
                            alt={member.name}
                            width={280}
                            height={280}
                            className='w-48 h-48 md:w-72 md:h-72 object-contain mix-blend-multiply dark:mix-blend-normal'
                            placeholder='blur'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </section>
    </>
  )
}
