'use client'

import Image from 'next/image'
import { Link, useTranslations } from 'next-intl'
import React from 'react'
import { TbArrowUpRight, TbIdBadge } from 'react-icons/tb'
import Balancer from 'react-wrap-balancer'

import { DefaultRichTextComponents } from '~/components/ui/RichText'
import type { Job } from '~/schemas/documents/job'

import FeaturedImage from './careers-workshop.jpg'

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

      {Object.entries(squads).map(([squad, jobs]) => (
        <section key={squad}>
          <h4 className="text-stone-500 dark:text-stone-400">
            {t('Openings.Squad', { squad: squadMapper[squad] })}
          </h4>
          <ul className="list-none">
            {jobs.map((job) => (
              <li key={job._id} className="">
                <Link
                  href={`/careers/${job._id}`}
                  className="flex no-underline"
                >
                  <span className="inline-flex items-center space-x-1 hover:underline">
                    <TbIdBadge className="h-5 w-5" />
                    <span className="font-bold text-stone-800 dark:text-stone-100">
                      {job.title}
                    </span>
                    <span className="inline-flex items-center rounded bg-green-100 px-1 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-800 dark:text-green-100">
                      {t(('EmploymentType.' + job.employmentType) as any)}
                    </span>
                    <span className="inline-flex items-center rounded bg-indigo-100 px-1 py-0.5 text-xs font-semibold text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100">
                      {t(job.remote ? 'Remote.Yes' : 'Remote.No')}
                    </span>
                    <TbArrowUpRight className="h-5 w-5" />
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
