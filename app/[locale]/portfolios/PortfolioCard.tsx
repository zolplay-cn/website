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
        backgroundColor: portfolio.image.asset.palette.background,
        color: portfolio.image.asset.palette.foreground,
        '--mask-color': portfolio.image.asset.palette.background,
      }}
    >
      <div className="relative flex h-96">
        <div className="relative z-20 h-full max-w-[22rem] pl-7">
          <div className="flex items-center space-x-5">
            <Image
              className="mb-6 h-12 w-12"
              src={urlForImage(portfolio.logo).size(200, 200).url()}
              alt="Logo"
              width={200}
              height={200}
            />

            <span className="mt-2 text-sm font-bold opacity-60">
              {portfolio.timeframe}
            </span>
          </div>
          <h2
            className="mt-0 leading-normal"
            style={{
              color: portfolio.image.asset.palette.foreground,
            }}
          >
            <Balancer>{portfolio.title}</Balancer>
          </h2>
          <p
            className="h-[92px] text-sm !leading-relaxed opacity-70"
            style={{
              color: portfolio.image.asset.palette.foreground,
            }}
          >
            {portfolio.description}
          </p>

          <div
            className="flex items-center gap-5 pt-2 text-sm"
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
        <div className="absolute right-0 aspect-square h-96 overflow-hidden rounded-r-xl">
          <Image
            className="not-prose m-0 rounded-none p-0"
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
          <div className="mask-l absolute inset-y-0 left-0 z-10 w-[200px] select-none backdrop-blur-[1px]"></div>
        </div>
      </div>
    </div>
  )
}
