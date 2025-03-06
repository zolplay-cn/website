import type { Metadata } from 'next'
import type { RootParams } from '~/types/app'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { PortfolioPage } from '~/app/[locale]/portfolios/[slug]/PortfolioPage'
import { getOpenGraphImage } from '~/lib/helper'
import { getPortfolio, getPortfolioSlugs } from '~/lib/sanity.queries'

export async function generateStaticParams() {
  const slugs = await getPortfolioSlugs()
  return slugs.map((slug) => ({ slug }))
}

type PageParams = Awaited<RootParams> & { slug: string }
async function fetchPortfolio(params: PageParams) {
  const portfolio = await getPortfolio({
    slug: params.slug,
    locale: params.locale,
  })
  if (!portfolio) {
    notFound()
  }

  return portfolio
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const portfolio = await fetchPortfolio(params)
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: portfolio.title,
    description: portfolio.description,
    openGraph: {
      title: portfolio.title,
      description: portfolio.description,
      images: [getOpenGraphImage(portfolio.title, locale, t('Portfolios.Details.Subtitle'))],
    },
  }
}

export default async function Page({ params }: { params: PageParams }) {
  const portfolio = await fetchPortfolio(params)

  return <PortfolioPage portfolio={portfolio} />
}
