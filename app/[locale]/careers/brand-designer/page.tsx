import type { Metadata } from 'next'
import type { RootParams } from '~/types/app'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<RootParams> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t('Careers.BrandDesigner.Title'),
    alternates: {
      canonical: '/careers/brand-designer',
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: t('Careers.BrandDesigner.Title'),
    },
  }
}

export default async function BrandDesignerPage({ params }: { params: Promise<RootParams> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const Content = (await import(`./page.${locale}.mdx`)).default
  return <Content />
}
