import { OurMembers } from '~/components/members/OurMembers'
import { getMembers } from '~/lib/sanity.queries'

export default async function AboutPage({ params }: { params: RootParams }) {
  const members = await getMembers(params.locale)

  return (
    <>
      <h1>About</h1>

      <OurMembers members={members} />
    </>
  )
}
