import type { Metadata } from 'next'
import type { RootParams } from '~/types/app'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { getOpenGraphImage } from '~/lib/helper'
import { PORTFOLIOS } from '~/modules/portfolios/datasource'

type PortfolioParams = RootParams & Promise<{ slug: string }>

export async function generateStaticParams() {
  return PORTFOLIOS.map((portfolio) => ({
    slug: portfolio.slug,
  }))
}

export async function generateMetadata({ params }: { params: PortfolioParams }): Promise<Metadata> {
  const { locale, slug } = await params
  const t = await getTranslations({ locale, namespace: 'Portfolios.Details' })

  const portfolio = PORTFOLIOS.find((p) => p.slug === slug)
  if (!portfolio) {
    return {}
  }

  return {
    title: `${portfolio.title[locale]} | ${t('Subtitle')}`,
    description: portfolio.description[locale],
    openGraph: {
      title: portfolio.title[locale],
      description: portfolio.description[locale],
      images: [getOpenGraphImage(portfolio.title[locale], locale)],
    },
  }
}

export default async function PortfolioPage({ params }: { params: PortfolioParams }) {
  const { locale, slug } = await params

  const portfolio = PORTFOLIOS.find((p) => p.slug === slug)
  if (!portfolio) {
    notFound()
  }

  try {
    const Content = (await import(`./page.${locale}.${slug}.mdx`)).default
    return <Content />
  } catch (error) {
    console.error(`Failed to load MDX file for ${slug} in ${locale}:`, error)
    notFound()
  }
}
