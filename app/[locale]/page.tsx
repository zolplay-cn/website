import type { RootParams } from '~/types/app'
import { notFound } from 'next/navigation'

export default async function Home({ params }: { params: Promise<RootParams> }) {
  const { locale } = await params

  try {
    const Content = (await import(`./page.${locale}.mdx`)).default
    return <Content />
    // eslint-disable-next-line unused-imports/no-unused-vars
  } catch (_) {
    notFound()
  }
}
