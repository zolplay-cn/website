import type { RootParams } from '~/types/app'
import { getTranslations } from 'next-intl/server'
import { OpenGraphImageTemplate } from '~/components/OpenGraphImage'

export default async function OpengraphImage({ params }: { params: Promise<RootParams & { id: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  // Fallback to general careers title for now
  return OpenGraphImageTemplate({
    text: t('Careers.Title'),
    locale,
  })
}
