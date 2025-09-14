import type { Metadata } from 'next'
import type { RootParams } from '~/types/app'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Brand Guidelines',
    description: 'Resources to present Zolplay with taste and consistency.',
    openGraph: {
      title: 'Brand Guidelines',
      description: 'Resources to present Zolplay with taste and consistency.',
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
