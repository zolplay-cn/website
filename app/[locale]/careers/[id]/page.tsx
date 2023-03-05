import { getJob, getJobIds } from '~/lib/sanity.queries'

export async function generateStaticParams({ params }: { params: RootParams }) {
  const ids = await getJobIds(params.locale)
  return ids.map((id) => ({ id }))
}

export default async function JobPage({
  params,
}: {
  params: RootParams & { id: string }
}) {
  const { id } = params
  const job = await getJob(id)

  return (
    <>
      <h1>{job.title}</h1>
    </>
  )
}
