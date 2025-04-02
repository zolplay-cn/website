import type { Metadata } from 'next'
import type { RootParams } from '~/types/app'
import { getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { getJob, getJobs } from '~/lib/ashbyhq.queries'
import { getOpenGraphImage } from '~/lib/helper'
import { Job } from '~/modules/careers/job'

export async function generateStaticParams() {
  const jobs = await getJobs()
  return jobs.map((job) => ({ id: job.id }))
}

type PageParams = Promise<RootParams & { id: string }>
export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { id, locale } = await params
  const job = await getJob(id)

  if (!job) {
    return {}
  }

  const t = await getTranslations({ locale })
  const title = job.title
  const subtitle = t('Careers.Details.Subtitle')

  return {
    title,
    description: job.descriptionSocial,
    openGraph: {
      title,
      description: job.descriptionSocial,
      images: [getOpenGraphImage(title, locale, subtitle)],
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
