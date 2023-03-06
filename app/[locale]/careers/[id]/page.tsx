import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { JobDetails } from '~/app/[locale]/careers/Careers'
import { getJob, getJobIds } from '~/lib/sanity.queries'

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

  return {
    title: job.title,
    description: job.excerpt,
    openGraph: {
      title: job.title,
      description: job.excerpt,
    },
  }
}

export default async function JobPage({ params }: { params: PageParams }) {
  const job = await fetchJob(params)

  return <JobDetails job={job} />
}
