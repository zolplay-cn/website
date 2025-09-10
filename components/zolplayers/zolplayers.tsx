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
      <h1 className='text-left'>{t('MeetOurTeam')}</h1>
      <section
        className='
          not-prose w-full
          bg-[image:repeating-linear-gradient(135deg,_var(--grid-color)_0,_var(--grid-color)_1px,_transparent_1px,_transparent_16px)]
          bg-fixed
          [--grid-color:var(--color-stone-100)] dark:[--grid-color:var(--color-stone-800)]
          border-t border-(--grid-border-color)
        '
      >
        <div className='relative grid grid-cols-1 lg:grid-cols-[minmax(260px,356px)_1fr]'>
          <aside className='border-r border-(--grid-border-color) bg-black/2 dark:bg-white/1'>
            <ul>
              {ZOLPLAYERS_SORTED.map((member) => (
                <li
                  key={member.slug}
                  className='grid grid-cols-[1fr_auto] items-center gap-x-3 md:gap-x-4 px-2 md:px-3 py-2 md:py-2.5 border-b border-(--grid-border-color)'
                >
                  <div className='min-w-0'>
                    <div className='text-sm md:text-base text-[var(--accent)] truncate'>{member.name}</div>
                    <div className='text-xs md:text-sm text-[var(--accent)]/70 truncate'>{member.role[locale]}</div>
                  </div>
                  {member.social && member.social.length > 0 ? (
                    <ul className='flex flex-wrap items-center gap-2 justify-end'>
                      {member.social.map((social) => (
                        <SocialLink social={social} key={social.url} />
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </aside>

          <div className='p-0'>
            <div className='grid grid-cols-2 gap-0'>
              {ZOLPLAYERS_SORTED.map((member) => (
                <WithFrame key={member.slug} className='relative w-full aspect-square'>
                  <div className='hidden invisible dark:block dark:visible'>
                    <Image
                      src={member.portrait.dark}
                      alt={member.name}
                      width={600}
                      height={600}
                      className='w-full h-full object-cover'
                      placeholder='blur'
                    />
                  </div>
                  <div className='block visible dark:hidden dark:invisible'>
                    <Image
                      src={member.portrait.light}
                      alt={member.name}
                      width={600}
                      height={600}
                      className='w-full h-full object-cover'
                      placeholder='blur'
                    />
                  </div>

                  <div className='absolute inset-x-0 bottom-0 px-2 py-1.5 md:pl-3 md:pb-3 text-sm md:text-xs text-white/90 mix-blend-difference'>
                    {/* Only first name */}
                    {member.name.split(' ')[0]}
                  </div>
                </WithFrame>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
