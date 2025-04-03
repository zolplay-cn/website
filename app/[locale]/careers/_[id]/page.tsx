import type { RootParams } from '~/types/app'
import { redirect } from '~/modules/i18n/navigation'

type PageParams = RootParams & Promise<{ id: string }>

// temp: removing all jobs
export async function generateStaticParams() {
  return []
}

// export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
//   const { id } = await params
//   const job = await getJob(id)

//   if (!job) {
//     return {}
//   }

//   const title = job.title

//   return {
//     title,
//     description: job.descriptionSocial,
//     openGraph: {
//       title,
//       description: job.descriptionSocial,
//     },
//   }
// }

// temp: redirect to careers page
export default async function JobPage({ params }: { params: PageParams }) {
  const { locale } = await params

  redirect({ href: '/careers', locale })

  // return <Job job={job} />
}
