import { JobDetails } from '~/app/[locale]/careers/Careers'
import { getMessages } from '~/i18n.server'
import { getOpenGraphImage } from '~/lib/helper'
import { getJob, getJobIds } from '~/lib/sanity.queries'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

export async function generateStaticParams() {
  const ids = await getJobIds()
  return ids.map((id) => ({ id }))
}

type PageParams = RootParams & { id: string }

async function fetchJob(params: PageParams) {
  const { id, locale } = params
  const job = await getJob({ id, locale })
  if (!job) {
    notFound()
  }

  return job
}

export async function generateMetadata({
  params,
}: {
  params: PageParams
}): Promise<Metadata> {
  const job = await fetchJob(params)
  const messages = await getMessages(params)
  const title = job.title
  const subtitle = messages.Careers.Details.Subtitle

  return {
    title,
    description: job.excerpt,
    openGraph: {
      title,
      description: job.excerpt,
      images: [getOpenGraphImage(title, params.locale, subtitle)],
    },
  }
}

export default async function JobPage({ params }: { params: PageParams }) {
  const job = await fetchJob(params)

  return <JobDetails job={job} />
}
