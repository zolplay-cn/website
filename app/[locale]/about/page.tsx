import { About } from '~/app/[locale]/about/About'
import { OurMembers } from '~/components/members/OurMembers'
import { getMessages } from '~/i18n.server'
import { getOpenGraphImage } from '~/lib/helper'
import { getMembers } from '~/lib/sanity.queries'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: RootParams
}): Promise<Metadata> {
  const messages = await getMessages(params)
  const title = messages.About.Title

  return {
    title,
    description: messages.About.Description,
    openGraph: {
      title,
      description: messages.About.Description,
      images: [getOpenGraphImage(title, params.locale)],
    },
  }
}

export default async function AboutPage({ params }: { params: RootParams }) {
  const members = await getMembers(params.locale)

  return (
    <>
      <About />
      <OurMembers members={members} />
    </>
  )
}
