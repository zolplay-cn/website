import type { RootParams } from '~/types/app'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export default async function GalleryPage({ params }: { params: Promise<RootParams> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })

  return <p>{t('under_construction')}</p>
}
