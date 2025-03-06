import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getJobs } from '~/lib/ashbyhq.queries'
import { getOpenGraphImage } from '~/lib/helper'
import { Careers } from './Careers'

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

export default async function CareersPage() {
  const jobs = await getJobs()

  return <Careers jobs={jobs} />
}
