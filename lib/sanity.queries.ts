import { groq } from 'next-sanity'

import { i18n } from '~/i18n'
import { sanity } from '~/lib/sanity.client'
import type { Job } from '~/schemas/documents/job'
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
