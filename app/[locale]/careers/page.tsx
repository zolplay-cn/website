import type { Metadata } from 'next'

import { getMessages } from '~/i18n.server'
import { getJobs } from '~/lib/sanity.queries'

import { Careers } from './Careers'

export async function generateMetadata({
  params,
}: {
  params: RootParams
}): Promise<Metadata> {
  const messages = await getMessages(params)

  return {
    title: messages.Careers.Title,
  }
}

export default async function CareersPage({ params }: { params: RootParams }) {
  const [jobs] = await Promise.all([getJobs(params.locale)])

  return <Careers jobs={jobs} />
}
