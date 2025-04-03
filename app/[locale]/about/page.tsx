import type { Metadata } from 'next'
import type { RootParams } from '~/types/app'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<RootParams> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const title = t('About.Title')

  return {
    title,
    description: t('About.Description'),
    openGraph: {
      title,
      description: t('About.Description'),
    },
  }
}

export default async function Home({ params }: { params: Promise<RootParams> }) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  const Content = (await import(`./page.${locale}.mdx`)).default
  return <Content />
}
