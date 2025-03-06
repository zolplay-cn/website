import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'
import { getMessages } from '~/i18n.server'
import { getJob } from '~/lib/ashbyhq.queries'
import { getOpenGraphImage } from '~/lib/helper'
import { getJobIds } from '~/lib/sanity.queries'
import { Job } from '~/modules/careers/job'

export async function generateStaticParams() {
  const ids = await getJobIds()
  return ids.map((id) => ({ id }))
}

type PageParams = RootParams & { id: string }

async function fetchJob(params: PageParams) {
  const job = await getJob(params.id)

  return job
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const job = await fetchJob(params)

  if (!job) {
    return {}
  }

  const messages = await getMessages(params)
  const title = job.title
  const subtitle = messages.Careers.Details.Subtitle

  return {
    title,
    description: job.descriptionSocial,
    openGraph: {
      title,
      description: job.descriptionSocial,
      images: [getOpenGraphImage(title, params.locale, subtitle)],
    },
  }
}

export default async function JobPage({ params }: { params: PageParams }) {
  const job = await fetchJob(params)

  if (!job) {
    redirect('/careers')
  }

  return <Job job={job} />
}
