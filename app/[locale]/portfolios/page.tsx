import { Metadata } from 'next'

import { PortfolioCard } from '~/app/[locale]/portfolios/PortfolioCard'
import { Portfolios } from '~/app/[locale]/portfolios/Portfolios'
import { getMessages } from '~/i18n.server'
import { getOpenGraphImage } from '~/lib/helper'
import { getPortfolios } from '~/lib/sanity.queries'

export async function generateMetadata({
  params,
}: {
  params: RootParams
}): Promise<Metadata> {
  const messages = await getMessages(params)

  return {
    title: messages.Portfolios.Title,
    description: messages.Portfolios.Description,
    openGraph: {
      title: messages.Portfolios.Title,
      description: messages.Portfolios.Description,
      images: [getOpenGraphImage(messages.Portfolios.Title, params.locale)],
    },
  }
}

export default async function PortfolioPage({
  params,
}: {
  params: RootParams
}) {
  const portfolios = await getPortfolios(params.locale)

  return (
    <>
      <Portfolios>
        {portfolios.map((portfolio) => (
          <PortfolioCard portfolio={portfolio} key={portfolio._id} />
        ))}
      </Portfolios>
    </>
  )
}
