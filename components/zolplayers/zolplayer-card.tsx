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
      <header className='mb-4 flex flex-col items-center transform-3d translate-z-4 transition-transform duration-150'>
        <Image
          data-portrait
          src={member.portrait.url}
          alt={member.name}
          width={120}
          height={120}
          className='mx-auto size-20 shadow-2xl md:size-28 translate-z-2 transition-transform'
          placeholder='blur'
          style={{
            clipPath: 'url(#member-arch)',
          }}
        />
        <span className='mt-4 block text-center text-base font-medium tracking-tight text-[var(--accent)]'>
          {member.name}
        </span>
        <span className='mt-1 block text-center text-[13px] leading-4 -tracking-[0.015rem] text-[var(--accent)] opacity-70'>
          <Balancer>{member.role[locale]}</Balancer>
        </span>
      </header>

      {member.social && member.social.length > 0 && (
        <ul className='mb-3 translate-z-10 transition-transform duration-150 flex w-full items-center justify-center gap-1.5'>
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
      )}

      <footer className='mt-2 flex w-full items-center justify-between translate-z-6 transition-transform duration-150'>
        <time className='select-none rounded-lg border border-dashed border-stone-400/40 p-1 text-xs text-[var(--accent)] opacity-65 tracking-tight [transform:translateZ(60px)] dark:border-stone-600/50'>
          {joined}
        </time>

        <LogoHelmetOutline className='h-5 w-5 opacity-60' />
      </footer>
    </TiltCard>
  )
}
