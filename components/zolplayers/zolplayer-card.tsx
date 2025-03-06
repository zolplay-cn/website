import type { Zolplayer } from './datasource'
import { clsxm } from '@zolplay/utils'
import { atom, useAtom } from 'jotai'
import { useFormatter } from 'next-intl'
import Image from 'next/image'
import { usePostHog } from 'posthog-js/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Tilt from 'react-parallax-tilt'
import Balancer from 'react-wrap-balancer'
import { LogoHelmetOutline } from '../Logo'
import { SocialLink } from './social-link'

const focusingMemberSlugAtom = atom<string | null>(null)

export function ZolplayerCard({ member }: { member: Zolplayer }) {
  const posthog = usePostHog()

  const { dateTime: formatDateTime } = useFormatter()
  const joined = useMemo(
    () =>
      formatDateTime(new Date(member.joinedDate), {
        year: 'numeric',
        month: 'long',
      }),
    [formatDateTime, member.joinedDate],
  )
  const [focusingMember, setFocusingMember] = useAtom(focusingMemberSlugAtom)
  const onMouseEnter = useCallback(() => {
    setFocusingMember(member.slug)
  }, [member.slug, setFocusingMember])
  const onMouseLeave = useCallback(() => {
    setFocusingMember(null)
  }, [setFocusingMember])

  const [tiltEnabled, setTiltEnabled] = useState(true)
  // only enable tilt on non-mobile devices
  useEffect(() => {
    if (/Mobi|Android|iPhone|iPad/i.test(window.navigator.userAgent)) {
      setTiltEnabled(false)
    }
  }, [])

  return (
    <Tilt
      className={clsxm([
        'not-prose group flex flex-col justify-between rounded-2xl p-2.5 md:p-4',
        'border border-stone-100 bg-white text-[var(--accent)] dark:border-stone-800 dark:bg-stone-900',
        '[--accent:var(--mb-accent)] dark:[--accent:var(--mb-accent-dark)]',
        '[transform-style:preserve-3d]',
        {
          'md:opacity-80 md:blur-[1px]': focusingMember !== null && focusingMember !== member.slug,
          'blur-none': focusingMember === member.slug,
        },
      ])}
      style={{
        '--mb-accent': member.portrait.palette.darkVibrant.background,
        '--mb-accent-dark': member.portrait.palette.lightVibrant.background,
      }}
      tiltEnable={tiltEnabled}
      perspective={400}
      scale={1.05}
      glareEnable={false}
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      onEnter={onMouseEnter}
      onLeave={onMouseLeave}
    >
      <header className='mb-4 flex flex-col items-center'>
        <Image
          data-portrait
          src={member.portrait.url}
          alt={member.name}
          width={120}
          height={120}
          className='mx-auto h-20 w-20 shadow-2xl md:h-28 md:w-28'
          placeholder='blur'
          style={{
            clipPath: 'url(#member-arch)',
          }}
        />
        <span className='mt-4 block text-center text-base font-bold tracking-tight text-[var(--accent)]'>
          {member.name}
        </span>
        <span className='mt-1 block text-center text-[13px] leading-4 -tracking-[0.015rem] text-[var(--accent)] opacity-70'>
          <Balancer>{member.role}</Balancer>
        </span>
      </header>

      {member.social && member.social.length > 0 && (
        <ul className='mb-3 flex w-full items-center justify-center gap-1.5'>
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

      <footer className='mt-2 flex w-full items-center justify-between'>
        <time className='select-none rounded-lg border border-stone-400/40 p-1 text-xs text-[var(--accent)] opacity-50 [transform:translateZ(60px)] dark:border-stone-600/50'>
          {joined}
        </time>

        <LogoHelmetOutline className='h-5 w-5 opacity-60' />
      </footer>
    </Tilt>
  )
}
