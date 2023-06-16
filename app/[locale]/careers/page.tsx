import { getMessages } from '~/i18n.server'
import { getOpenGraphImage } from '~/lib/helper'
import { getJobs } from '~/lib/sanity.queries'
import type { Metadata } from 'next'
import { Careers } from './Careers'

export async function generateMetadata({
  params,
}: {
  params: RootParams
}): Promise<Metadata> {
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

export default async function CareersPage({ params }: { params: RootParams }) {
  const [jobs] = await Promise.all([getJobs(params.locale)])

  return <Careers jobs={jobs} />
}
