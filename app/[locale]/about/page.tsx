import type { Metadata } from 'next'
import type { RootParams } from '~/types/app'
import { getTranslations } from 'next-intl/server'
import { About } from '~/app/[locale]/about/About'
import { OurMembers } from '~/components/zolplayers/zolplayers'
import { getOpenGraphImage } from '~/lib/helper'

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
      images: [getOpenGraphImage(title, locale)],
    },
  }
}

export default async function AboutPage({ params }: { params: Promise<RootParams> }) {
  return (
    <>
      <About />
      <OurMembers />
    </>
  )
}
