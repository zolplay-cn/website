'use client'

import type { Portfolio } from '~/schemas/documents/portfolio'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { TbArrowBadgeRight, TbArrowUpRight } from 'react-icons/tb'
import Balancer from 'react-wrap-balancer'
import { LocaleLink } from '~/i18n/navigation'
import { urlForImage } from '~/lib/sanity.image'

function makePortfolioLink(portfolio: Portfolio) {
  return `/portfolios/${portfolio.slug}`
}

export function PortfolioCard({ portfolio }: { portfolio: Portfolio }) {
  const t = useTranslations('Portfolios.Card')
  const palette = React.useMemo(() => {
    return portfolio.palette ?? portfolio.image.asset.palette
  }, [portfolio.palette, portfolio.image.asset.palette])

  return (
    <div
      className='w-full rounded-xl shadow-xl ring-2 ring-black/5 dark:ring-white/5'
      style={{
        background: palette.background,
        color: palette.foreground,
        '--mask-color': palette.background,
      }}
    >
      <div className='relative flex'>
        <div className='relative z-20 flex h-full max-w-full flex-col justify-between pl-5 md:max-w-[16rem] md:pl-6 lg:max-w-[22rem]'>
          <div className='not-prose mt-6 flex items-center space-x-3 lg:space-x-5'>
            <Image
              className='h-7 w-7 rounded-lg md:h-9 md:w-9 lg:h-12 lg:w-12 lg:rounded-xl'
              src={urlForImage(portfolio.logo).size(200, 200).url()}
              alt='Logo'
              width={200}
              height={200}
            />

            <span className='text-xs font-bold opacity-60'>{portfolio.timeframe}</span>
          </div>
          <h2
            className='not-prose mt-4 text-lg md:text-xl lg:text-2xl'
            style={{
              color: palette.foreground,
            }}
          >
            <LocaleLink href={makePortfolioLink(portfolio)} className='hover:underline'>
              <Balancer>{portfolio.title}</Balancer>
            </LocaleLink>
          </h2>
          <p
            className='pr-5 text-sm !leading-relaxed opacity-70 md:pr-0 lg:text-sm'
            style={{
              color: palette.foreground,
            }}
          >
            {portfolio.description}
          </p>

          <div
            className='mb-6 flex items-center gap-5 pt-2 text-sm lg:mb-7 lg:pt-4'
            style={{
              color: palette.foreground,
            }}
          >
            <LocaleLink
              href={makePortfolioLink(portfolio)}
              className='flex items-center font-bold text-current no-underline hover:underline'
            >
              <span>{t('LearnMoreCTA')}</span>
              <TbArrowBadgeRight className='h-4 w-4' />
            </LocaleLink>
            {portfolio.website && (
              <Link
                href={portfolio.website}
                target='_blank'
                className='flex items-center font-bold text-current no-underline hover:underline'
              >
                <span>{t('VisitCTA')}</span>
                <TbArrowUpRight className='h-4 w-4' />
              </Link>
            )}
          </div>
        </div>
        <div className='not-prose absolute left-0 right-0 h-full overflow-hidden rounded-xl md:left-[unset] md:aspect-square'>
          <Image
            className='pointer-events-none m-0 mx-auto h-full w-auto select-none rounded-none p-0'
            src={urlForImage(portfolio.image).width(650).height(650).fit('crop').url() || ''}
            alt={portfolio.title}
            width={650}
            height={650}
            placeholder='blur'
            blurDataURL={portfolio.image.asset.lqip}
          />
          <div className='mask-l frosted-noise pointer-events-none absolute inset-y-0 left-0 z-10 w-full select-none md:w-[200px]' />
          <div className='pointer-events-none absolute inset-y-0 left-0 z-10 w-full select-none backdrop-blur-md md:hidden' />
        </div>
      </div>
    </div>
  )
}
