import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Contact } from '~/app/[locale]/contact/Contact'
import { getOpenGraphImage } from '~/lib/helper'

export async function generateMetadata({ params }: { params: RootParams }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const title = t('Contact.Title')
  const description = t('Contact.Description')

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [getOpenGraphImage(title, locale)],
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
