import type { RootParams } from '~/types/app'
import { OpenGraphImageTemplate } from '~/components/OpenGraphImage'
import { PORTFOLIOS } from '~/modules/portfolios/datasource'

export default async function OpengraphImage({ params }: { params: RootParams & Promise<{ slug: string }> }) {
  const { locale, slug } = await params

  return OpenGraphImageTemplate({
    text: PORTFOLIOS.find((p) => p.slug === slug)?.title[locale] ?? '',
    locale,
  })
}
