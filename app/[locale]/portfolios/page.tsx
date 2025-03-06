import type { Metadata } from 'next'
import type { RootParams } from '~/types/app'
import { getTranslations } from 'next-intl/server'
import { PortfolioCard } from '~/app/[locale]/portfolios/PortfolioCard'
import { Portfolios } from '~/app/[locale]/portfolios/Portfolios'
import { getOpenGraphImage } from '~/lib/helper'
import { getPortfolios } from '~/lib/sanity.queries'

export async function generateMetadata({ params }: { params: RootParams }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t('Portfolios.Title'),
    description: t('Portfolios.Description'),
    openGraph: {
      title: t('Portfolios.Title'),
      description: t('Portfolios.Description'),
      images: [getOpenGraphImage(t('Portfolios.Title'), locale)],
    },
  }
}

export default async function PortfolioPage({ params }: { params: RootParams }) {
  const { locale } = await params
  const portfolios = await getPortfolios(locale)

  return (
    <>
      <Portfolios>
        {portfolios.map((portfolio) => (
          <PortfolioCard portfolio={portfolio} key={portfolio._id} />
        ))}
      </Portfolios>
    </>
  )
}
