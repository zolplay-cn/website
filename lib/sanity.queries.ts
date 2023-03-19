import { groq } from 'next-sanity'

import { i18n } from '~/i18n'
import { sanity } from '~/lib/sanity.client'
import type { Job } from '~/schemas/documents/job'
import type { Member } from '~/schemas/documents/member'
import type { Page } from '~/schemas/documents/page'
import type { Portfolio } from '~/schemas/documents/portfolio'
import type { Squad } from '~/schemas/documents/squad'

const localeMapper = {
  'zh-CN': 'zh_CN',
}

/**
 * Make locale params for Sanity queries.
 * @param locale
 */
function makeLocaleParams(locale: string) {
  return { locale: localeMapper[locale] || locale }
}

/**
 * Make localized id params for Sanity queries.
 * @param id
 * @param locale
 */
function makeLocalizedIdParams({ id, locale }: { id: string; locale: string }) {
  return {
    id: locale === i18n.defaultLocale ? id : `${id}__i18n_${locale}`,
  }
}

/**
 * Make locale filter for Sanity queries.
 * @param locale
 */
function makeLocaleFilter(locale: string) {
  if (locale === i18n.defaultLocale) {
    return `!defined(__i18n_lang)`
  }

  return `__i18n_lang == $locale`
}

export const squadsQuery = groq`*[_type == "squad"] {
  ...,
  "title": title[$locale],
}`
export async function getSquads(locale: string) {
  return sanity!.fetch<Squad[]>(squadsQuery, makeLocaleParams(locale))
}

export const jobsQuery = (filter?: string) =>
  groq`*[_type == "job" && open == true ${filter ? `&& ${filter}` : ''}] {
  ...,
  "squad": squad->{
    ...,
    "title": title[$locale],
  }
}`
export async function getJobs(locale: string) {
  return sanity!.fetch<Job[]>(
    jobsQuery(makeLocaleFilter(locale)),
    makeLocaleParams(locale)
  )
}

export const jobIdsQuery = groq`*[_type == "job" && open == true && !defined(__i18n_lang)]._id`
export async function getJobIds() {
  return sanity!.fetch<string[]>(jobIdsQuery)
}

export const jobQuery = groq`*[_type == "job" && _id == $id][0]`
export async function getJob({ id, locale }: { id: string; locale: string }) {
  return sanity!.fetch<Job>(jobQuery, makeLocalizedIdParams({ id, locale }))
}

export const portfolioIdsQuery = groq`*[_type == "portfolio" && !defined(__i18n_lang)].slug`
export async function getPortfolioSlugs() {
  return sanity!.fetch<string[]>(portfolioIdsQuery)
}

export const portfoliosQuery = (filter?: string) =>
  groq`*[_type == "portfolio" ${
    filter ? `&& ${filter}` : ''
  }] | order(order asc, _updatedAt desc) {
  ...,
  image {
    _ref,
    asset->{
      path,
      url,
      "palette": metadata.palette.vibrant,
      "lqip": metadata.lqip
    }
  }
}`
export async function getPortfolios(locale: string) {
  return sanity!.fetch<Portfolio[]>(
    portfoliosQuery(makeLocaleFilter(locale)),
    makeLocaleParams(locale)
  )
}

export const portfolioQuery = (
  filter?: string
) => groq`*[_type == "portfolio" && slug == $slug ${
  filter ? `&& ${filter}` : ''
}][0] {
  ...,
  image {
    _ref,
    asset->{
      path,
      url,
      "lqip": metadata.lqip
    }
  },
  content[] {
    ...,
    _type == "image" => {
      "lqip": asset->metadata.lqip,
      "dimensions": asset->metadata.dimensions
    }
  }
}`
export async function getPortfolio({
  slug,
  locale,
}: {
  slug: string
  locale: string
}) {
  return sanity!.fetch<Portfolio | undefined>(
    portfolioQuery(makeLocaleFilter(locale)),
    {
      ...makeLocaleParams(locale),
      slug,
    }
  )
}

export const membersQuery = groq`*[_type == "member"] | order(name asc, _updatedAt desc) {
  ...,
  "slug": slug.current,
  "role": role[$locale],
  portrait {
    ...,
    "lqip": asset->metadata.lqip,
    "dimensions": asset->metadata.dimensions,
    "palette": asset->metadata.palette { darkMuted, darkVibrant, lightMuted, lightVibrant }
  }
}`
export async function getMembers(locale: string) {
  return sanity!.fetch<Member[]>(membersQuery, makeLocaleParams(locale))
}

export const pageSlugsQuery = groq`*[_type == "page" && !defined(__i18n_lang)].slug`
export async function getPageSlugs() {
  return sanity!.fetch<string[]>(pageSlugsQuery)
}

const pageQuery = (
  filter?: string
) => groq`*[_type == "page" && slug == $slug ${
  filter ? `&& ${filter}` : ''
}][0] {
  ...,
  content[] {
    ...,
    _type == "image" => {
      "lqip": asset->metadata.lqip,
      "dimensions": asset->metadata.dimensions
    },
  }
}`
export async function getPage({
  slug,
  locale,
}: {
  slug: string
  locale: string
}) {
  return sanity!.fetch<Page>(pageQuery(makeLocaleFilter(locale)), {
    ...makeLocaleParams(locale),
    slug,
  })
}
