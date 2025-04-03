import type { Metadata } from 'next'
import type { RootParams } from '~/types/app'
import React from 'react'
import { getJob } from '~/lib/ashbyhq.queries'
import { Job } from '~/modules/careers/job'
import { redirect } from '~/modules/i18n/navigation'

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
  const { id, locale } = await params
  const job = await getJob(id)

  if (!job) {
    redirect({ href: '/careers', locale })
  }

  return <Job job={job} />
}
