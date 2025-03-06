import type { Metadata } from 'next'
import { getMessages } from '~/i18n.server'
import { getJobs } from '~/lib/ashbyhq.queries'
import { getOpenGraphImage } from '~/lib/helper'
import { Careers } from './Careers'

export async function generateMetadata({ params }: { params: RootParams }): Promise<Metadata> {
  const messages = await getMessages(params)

  return {
    title: messages.Careers.Title,
    description: messages.Careers.Description,
    openGraph: {
      title: messages.Careers.Title,
      description: messages.Careers.Description,
      images: [getOpenGraphImage(messages.Careers.Title, params.locale)],
    },
  }
}

export default async function CareersPage() {
  const jobs = await getJobs()

  return <Careers jobs={jobs} />
}
