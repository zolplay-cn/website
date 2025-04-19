import type { Zolplayer } from './datasource'
import { useFormatter, useLocale } from 'next-intl'
import Image from 'next/image'
import { usePostHog } from 'posthog-js/react'
import { useMemo } from 'react'
import Balancer from 'react-wrap-balancer'
import { LogoHelmetOutline } from '../logo'
import { SocialLink } from './social-link'
import { TiltCard } from './tilt-card'

export function ZolplayerCard({ member }: { member: Zolplayer }) {
  const posthog = usePostHog()
  const locale = useLocale()

  const { dateTime: formatDateTime } = useFormatter()
  const joined = useMemo(
    () =>
      formatDateTime(new Date(member.joinedDate), {
        year: 'numeric',
        month: 'long',
      }),
    [formatDateTime, member.joinedDate],
  )

  return (
    <TiltCard zolplayer={member}>
      <header className='mb-0 pt-0.5 pb-2 h-44 flex flex-col items-center transform-3d translate-z-4 transition-transform duration-150'>
        <div className='w-full flex justify-center'>
          <Image
            data-portrait
            src={member.portrait.url}
            alt={member.name}
            width={120}
            height={120}
            className='size-24'
            placeholder='blur'
          />
        </div>
        <span className='mt-2 block text-center text-base font-medium tracking-tight text-[var(--accent)]'>
          {member.name}
        </span>
        <span className='mt-0.5 block text-center text-xs leading-4 -tracking-[0.015rem] text-[var(--accent)] opacity-70'>
          <Balancer>{member.role[locale]}</Balancer>
        </span>
      </header>

      {member.social && member.social.length > 0 ? (
        <ul className='mb-1 pt-3 h-8 flex w-full items-center justify-center gap-1.5 border-t border-(--grid-border-color)'>
          {member.social.map((social) => (
            <SocialLink
              social={social}
              key={social.url}
              onClick={() => {
                posthog?.capture('click_social', {
                  name: member.name,
                  platform: social.platform,
                })
              }}
            />
          ))}
        </ul>
      ) : (
        <div className='mb-1 pt-3 h-8 flex w-full items-center justify-center gap-1.5 border-t border-(--grid-border-color)' />
      )}

      <footer className='mt-3 pt-0.5 pb-1.5 flex w-full items-center justify-between border-t border-(--grid-border-color) '>
        <time className='select-none pl-1 text-xs text-[var(--accent)]/50 tracking-tight [transform:translateZ(60px)]'>
          {joined}
        </time>

        <LogoHelmetOutline className='size-4 mr-1 opacity-60' />
      </footer>
    </TiltCard>
  )
}
