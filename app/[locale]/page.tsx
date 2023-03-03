import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations()

  return (
    <main>
      <h1>{t('under_construction')}</h1>
    </main>
  )
}
