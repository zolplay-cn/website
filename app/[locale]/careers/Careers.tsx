'use client'

import Image from 'next/image'
import { Link, useTranslations } from 'next-intl'
import React from 'react'
import { TbArrowBadgeLeft, TbArrowBadgeRight, TbIdBadge } from 'react-icons/tb'
import Balancer from 'react-wrap-balancer'

import { Benefits } from '~/components/Benefits'
import { DefaultRichTextComponents, RichText } from '~/components/ui/RichText'
import type { Job } from '~/schemas/documents/job'

import FeaturedImage from './careers-workshop.jpg'

function makeJobLink(job: Job) {
  return `/careers/${job.__i18n_base?._ref ?? job._id}`
}

export function Careers({ jobs }: { jobs: Job[] }) {
  const t = useTranslations('Careers')

  // extract mapper with squad.slug as keys and squad.title as values
  const squadMapper = React.useMemo(
    () =>
      jobs.reduce((acc, job) => {
        const squad = job.squad?.slug

        if (squad) {
          acc[squad.current] = job.squad.title
        }

        return acc
      }, {} as Record<string, string>),
    [jobs]
  )
  // group jobs by `squad.slug` and map to an object
  const squads = React.useMemo(
    () =>
      jobs.reduce((acc, job) => {
        const squad = job.squad?.slug

        if (squad) {
          if (!acc[squad.current]) {
            acc[squad.current] = []
          }

          acc[squad.current].push(job)
        }

        return acc
      }, {} as Record<string, Job[]>),
    [jobs]
  )

  return (
    <>
      <h1>
        <Balancer>{t.rich('Heading', DefaultRichTextComponents)}</Balancer>
      </h1>
      <p>{t.rich('Intro', DefaultRichTextComponents)}</p>
      <Image src={FeaturedImage} alt={t('Title')} placeholder="blur" />

      <Benefits />

      {Object.entries(squads).map(([squad, jobs]) => (
        <section key={squad} className="my-4">
          <h4 className="text-stone-500 dark:text-stone-400">
            {t('Openings.Squad', { squad: squadMapper[squad] })}
          </h4>
          <ul className="list-none space-y-2 py-1 pl-0 md:pl-2">
            {jobs.map((job) => (
              <li
                key={job._id}
                className="border-b border-stone-200 pb-4 dark:border-stone-700"
              >
                <Link
                  href={makeJobLink(job)}
                  className="group flex w-full no-underline"
                >
                  <span className="inline-flex w-full flex-col items-center space-y-1">
                    <span className="flex w-full items-center space-x-1">
                      <TbIdBadge className="h-5 w-5" />
                      <span className="font-bold text-stone-800 group-hover:underline dark:text-stone-100">
                        {job.title}
                      </span>
                      <TbArrowBadgeRight className="flex h-5 w-5" />
                    </span>
                    <span className="w-full text-sm tracking-tight text-stone-400 dark:text-stone-500">
                      {job.excerpt}
                    </span>
                    <span className="w-full space-x-1">
                      <span className="inline-flex items-center rounded bg-green-100 px-1 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-800 dark:text-green-100">
                        {t(('EmploymentType.' + job.employmentType) as any)}
                      </span>
                      <span className="inline-flex items-center rounded bg-indigo-100 px-1 py-0.5 text-xs font-semibold text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100">
                        {t(job.remote ? 'Remote.Yes' : 'Remote.No')}
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  )
}

export function JobDetails({ job }: { job: Job }) {
  const t = useTranslations('Careers')

  return (
    <>
      <Link
        href="/careers"
        className="mb-2 inline-flex items-center text-sm text-stone-500 no-underline transition-transform hover:-translate-x-px hover:underline focus:outline-none focus-visible:ring focus-visible:ring-stone-500 focus-visible:ring-opacity-50 dark:text-stone-400"
      >
        <TbArrowBadgeLeft className="mr-1 flex h-4 w-4" />
        {t('Back')}
      </Link>

      <h1 className="mb-0">{job.title}</h1>
      <p className="my-2 w-full space-x-1">
        <span className="inline-flex items-center rounded bg-green-100 px-1 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-800 dark:text-green-100">
          {t(('EmploymentType.' + job.employmentType) as any)}
        </span>
        <span className="inline-flex items-center rounded bg-indigo-100 px-1 py-0.5 text-xs font-semibold text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100">
          {t(job.remote ? 'Remote.Yes' : 'Remote.No')}
        </span>
      </p>

      <p className="text-sm tracking-tight">
        <Balancer className="rounded-2xl rounded-tl-sm bg-stone-500/5 p-3 dark:bg-stone-400/5">
          {t.rich('Details.Preface', DefaultRichTextComponents)}
        </Balancer>
      </p>

      <section>
        <RichText value={job.description} />
      </section>
    </>
  )
}
