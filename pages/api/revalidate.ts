import { apiVersion, dataset, projectId } from 'lib/sanity.api'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient, groq, type SanityClient } from 'next-sanity'
import { type ParseBody, parseBody } from 'next-sanity/webhook'

import { i18n } from '~/i18n'
import { jobSchema } from '~/schemas/documents/job'
import { memberSchema } from '~/schemas/documents/member'
import { portfolioSchema } from '~/schemas/documents/portfolio'

export { config } from 'next-sanity/webhook'

function getAllLocaleRoutes(route: string) {
  return i18n.locales.map((locale) => `/${locale}${route}`)
}

export default async function revalidate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { body, isValidSignature } = await parseBody(
      req,
      process.env.REVALIDATE_SECRET
    )
    if (isValidSignature === false) {
      const message = 'Invalid signature'
      console.log(message)
      return res.status(401).send(message)
    }

    if (typeof body._id !== 'string' || !body._id) {
      const invalidId = 'Invalid _id'
      console.error(invalidId, { body })
      return res.status(400).send(invalidId)
    }

    const staleRoutes = await queryStaleRoutes(body as any)
    await Promise.all(staleRoutes.map((route) => res.revalidate(route)))

    const updatedRoutes = `Updated routes: ${staleRoutes.join(', ')}`
    console.log(updatedRoutes)
    return res.status(200).send(updatedRoutes)
  } catch (err) {
    console.error(err)
    return res.status(500).send(err.message)
  }
}

async function queryStaleRoutes(
  body: Pick<ParseBody['body'], '_type' | '_id' | 'date' | 'slug'>
) {
  const client = createClient({ projectId, dataset, apiVersion, useCdn: false })

  switch (body._type) {
    case memberSchema.name:
      return getAllLocaleRoutes('/about')
    case jobSchema.name:
      return await queryStaleJobRoutes(client, body._id)
    case portfolioSchema.name:
      return await queryStalePortfolioRoutes(client, body._id)
    default:
      throw new TypeError(`Unknown type: ${body._type}`)
  }
}

async function queryStaleJobRoutes(client: SanityClient, id: string) {
  return [
    ...getAllLocaleRoutes('/careers'),
    ...getAllLocaleRoutes(`/careers/${id.replace('__i18n_en', '')}`),
  ]
}

async function queryStalePortfolioRoutes(client: SanityClient, id: string) {
  const slug = await client.fetch(
    groq`*[_type == "portfolio" && _id == $id].slug[0]`,
    { id }
  )

  return [
    ...getAllLocaleRoutes('/portfolios'),
    ...getAllLocaleRoutes(`/portfolios/${slug}`),
  ]
}
