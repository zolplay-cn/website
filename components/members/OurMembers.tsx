'use client'

import type { Component } from '@zolplay/react'
import { clsxm } from '@zolplay/utils'
import { atom, useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { useIntl, useTranslations } from 'next-intl'
import React from 'react'
import { CgWebsite } from 'react-icons/cg'
import {
  TbBrandDribbble,
  TbBrandGithub,
  TbBrandInstagram,
  TbBrandLinkedin,
  TbBrandTwitter,
  TbBrandYoutube,
} from 'react-icons/tb'
import Tilt from 'react-parallax-tilt'
import Balancer from 'react-wrap-balancer'

import { ZpBrandReadCV } from '~/components/icons/ZpBrandReadCV'
import { LogoHelmet } from '~/components/Logo'
import { urlForImage } from '~/lib/sanity.image'
import type { Member } from '~/schemas/documents/member'

const focusingMemberSlugAtom = atom<string | null>(null)

export function OurMembers({ members }: { members: Member[] }) {
  const t = useTranslations('About')

  return (
    <>
      <svg width={0} height={0} viewBox="0 0 372 346">
        <defs>
          <clipPath
            id="member-arch"
            clipPathUnits="objectBoundingBox"
            transform="scale(0.002688172 0.0028901734)"
          >
            <path d="M0 160C0 71.6344 71.6344 0 160 0H212C300.366 0 372 71.6344 372 160V334C372 340.627 366.627 346 360 346H12C5.37259 346 0 340.627 0 334V160Z" />
          </clipPath>
        </defs>
      </svg>

      <h2>{t('MeetOurTeam')}</h2>
      <section className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-5">
        {members.map((member) => (
          <MemberCard key={member._id} member={member} />
        ))}
      </section>
    </>
  )
}

type Unarray<T> = T extends Array<infer U> ? U : T
const SocialIconMap: Record<Unarray<Member['social']>['platform'], Component> =
  {
    twitter: TbBrandTwitter,
    youtube: TbBrandYoutube,
    github: TbBrandGithub,
    linkedin: TbBrandLinkedin,
    dribbble: TbBrandDribbble,
    instagram: TbBrandInstagram,
    readcv: ZpBrandReadCV,
    xiaohongshu: CgWebsite,
    website: CgWebsite,
  }
function SocialLink({ social }: { social: Unarray<Member['social']> }) {
  const Icon = SocialIconMap[social.platform]

  return (
    <li className="flex items-center">
      <Link
        href={social.url}
        target="_blank"
        className="transition-transform duration-200 hover:-rotate-6 hover:scale-105"
      >
        <Icon className="h-5 w-5" />
      </Link>
    </li>
  )
}

function MemberCard({ member }: { member: Member }) {
  const { formatDateTime } = useIntl()
  const joined = React.useMemo(
    () =>
      formatDateTime(new Date(member.joinedDate), {
        year: 'numeric',
        month: 'long',
      }),
    [formatDateTime, member.joinedDate]
  )
  const [focusingMember, setFocusingMember] = useAtom(focusingMemberSlugAtom)
  const onMouseEnter = React.useCallback(() => {
    setFocusingMember(member.slug)
  }, [member.slug, setFocusingMember])
  const onMouseLeave = React.useCallback(() => {
    setFocusingMember(null)
  }, [setFocusingMember])

  return (
    <Tilt
      className={clsxm([
        'not-prose group flex flex-col justify-between rounded-2xl p-2.5 md:p-4',
        'border border-stone-100 bg-white text-[var(--accent)] dark:border-stone-800 dark:bg-stone-900',
        '[--accent:var(--mb-accent)] dark:[--accent:var(--mb-accent-dark)]',
        '[transform-style:preserve-3d]',
        {
          'md:opacity-80 md:blur-[1px]':
            focusingMember !== null && focusingMember !== member.slug,
          'blur-none': focusingMember === member.slug,
        },
      ])}
      style={{
        '--mb-accent': member.portrait.palette.darkVibrant.background,
        '--mb-accent-dark': member.portrait.palette.lightVibrant.background,
      }}
      perspective={400}
      scale={1.05}
      glareEnable={false}
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      onEnter={onMouseEnter}
      onLeave={onMouseLeave}
    >
      <header className="mb-4 flex flex-col items-center">
        <Image
          data-portrait
          src={urlForImage(member.portrait).url()}
          alt={member.name}
          width={120}
          height={120}
          className="mx-auto h-20 w-20 shadow-2xl md:h-28 md:w-28"
          placeholder="blur"
          blurDataURL={member.portrait.lqip}
          style={{
            clipPath: 'url(#member-arch)',
          }}
        />
        <span className="mt-4 block text-center text-base font-bold tracking-tight text-[var(--accent)]">
          {member.name}
        </span>
        <span className="mt-1 block text-center text-[13px] leading-4 -tracking-[0.015rem] text-[var(--accent)] opacity-70">
          <Balancer>{member.role}</Balancer>
        </span>
      </header>

      {member.social && member.social.length > 0 && (
        <ul className="mb-3 flex w-full items-center justify-center gap-1.5">
          {member.social.map((social) => (
            <SocialLink social={social} key={social._key} />
          ))}
        </ul>
      )}

      <footer className="mt-2 flex w-full items-center justify-between">
        <time className="select-none rounded-lg border border-stone-400/40 p-1 text-xs text-[var(--accent)] opacity-50 [transform:translateZ(60px)] dark:border-stone-600/50">
          {joined}
        </time>

        <LogoHelmet className="h-5 w-5 opacity-60" />
      </footer>
    </Tilt>
  )
}
