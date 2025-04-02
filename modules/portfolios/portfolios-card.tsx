'use client'

import type { Portfolio } from './datasource'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { TbArrowBadgeRight, TbArrowUpRight } from 'react-icons/tb'
import Balancer from 'react-wrap-balancer'
import { LocaleLink } from '~/modules/i18n/navigation'

function makePortfolioLink(portfolio: Portfolio) {
  return `/portfolios/${portfolio.slug}`
}

export function PortfolioCard({ portfolio, locale }: { portfolio: Portfolio; locale: string }) {
  const t = useTranslations('Portfolios.Card')
  const palette = portfolio.palette

  return (
    <div
      className='w-full rounded-xl ring-2 shadow-xl ring-black/5 dark:ring-white/5'
      style={{
        background: palette.background,
        color: palette.foreground,
        '--mask-color': palette.background,
      }}
    >
      <div className='flex relative'>
        <div className='relative z-20 flex h-full max-w-full flex-col justify-between pl-5 md:max-w-[16rem] md:pl-6 lg:max-w-[22rem]'>
          <div className='flex items-center mt-6 space-x-3 not-prose lg:space-x-5'>
            <Image
              className='w-7 h-7 rounded-lg md:h-9 md:w-9 lg:size-12 lg:rounded-xl'
              src={portfolio.logo}
              alt='Logo'
            />

            <span className='text-xs font-bold opacity-60'>{portfolio.timeframe[locale]}</span>
          </div>
          <h2 className='mt-4'>
            <LocaleLink
              href={makePortfolioLink(portfolio)}
              className='text-lg not-prose md:text-xl lg:text-2xl hover:underline'
              style={{
                color: palette.foreground,
              }}
            >
              <Balancer>{portfolio.title[locale]}</Balancer>
            </LocaleLink>
          </h2>
          <p
            className='pr-5 text-sm !leading-relaxed opacity-70 md:pr-0 lg:text-sm'
            style={{
              color: palette.foreground,
            }}
          >
            {portfolio.description[locale]}
          </p>

          <div
            className='flex gap-5 items-center pt-2 mb-6 text-sm lg:mb-7 lg:pt-4'
            style={{
              color: palette.foreground,
            }}
          >
            {portfolio.hasDetail && (
              <LocaleLink
                href={makePortfolioLink(portfolio)}
                className='flex items-center font-bold text-current no-underline hover:underline'
              >
                <span>{t('LearnMoreCTA')}</span>
                <TbArrowBadgeRight className='size-4' />
              </LocaleLink>
            )}
            {portfolio.website && (
              <Link
                href={portfolio.website}
                target='_blank'
                className='flex items-center font-bold text-current no-underline hover:underline'
              >
                <span>{t('VisitCTA')}</span>
                <TbArrowUpRight className='size-4' />
              </Link>
            )}
          </div>
        </div>
        <div className='not-prose absolute left-0 right-0 h-full overflow-hidden rounded-xl md:left-[unset] md:aspect-square'>
          <Image
            className='p-0 m-0 mx-auto w-auto h-full rounded-none pointer-events-none select-none'
            src={portfolio.image}
            alt={portfolio.title[locale]}
            placeholder={portfolio.image.src.includes('gif') ? undefined : 'blur'}
          />
          <div className='mask-l frosted-noise pointer-events-none absolute inset-y-0 left-0 z-10 w-full select-none md:w-[200px]' />
          <div className='absolute inset-y-0 left-0 z-10 w-full backdrop-blur-md pointer-events-none select-none md:hidden' />
        </div>
      </div>
    </div>
  )
}
