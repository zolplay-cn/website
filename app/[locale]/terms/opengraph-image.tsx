import type { RootParams } from '~/types/app'
import { getTranslations } from 'next-intl/server'
import { OpenGraphImageTemplate } from '~/components/OpenGraphImage'

export default async function OpengraphImage({ params }: { params: Promise<RootParams> }) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return OpenGraphImageTemplate({
    text: t('NavMenu.Terms'),
    locale,
  })
}
