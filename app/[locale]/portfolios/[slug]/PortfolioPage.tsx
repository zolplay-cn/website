'use client'

import type { portfolio } from '~/schemas/documents/portfolio'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
import { TbArrowUpRight } from 'react-icons/tb'
import { ButtonLink } from '~/components/ui/Button'
import { RichText } from '~/components/ui/RichText'
import { urlForImage } from '~/lib/sanity.image'

export function PortfolioPage({ portfolio }: { portfolio: Portfolio }) {
  const t = useTranslations('Portfolios')

  return (
    <>
      <Image
        className='mt-0 h-14 w-14'
        src={urlForImage(portfolio.logo).size(200, 200).url()}
        alt='Logo'
        width={200}
        height={200}
      />
      <h1>{portfolio.title}</h1>
      {portfolio.website && (
        <ButtonLink href={portfolio.website} target='_blank'>
          <span>{t('Card.VisitCTA')}</span>
          <TbArrowUpRight className='h-4 w-4' />
        </ButtonLink>
      )}

      <RichText value={portfolio.content} />
    </>
  )
}
