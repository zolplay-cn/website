import type { Metadata } from 'next'
import type { RootParams } from '~/types/app'
import { redirect } from 'next/navigation'
import { queryJob } from '~/modules/careers/_queries/job.query'
import { queryJobs } from '~/modules/careers/_queries/jobs.query'

export async function generateStaticParams() {
  const jobs = await queryJobs()
  return jobs.map((job) => ({ id: job.id }))
}

type PageParams = RootParams & Promise<{ id: string }>

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { id } = await params
  const job = await queryJob(id)

  if (!job || !job.id) {
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
  const job = await queryJob(id)

  if (!job || !job.id) {
    redirect('/careers')
  }

  return null
  // return <Job job={job} />
}
