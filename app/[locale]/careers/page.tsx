import type { Metadata } from 'next'
import type { RootParams } from '~/types/app'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { getOpenGraphImage } from '~/lib/helper'

export async function generateMetadata({ params }: { params: RootParams }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: t('Careers.Title'),
    description: t('Careers.Description'),
    openGraph: {
      title: t('Careers.Title'),
      description: t('Careers.Description'),
      images: [getOpenGraphImage(t('Careers.Title'), locale)],
    },
  }
}

export default async function CareersPage({ params }: { params: Promise<RootParams> }) {
  const { locale } = await params

  try {
    const Content = (await import(`./page.${locale}.mdx`)).default
    return <Content />
    // eslint-disable-next-line unused-imports/no-unused-vars
  } catch (_) {
    notFound()
  }
}
