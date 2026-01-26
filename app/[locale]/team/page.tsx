import type { Metadata } from 'next'
import type { RootParams } from '~/types/app'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: RootParams }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t('Team.Title'),
    description: t('Team.Description'),
    openGraph: {
      title: t('Team.Title'),
      description: t('Team.Description'),
    },
    keywords: t('Team.Keywords'),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: '/team',
    },
  }
}

export default async function TeamPage({ params }: { params: Promise<RootParams> }) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  const Content = (await import(`./page.${locale}.mdx`)).default
  return <Content />
}
