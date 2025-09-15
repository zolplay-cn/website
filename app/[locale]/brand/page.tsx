import type { Metadata } from 'next'
import type { RootParams } from '~/types/app'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: RootParams }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Brand' })

  const title = t('Title')
  const description = t('Description')

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    alternates: {
      canonical: '/brand',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function BrandPage({ params }: { params: Promise<RootParams> }) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  const Content = (await import(`./page.${locale}.mdx`)).default
  return <Content />
}
