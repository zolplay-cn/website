import type { RootParams } from '~/types/app'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export default async function IPPage({ params }: { params: Promise<RootParams> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })

  return <div className='h-dvh grid place-items-center'>{t('under_construction')}</div>
}
