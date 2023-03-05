import type { Metadata } from 'next'

import { getMessages } from '~/i18n.server'

import { Careers } from './Careers'

export async function generateMetadata({
  params,
}: {
  params: RootParams
}): Promise<Metadata> {
  const messages = await getMessages(params)

  return {
    title: messages.Careers.Title,
  }
}

export default function CareersPage() {
  return <Careers />
}
