'use client'

import { Benefits } from '~/components/Benefits'
import { OurTools } from '~/components/OurTools'
import { ButtonLink } from '~/components/ui/Button'
import { Link, useTranslations } from 'next-intl'
import Image from 'next/image'
import { usePostHog } from 'posthog-js/react'
import React from 'react'
import { TbArrowBadgeRight, TbArrowRight, TbIdBadge } from 'react-icons/tb'
import WorkshopImage from './careers-workshop.jpg'
import FunImage from './fun.jpg'

export function Careers({ jobs }: { jobs: any[] }) {
  const posthog = usePostHog()
  const t = useTranslations('Careers')

  return (
    <>
      <h1>{t.rich('Heading')}</h1>
      <p>{t.rich('Intro')}</p>

      <ButtonLink
        href="#positions"
        onClick={() => {
          posthog?.capture('click_see_all_cta')
        }}
      >
        {t('SeeAllCTA')}&nbsp;
        <TbArrowRight />
      </ButtonLink>

      <section>
        <Image src={WorkshopImage} alt={t('Title')} placeholder="blur" />
        <p>{t.rich('Grow')}</p>

        <Image src={FunImage} alt={t('Title')} placeholder="blur" />
        <p>{t.rich('Fun')}</p>
        <p>{t.rich('Async')}</p>
      </section>

      <Benefits />
      <OurTools />

      <div id="positions">
        {!jobs.length ? (
          <p className="font-semibold text-stone-600 dark:text-stone-400">
            {t('Openings.Empty')}
          </p>
        ) : (
          <div>
            <h2>{t('OpenPositions')}</h2>
            <h4 className="-mb-4 text-lg text-stone-500 dark:text-stone-400">
              {t('Openings.Squad', { squad: 'Neuship' })}
            </h4>
            <section className="my-2">
              <ul className="list-none space-y-4 py-1 pl-0 md:pl-2">
                {jobs.map((job) => (
                  <li
                    key={job.id}
                    className="border-b border-stone-200/70 pb-4 dark:border-stone-700/70"
                  >
                    <Link
                      href={`/careers/${job.id}`}
                      className="group flex w-full no-underline"
                    >
                      <span className="inline-flex w-full flex-col items-center space-y-1">
                        <span className="flex w-full items-center space-x-1">
                          <TbIdBadge className="h-5 w-5" />
                          <span className="font-bold tracking-tighter text-stone-800 group-hover:underline dark:text-stone-100">
                            {job.title}
                          </span>
                          <TbArrowBadgeRight className="flex h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </span>
                        <span className="w-full space-x-1">
                          <span className="inline-flex items-center rounded bg-green-100 px-1 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-800 dark:text-green-100">
                            {t(('EmploymentType.' + job.employmentType) as any)}
                          </span>
                          <span className="inline-flex items-center rounded bg-indigo-100 px-1 py-0.5 text-xs font-semibold text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100">
                            {/* OnSite, Hybrid, Remote */}
                            {t(
                              job.workplaceType === 'Remote'
                                ? 'Remote.Yes'
                                : 'Remote.No'
                            )}
                          </span>
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </div>
    </>
  )
}
