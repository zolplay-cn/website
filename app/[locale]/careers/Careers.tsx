'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { clsxm } from '@zolplay/utils'
import { cva } from 'class-variance-authority'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { Link, useLocale, useTranslations } from 'next-intl'
import React from 'react'
import { useForm } from 'react-hook-form'
import { BsFileEarmarkPdf } from 'react-icons/bs'
import {
  TbArrowBadgeDown,
  TbArrowBadgeLeft,
  TbArrowBadgeRight,
  TbArrowRight,
  TbIdBadge,
  TbMail,
} from 'react-icons/tb'
import { UploadButton } from 'react-uploader'
import Balancer from 'react-wrap-balancer'
import { toast } from 'sonner'
import { Uploader, type UploadWidgetResult } from 'uploader'

import { Benefits } from '~/components/Benefits'
import { OurTools } from '~/components/OurTools'
import { Button, ButtonLink } from '~/components/ui/Button'
import { Hr } from '~/components/ui/Hr'
import { RichText } from '~/components/ui/RichText'
import type { Job, JobApplicationFields } from '~/schemas/documents/job'
import { applicationSchema } from '~/schemas/documents/job'

import WorkshopImage from './careers-workshop.jpg'
import FunImage from './fun.jpg'

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
      <h1>{t.rich('Heading')}</h1>
      <p>{t.rich('Intro')}</p>

      <ButtonLink href="#positions">
        {t('SeeAllCTA')}&nbsp;
        <TbArrowRight />
      </ButtonLink>

      <section className="">
        <Image src={WorkshopImage} alt={t('Title')} placeholder="blur" />
        <p>{t.rich('Grow')}</p>

        <Image src={FunImage} alt={t('Title')} placeholder="blur" />
        <p>{t.rich('Fun')}</p>
        <p>{t.rich('Async')}</p>
      </section>

      <Benefits />
      <OurTools />

      <div id="positions">
        {Object.keys(squads).length === 0 && (
          <p className="font-semibold text-stone-600 dark:text-stone-400">
            {t('Openings.Empty')}
          </p>
        )}
        {Object.entries(squads).map(([squad, jobs]) => (
          <section key={squad} className="my-4">
            <h4 className="text-stone-500 dark:text-stone-400">
              {t('Openings.Squad', { squad: squadMapper[squad] })}
            </h4>
            <ul className="list-none space-y-2 py-1 pl-0 md:pl-2">
              {jobs.map((job) => (
                <li
                  key={job._id}
                  className="border-b border-stone-200/70 pb-4 dark:border-stone-700/70"
                >
                  <Link
                    href={makeJobLink(job)}
                    className="group flex w-full no-underline"
                  >
                    <span className="inline-flex w-full flex-col items-center space-y-1">
                      <span className="flex w-full items-center space-x-1">
                        <TbIdBadge className="h-5 w-5" />
                        <span className="font-bold tracking-tighter text-stone-800 group-hover:underline dark:text-stone-100">
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
      </div>
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

      {job.open && (
        <ButtonLink href="#apply">
          {t('ApplyCTA.Idle')}&nbsp;
          <TbArrowBadgeDown />
        </ButtonLink>
      )}

      <p className="text-sm tracking-tight">
        <Balancer className="rounded-2xl rounded-tl-sm bg-stone-500/5 p-3 dark:bg-stone-400/5">
          {t.rich('Details.Preface')}
        </Balancer>
      </p>

      <section>
        <RichText value={job.description} />
      </section>

      <Hr />

      {job.open && <JobApplicationForm link={makeJobLink(job)} />}
    </>
  )
}

const label = cva(['block text-sm font-medium leading-6'])
const textInput = cva([
  'block w-full rounded-md border-0 bg-transparent py-1.5 shadow-sm ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-stone-400 dark:ring-stone-700 dark:placeholder:text-stone-600 dark:focus:ring-stone-500 text-sm sm:leading-6 ',
])
const formError = cva([
  'text-red-600',
  'dark:text-red-400',
  'text-xs',
  'font-semibold',
])
const uploader = Uploader({
  apiKey: process.env.NEXT_PUBLIC_UPLOAD_API_KEY ?? '',
})

function JobApplicationForm({ link }: { link: string }) {
  const locale = useLocale()
  const t = useTranslations('Careers')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<JobApplicationFields>({
    resolver: zodResolver(applicationSchema),
  })
  const onSubmit = React.useCallback(
    async (data) => {
      const pageLink = `${window.location.origin}${link}`

      const response = await fetch('/api/careers', {
        method: 'POST',
        body: JSON.stringify({ data, pageLink }),
      })
      if (response.ok) {
        toast.success(t('ApplyCTA.Success'), { duration: 5000 })
        reset()
        setFilePreviewUrl(null)
      } else {
        toast.error(t('ApplyCTA.Error'))
      }
    },
    [link, reset, t]
  )

  const [filePreviewUrl, setFilePreviewUrl] = React.useState<string | null>(
    null
  )
  const onFileUploaded = React.useCallback(
    (files: UploadWidgetResult[]) => {
      if (files.length === 1) {
        const [file] = files
        setValue('resume', file.originalFile.fileUrl)
        setFilePreviewUrl(file.fileUrl)
      }
    },
    [setValue]
  )

  return (
    <section id="apply" className="pt-8">
      <form
        className={clsxm(
          'space-y-8 divide-y divide-stone-200 transition-opacity dark:divide-stone-700/60',
          isSubmitting && 'pointer-events-none opacity-50'
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-8 divide-y divide-stone-200 dark:divide-stone-700/60">
          <div>
            <div>
              <h2>{t('Details.Application.Title')}</h2>
              <p className="flex flex-col text-sm tracking-tight text-stone-500 md:flex-row md:items-center">
                {t.rich('Details.Application.Tips', {
                  email: (text) => (
                    <span className="inline-flex items-center space-x-0.5 text-stone-600 dark:text-stone-300 md:ml-1">
                      <TbMail className="h-4 w-4" />
                      <a
                        href="mailto:cv@zolplay.com"
                        className="text-stone-600 no-underline hover:underline dark:text-stone-300"
                      >
                        {text}
                      </a>
                    </span>
                  ),
                })}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="about" className={label()}>
                  {t('Details.Application.About.Label')}
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    rows={3}
                    placeholder={t('Details.Application.About.Placeholder')}
                    className={textInput()}
                    defaultValue={''}
                    {...register('about')}
                  />
                  <AnimatePresence mode="wait">
                    {errors.about && (
                      <motion.span
                        className={formError()}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                      >
                        {errors.about?.message}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="sm:col-span-6">
                <div className="mt-2">
                  <div className="space-y-3 text-center">
                    <AnimatePresence mode="wait">
                      {filePreviewUrl ? (
                        <motion.div
                          className="flex flex-col items-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Image
                            src={filePreviewUrl}
                            alt="Uploaded Resume"
                            width={300}
                            height={300}
                            unoptimized
                            unselectable="on"
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <BsFileEarmarkPdf className="mx-auto h-8 w-8 text-stone-400 dark:text-stone-500" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="text-sm text-stone-600 dark:text-stone-400">
                      <UploadButton
                        uploader={uploader}
                        options={{
                          multi: false,
                          mimeTypes: ['application/pdf'],
                          // 50MB
                          maxFileSizeBytes: 50 * 1024 * 1024,
                        }}
                        onComplete={onFileUploaded}
                      >
                        {({ onClick }) => (
                          <Button
                            variant="outline"
                            onClick={onClick}
                            type="button"
                          >
                            {filePreviewUrl
                              ? t('Details.Application.Resume.Change')
                              : t('Details.Application.Resume.Add')}
                          </Button>
                        )}
                      </UploadButton>
                    </div>

                    <p className="text-sm text-stone-500">
                      {t('Details.Application.Resume.FileLimit')}
                    </p>

                    <AnimatePresence mode="wait">
                      {errors.resume && (
                        <motion.span
                          className={formError()}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                        >
                          {errors.resume?.message}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <div>
              <h3 className="text-base font-semibold leading-6">
                {t('Details.Application.Personal')}
              </h3>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="full-name" className={label()}>
                  {t('Details.Application.FullName.Label')}
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="full-name"
                    autoComplete="full-name"
                    placeholder={t('Details.Application.FullName.Placeholder')}
                    className={textInput()}
                    {...register('fullName')}
                  />
                  <AnimatePresence mode="wait">
                    {errors.fullName && (
                      <motion.span
                        className={formError()}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                      >
                        {errors.fullName?.message}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="preferred-name" className={label()}>
                  {t('Details.Application.PreferredName.Label')}
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="preferred-name"
                    autoComplete="nickname"
                    placeholder={t(
                      'Details.Application.PreferredName.Placeholder'
                    )}
                    className={textInput()}
                    {...register('preferredName')}
                  />
                  <AnimatePresence mode="wait">
                    {errors.preferredName && (
                      <motion.span
                        className={formError()}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                      >
                        {errors.preferredName?.message}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email" className={label()}>
                  {t('Details.Application.Email.Label')}
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t('Details.Application.Email.Placeholder')}
                    className={textInput()}
                    {...register('email')}
                  />
                  <AnimatePresence mode="wait">
                    {errors.email && (
                      <motion.span
                        className={formError()}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                      >
                        {errors.email?.message}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {t(isSubmitting ? 'ApplyCTA.Loading' : 'ApplyCTA.Idle')}
            </Button>
          </div>
        </div>
      </form>
    </section>
  )
}
