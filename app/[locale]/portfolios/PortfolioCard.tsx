'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Link as LocaleLink, useTranslations } from 'next-intl'
import { TbArrowBadgeRight, TbArrowUpRight } from 'react-icons/tb'
import Balancer from 'react-wrap-balancer'

import { urlForImage } from '~/lib/sanity.image'
import type { Portfolio } from '~/schemas/documents/portfolio'

export function PortfolioCard({ portfolio }: { portfolio: Portfolio }) {
  const t = useTranslations('Portfolios.Card')

  return (
    <div
      className="w-full rounded-xl shadow-xl ring-4 ring-black/5 dark:ring-white/10"
      style={{
        background: portfolio.image.asset.palette.background,
        color: portfolio.image.asset.palette.foreground,
        '--mask-color': portfolio.image.asset.palette.background,
      }}
    >
      <div className="relative flex h-72 md:h-80 lg:h-96">
        <div className="relative z-20 h-full max-w-full pl-5 md:max-w-[16rem] md:pl-7 lg:max-w-[22rem]">
          <div className="flex items-center space-x-3 lg:space-x-5">
            <Image
              className="h-7 w-7 !rounded-lg md:mb-4 md:h-9 md:w-9 lg:mb-6 lg:h-12 lg:w-12 lg:!rounded-xl"
              src={urlForImage(portfolio.logo).size(200, 200).url()}
              alt="Logo"
              width={200}
              height={200}
            />

            <span className="text-sm font-bold opacity-60 md:mt-3 lg:mt-2">
              {portfolio.timeframe}
            </span>
          </div>
          <h2
            className="mt-0 text-lg md:text-xl lg:text-2xl"
            style={{
              color: portfolio.image.asset.palette.foreground,
            }}
          >
            <Balancer>{portfolio.title}</Balancer>
          </h2>
          <p
            className="pr-5 text-xs !leading-relaxed opacity-70 md:pr-0 lg:text-sm"
            style={{
              color: portfolio.image.asset.palette.foreground,
            }}
          >
            {portfolio.description}
          </p>

          <div
            className="flex items-center gap-5 pt-2 text-sm lg:pt-4"
            style={{
              color: portfolio.image.asset.palette.foreground,
            }}
          >
            <LocaleLink
              href="/"
              className="flex items-center text-current no-underline hover:underline"
            >
              <span>{t('LearnMoreCTA')}</span>
              <TbArrowBadgeRight className="h-4 w-4" />
            </LocaleLink>
            {portfolio.website && (
              <Link
                href={portfolio.website}
                target="_blank"
                className="flex items-center text-current no-underline hover:underline"
              >
                <span>{t('VisitCTA')}</span>
                <TbArrowUpRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
        <div className="absolute right-0 h-72 w-72 overflow-hidden rounded-r-xl md:h-80 md:w-80 lg:h-96 lg:w-96">
          <Image
            className="not-prose m-0 h-full w-full rounded-none p-0"
            src={
              urlForImage(portfolio.image)
                .width(650)
                .height(650)
                .fit('crop')
                .url() || ''
            }
            alt={portfolio.title}
            width={650}
            height={650}
            placeholder="blur"
            blurDataURL={portfolio.image.asset.lqip}
          />
          <div className="mask-l frosted-noise pointer-events-none absolute inset-y-0 left-0 z-10 w-full select-none md:w-[200px]" />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-full select-none backdrop-blur-md md:w-[100px] md:backdrop-blur-[1px]" />
        </div>
      </div>
    </div>
  )
}
