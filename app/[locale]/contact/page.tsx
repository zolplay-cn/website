import type { Metadata } from 'next'
import { Contact } from '~/app/[locale]/contact/Contact'
import { getMessages } from '~/i18n.server'
import { getOpenGraphImage } from '~/lib/helper'

export async function generateMetadata({ params }: { params: RootParams }): Promise<Metadata> {
  const messages = await getMessages(params)
  const title = messages.Contact.Title
  const description = messages.Contact.Description

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [getOpenGraphImage(title, params.locale)],
    },
  }
}

export default function ContactPage() {
  return (
    <>
      <Contact />
    </>
  )
}
