'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { clsxm } from '@zolplay/utils'
import { Benefits } from '~/components/Benefits'
import { OurTools } from '~/components/OurTools'
import { Button, ButtonLink } from '~/components/ui/Button'
import { Hr } from '~/components/ui/Hr'
import { applicationSchema } from '~/schemas/documents/career'
import type { JobApplicationFields } from '~/schemas/documents/career'
import { cva } from 'class-variance-authority'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useTranslations } from 'next-intl'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { usePostHog } from 'posthog-js/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { BsFileEarmarkPdf } from 'react-icons/bs'
import {
  TbArrowBadgeDown,
  TbArrowBadgeLeft,
  TbArrowBadgeRight,
  TbArrowRight,
  TbIdBadge,
} from 'react-icons/tb'
import { toast } from 'sonner'
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

export function JobDetails({ job }: { job: any }) {
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
          {t(job.isRemote ? 'Remote.Yes' : 'Remote.No')}
        </span>
      </p>

      {job.isListed && (
        <ButtonLink href="#apply">
          {t('ApplyCTA.Idle')}&nbsp;
          <TbArrowBadgeDown />
        </ButtonLink>
      )}

      <div
        className="prose mt-5 dark:prose-invert prose-p:my-0 prose-p:leading-[1.8] prose-ol:my-0 prose-ul:my-0 [&>p]:my-4"
        dangerouslySetInnerHTML={{ __html: job.descriptionHtml }}
      />

      <Hr />

      {job.isListed && <JobApplicationForm />}
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

function JobApplicationForm() {
  const t = useTranslations('Careers')
  const pathname = usePathname()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<JobApplicationFields>({
    resolver: zodResolver(applicationSchema),
  })

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const [fileName, setFileName] = React.useState<string | null>(null)
  const [hasApplied, setHasApplied] = React.useState(false)

  const onSubmit = React.useCallback(
    async (data) => {
      const jobPostingId = pathname?.split('/')[2]
      if (!jobPostingId) return

      const formData = new FormData()
      formData.append('jobPostingId', jobPostingId)
      formData.append('_systemfield_name', data.name)
      formData.append('_systemfield_email', data.email)
      formData.append('_systemfield_resume', 'Resume/CV')
      formData.append('Resume/CV', data.resume)
      formData.append('6011f28b-80a1-4c63-a908-20b92a6a442f', data.phone)
      formData.append(
        '_systemfield_location',
        JSON.stringify({ city: data.location })
      )
      if (data.otherInfo) {
        formData.append('edd97512-0190-4989-b099-935bbb66593d', data.otherInfo)
      }
      if (data.github) {
        formData.append('afad3705-bb5f-483a-9b05-867a97ad5d89', data.github)
      }
      if (data.website) {
        formData.append('4f882af3-4e9f-4e3a-b9b4-c3d7ddd29974', data.website)
      }
      if (data.twitter) {
        formData.append('d2ba42fb-474c-4be9-a537-5abddc736e5d', data.twitter)
      }
      if (data.linkedin) {
        formData.append('e4a211ff-bd50-46f0-84c7-419e300c3314', data.linkedin)
      }

      const res = await fetch('/api/careers', {
        method: 'POST',
        body: formData,
      }).then((res) => res.json())

      if (res.status === 'success') {
        toast.success(t('ApplyCTA.Success'), { duration: 5000 })
        reset()
        setFileName(null)
        setHasApplied(true)
      } else {
        toast.error(t('ApplyCTA.Error'))
      }
    },
    [pathname, reset, t]
  )

  return (
    <section id="apply" className="pt-8">
      <form
        className={clsxm(isSubmitting && 'pointer-events-none opacity-50')}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="pb-2">{t('Details.Application.Title')}</h2>

        {!hasApplied ? (
          <>
            <div>
              <div className="border-b border-stone-200 pb-2 dark:border-stone-700/60">
                <h3 className="text-xl font-semibold leading-6">
                  {t('Details.Application.Contact')}
                </h3>
              </div>

              <div className="mt-6 rounded-md border border-dashed py-2">
                <div className="mt-2">
                  <div className="space-y-3 text-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <BsFileEarmarkPdf className="mx-auto h-8 w-8 text-stone-400 dark:text-stone-500" />
                    </motion.div>
                    <AnimatePresence mode="wait">
                      {fileName && (
                        <motion.div
                          className="flex flex-col items-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {fileName}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="text-sm text-stone-600 dark:text-stone-400">
                      <input
                        type="file"
                        className="sr-only"
                        multiple={false}
                        accept="application/pdf"
                        ref={fileInputRef}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (!file) return
                          if (file.size > 50 * 1024 * 1024) {
                            toast.error(
                              t('Details.Application.Resume.FileLimit')
                            )
                            return
                          }

                          setFileName(file.name)

                          setValue('resume', file)
                        }}
                      />
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => {
                          fileInputRef.current?.click()
                          if (fileInputRef.current) {
                            fileInputRef.current.value = ''
                          }
                        }}
                      >
                        {fileName
                          ? t('Details.Application.Resume.Change')
                          : t('Details.Application.Resume.Add')}
                      </Button>
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
                          {String(errors.resume?.message || '')}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-y-6">
                <div>
                  <label
                    htmlFor="full-name"
                    className={
                      (label(),
                      'after:font-semibold after:text-red-500 after:content-["*"] after:dark:text-red-400')
                    }
                  >
                    {t('Details.Application.FullName.Label')}
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="full-name"
                      autoComplete="full-name"
                      placeholder={t(
                        'Details.Application.FullName.Placeholder'
                      )}
                      className={textInput()}
                      {...register('name')}
                    />
                    <AnimatePresence mode="wait">
                      {errors.name && (
                        <motion.span
                          className={formError()}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                        >
                          {errors.name?.message}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className={
                      (label(),
                      'after:font-semibold after:text-red-500 after:content-["*"] after:dark:text-red-400')
                    }
                  >
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

                <div>
                  <label
                    htmlFor="tel"
                    className={
                      (label(),
                      'after:font-semibold after:text-red-500 after:content-["*"] after:dark:text-red-400')
                    }
                  >
                    {t('Details.Application.PhoneNumber.Label')}
                  </label>
                  <div className="mt-2">
                    <input
                      id="tel"
                      type="tel"
                      autoComplete="tel"
                      placeholder={t(
                        'Details.Application.PhoneNumber.Placeholder'
                      )}
                      className={textInput()}
                      {...register('phone')}
                    />
                    <AnimatePresence mode="wait">
                      {errors.phone && (
                        <motion.span
                          className={formError()}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                        >
                          {errors.phone?.message}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className={
                      (label(),
                      'after:font-semibold after:text-red-500 after:content-["*"] after:dark:text-red-400')
                    }
                  >
                    {t('Details.Application.Location.Label')}
                  </label>
                  <div className="mt-2">
                    <input
                      id="location"
                      type="text"
                      autoComplete="location"
                      placeholder={t(
                        'Details.Application.Location.Placeholder'
                      )}
                      className={textInput()}
                      {...register('location')}
                    />
                    <AnimatePresence mode="wait">
                      {errors.location && (
                        <motion.span
                          className={formError()}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                        >
                          {errors.location?.message}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div>
                  <label htmlFor="other-info" className={label()}>
                    {t('Details.Application.OtherInfo.Label')}
                  </label>
                  <div className="mb-[10px] mt-1 text-[13px] leading-4 text-stone-500">
                    {t('Details.Application.OtherInfo.Tips')}
                  </div>
                  <div>
                    <textarea
                      id="other-info"
                      autoComplete="other-info"
                      placeholder={t(
                        'Details.Application.OtherInfo.Placeholder'
                      )}
                      className={textInput()}
                      rows={4}
                      {...register('otherInfo')}
                    />
                    <AnimatePresence mode="wait">
                      {errors.otherInfo && (
                        <motion.span
                          className={formError()}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                        >
                          {errors.otherInfo?.message}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="border-b border-stone-200 pb-2 dark:border-stone-700/60">
                <h3 className="text-xl font-semibold leading-6">
                  {t('Details.Application.Links')}
                </h3>
              </div>

              <div className="mt-6 flex flex-col gap-y-6">
                <div>
                  <label htmlFor="github" className={label()}>
                    {t('Details.Application.GitHub.Label')}
                  </label>
                  <div className="mb-[10px] mt-1 text-[13px] leading-4 text-stone-500">
                    {t('Details.Application.GitHub.Tips')}
                  </div>
                  <div>
                    <input
                      id="github"
                      type="text"
                      autoComplete="github"
                      placeholder={t('Details.Application.GitHub.Placeholder')}
                      className={textInput()}
                      {...register('github')}
                    />
                    <AnimatePresence mode="wait">
                      {errors.github && (
                        <motion.span
                          className={formError()}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                        >
                          {errors.github?.message}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div>
                  <label htmlFor="website" className={label()}>
                    {t('Details.Application.Website.Label')}
                  </label>
                  <div className="mb-[10px] mt-1 text-[13px] leading-4 text-stone-500">
                    {t('Details.Application.Website.Tips')}
                  </div>
                  <div>
                    <input
                      id="website"
                      type="text"
                      autoComplete="website"
                      placeholder={t('Details.Application.Website.Placeholder')}
                      className={textInput()}
                      {...register('website')}
                    />
                    <AnimatePresence mode="wait">
                      {errors.website && (
                        <motion.span
                          className={formError()}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                        >
                          {errors.website?.message}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div>
                  <label htmlFor="twitter" className={label()}>
                    {t('Details.Application.Twitter.Label')}
                  </label>
                  <div className="mb-[10px] mt-1 text-[13px] leading-4 text-stone-500">
                    {t('Details.Application.Twitter.Tips')}
                  </div>
                  <div>
                    <input
                      id="twitter"
                      type="text"
                      autoComplete="twitter"
                      placeholder={t('Details.Application.Twitter.Placeholder')}
                      className={textInput()}
                      {...register('twitter')}
                    />
                    <AnimatePresence mode="wait">
                      {errors.twitter && (
                        <motion.span
                          className={formError()}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                        >
                          {errors.twitter?.message}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div>
                  <label htmlFor="linkedin" className={label()}>
                    {t('Details.Application.LinkedIn.Label')}
                  </label>
                  <div className="mb-[10px] mt-1 text-[13px] leading-4 text-stone-500">
                    {t('Details.Application.LinkedIn.Tips')}
                  </div>
                  <div>
                    <input
                      id="linkedin"
                      type="text"
                      autoComplete="linkedin"
                      placeholder={t(
                        'Details.Application.LinkedIn.Placeholder'
                      )}
                      className={textInput()}
                      {...register('linkedin')}
                    />
                    <AnimatePresence mode="wait">
                      {errors.linkedin && (
                        <motion.span
                          className={formError()}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                        >
                          {errors.linkedin?.message}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex">
              <Button type="submit" disabled={isSubmitting}>
                {t(isSubmitting ? 'ApplyCTA.Loading' : 'ApplyCTA.Idle')}
              </Button>
            </div>
          </>
        ) : (
          <div>
            <div>{t('Details.Application.Success.Title')}</div>
            <div> {t('Details.Application.Success.Description')}</div>
          </div>
        )}
      </form>
    </section>
  )
}
