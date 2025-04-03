import type { Metadata } from 'next'
import type { RootParams } from '~/types/app'
import { redirect } from 'next/navigation'
import React from 'react'
import { getJob, getJobs } from '~/lib/ashbyhq.queries'
import { Job } from '~/modules/careers/job'

export async function generateStaticParams() {
  const jobs = await getJobs()
  return jobs.map((job) => ({ id: job.id }))
}

type PageParams = RootParams & Promise<{ id: string }>

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { id } = await params
  const job = await getJob(id)

  if (!job) {
    return {}
  }

  const title = job.title

  return {
    title,
    description: job.descriptionSocial,
    openGraph: {
      title,
      description: job.descriptionSocial,
    },
  }
}

export default async function JobPage({ params }: { params: PageParams }) {
  const { id } = await params
  const job = await getJob(id)

  if (!job) {
    redirect('/careers')
  }

  return <Job job={job} />
}
