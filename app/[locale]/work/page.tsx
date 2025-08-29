import type { Metadata } from 'next'
import type { RootParams } from '~/types/app'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: RootParams }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t('Portfolios.PageTitle'),
    description: t('Portfolios.PageDescription'),
    openGraph: {
      title: t('Portfolios.PageTitle'),
      description: t('Portfolios.PageDescription'),
    },
    keywords: t('Portfolios.PageKeywords'),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: '/work',
    },
  }
}

export default async function Portfolio({ params }: { params: Promise<RootParams> }) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  const Content = (await import(`./page.${locale}.mdx`)).default
  return <Content />
}
