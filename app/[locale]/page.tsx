import type { RootParams } from '~/types/app'
import { setRequestLocale } from 'next-intl/server'

export default async function HomePage({ params }: { params: Promise<RootParams> }) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  const Content = (await import(`./page.${locale}.mdx`)).default
  return <Content />
}
