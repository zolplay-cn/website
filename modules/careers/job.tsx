'use client'

import type { Path } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsxm } from '@zolplay/utils'
import { cva } from 'class-variance-authority'
import { useTranslations } from 'next-intl'
import { useAction } from 'next-safe-action/hooks'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { TbArrowBadgeDown, TbArrowBadgeLeft } from 'react-icons/tb'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button, ButtonLink } from '~/components/ui/button'
import { Hr } from '~/components/ui/hr'
import { submitCareerApplication } from '~/modules/careers/actions'
import { Link } from '../i18n/navigation'
import { Email } from './form-item/email'
import { Input } from './form-item/input'
import { LongText } from './form-item/long-text'
import { Resume } from './form-item/resume'

type EmploymentType = 'FullTime' | 'PartTime' | 'Intern' | 'Contract' | 'Temporary'

interface JobField {
  isRequired: boolean
  field: {
    humanReadablePath: string
    id: string
    isNullable: boolean
    path: string
    title: string
    type: string
  }
  descriptionHtml?: string
  descriptionPlain?: string
}

interface JobSection {
  title: string
  fields: JobField[]
  descriptionHtml?: string
  descriptionPlain?: string
}

interface JobProps {
  title: string
  employmentType: EmploymentType
  isRemote: boolean
  isListed: boolean
  descriptionHtml: string
  applicationFormDefinition: {
    sections: JobSection[]
  }
}

export const formError = cva(['text-red-600', 'dark:text-red-400', 'text-xs', 'font-semibold'])
export const label = cva(['block font-medium leading-6'])
export const textInput = cva([
  'block w-full rounded-md border-0 bg-transparent py-1.5 shadow-sm ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-inset focus:ring-stone-400 dark:ring-stone-700 dark:placeholder:text-stone-600 dark:focus:ring-stone-500 text-sm sm:leading-6 ',
])

function JobApplicationForm({ sections }: { sections: JobSection[] }) {
  const t = useTranslations('Careers')
  const pathname = usePathname()

  const fields = sections.flatMap((item) => item.fields)

  const validators = fields.reduce((acc, field) => {
    switch (field.field.type) {
      case 'String':
      case 'Location':
      case 'LongText':
      case 'Phone':
        acc[field.field.path] = field.isRequired ? z.string().nonempty() : z.string().optional()
        break
      case 'Email':
        acc[field.field.path] = field.isRequired ? z.string().nonempty().email() : z.string().email()
        break
      case 'File':
        acc[field.field.path] = z.any().refine((file: File) => !!file?.size)
        break
      default:
        return acc
    }

    return acc
  }, {})

  const applicationSchema = z.object(validators)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
  })

  const [hasApplied, setHasApplied] = React.useState(false)

  const { execute, isExecuting } = useAction(submitCareerApplication, {
    onSuccess: () => {
      toast.success(t('ApplyCTA.Success'), { duration: 5000 })
      reset()
      setHasApplied(true)
    },
    onError: (error) => {
      let errorMessage = t('ApplyCTA.Error')
      if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = String(error.message)
      }

      toast.error(errorMessage)
    },
  })

  const onSubmit = React.useCallback(
    async (data: z.infer<typeof applicationSchema>) => {
      try {
        const jobPostingId = pathname?.split('/').slice(-1)?.[0]
        if (!jobPostingId) return

        const formData = new FormData()
        formData.append('jobPostingId', jobPostingId)
        Object.entries(data).forEach(([key, value]) => {
          if (key === '_systemfield_resume') {
            formData.append(key, 'Resume/CV')
            formData.append('Resume/CV', value as File)
          } else if (key === '_systemfield_location') {
            formData.append(key, JSON.stringify({ city: value }))
          } else {
            formData.append(key, value as string)
          }
        })

        execute({ formData })
      } catch {
        toast.error(t('ApplyCTA.Error'))
      }
    },
    [pathname, execute, t],
  )

  return (
    <section id='apply' className='pt-8'>
      <form className={clsxm(isExecuting && 'pointer-events-none opacity-50')} onSubmit={handleSubmit(onSubmit)}>
        <h2 className='pb-2'>Apply now</h2>

        {!hasApplied ? (
          <>
            {sections.map((item, index) => (
              <div key={index}>
                <div className='pb-2 border-b border-stone-200 dark:border-stone-700/60'>
                  <h3 className='text-xl font-semibold leading-6'>{item.title}</h3>
                  {!!item.descriptionPlain && <div>{item.descriptionPlain}</div>}
                </div>

                {item.fields
                  .filter((field) => field.field.type === 'File')
                  .map((field) => (
                    <Resume<z.infer<typeof applicationSchema>>
                      key={field.field.id}
                      path={field.field.path as Path<z.infer<typeof applicationSchema>>}
                      errors={errors}
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (!file) return

                        setValue(field.field.path as Path<z.infer<typeof applicationSchema>>, file as unknown as never)
                      }}
                    />
                  ))}

                <div className='flex flex-col gap-y-6 mt-6'>
                  {item.fields.map((field) => {
                    switch (field.field.type) {
                      case 'String':
                      case 'Location': {
                        return (
                          <Input<z.infer<typeof applicationSchema>>
                            key={field.field.id}
                            isRequired={field.isRequired}
                            path={field.field.path as Path<z.infer<typeof applicationSchema>>}
                            title={field.field.title}
                            subtitle={field.descriptionPlain}
                            type='text'
                            register={register}
                            errors={errors}
                          />
                        )
                      }
                      case 'Phone': {
                        return (
                          <Input<z.infer<typeof applicationSchema>>
                            key={field.field.id}
                            isRequired={field.isRequired}
                            path={field.field.path as Path<z.infer<typeof applicationSchema>>}
                            title={field.field.title}
                            placeholder='1-415-555-1234...'
                            type='tel'
                            register={register}
                            errors={errors}
                          />
                        )
                      }
                      case 'Email': {
                        return (
                          <Email<z.infer<typeof applicationSchema>>
                            key={field.field.id}
                            isRequired={field.isRequired}
                            path={field.field.path as Path<z.infer<typeof applicationSchema>>}
                            title={field.field.title}
                            register={register}
                            errors={errors}
                          />
                        )
                      }
                      case 'LongText': {
                        return (
                          <LongText<z.infer<typeof applicationSchema>>
                            key={field.field.id}
                            path={field.field.path as Path<z.infer<typeof applicationSchema>>}
                            title={field.field.title}
                            subtitle={field.descriptionPlain}
                            register={register}
                            errors={errors}
                          />
                        )
                      }
                      default:
                        return null
                    }
                  })}
                </div>
              </div>
            ))}

            <div className='flex mt-8'>
              <Button type='submit' disabled={isExecuting}>
                {isExecuting ? 'Applying...' : 'Apply'}
              </Button>
            </div>
          </>
        ) : (
          <div>
            <div>Success</div>
            <div>
              Thank you: your application was successfully submitted. We appreciate your patience as your application is
              under review.
            </div>
          </div>
        )}
      </form>
    </section>
  )
}

export function Job({ job }: { job: JobProps }) {
  const t = useTranslations('Careers')

  const EmploymentType = {
    FullTime: 'Full-time',
    PartTime: 'Part-time',
    Contract: 'Contract',
    Intern: 'Internship',
    Temporary: 'Temporary',
  }

  return (
    <>
      <Link
        href='/careers'
        className='inline-flex items-center mb-2 text-sm no-underline transition-transform text-stone-500 hover:-translate-x-px hover:underline focus:outline-none focus-visible:ring focus-visible:ring-stone-500 focus-visible:ring-opacity-50 dark:text-stone-400'
      >
        <TbArrowBadgeLeft className='flex mr-1 w-4 h-4' />
        {t('Back')}
      </Link>

      <h1 className='mb-0'>{job.title}</h1>
      <p className='my-2 space-x-1 w-full'>
        <span className='inline-flex items-center rounded bg-green-100 px-1 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-800 dark:text-green-100'>
          {EmploymentType[job.employmentType]}
        </span>
        <span className='inline-flex items-center rounded bg-indigo-100 px-1 py-0.5 text-xs font-semibold text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100'>
          {job.isRemote ? 'Remote' : 'On-site'}
        </span>
      </p>

      {job.isListed && (
        <ButtonLink href='#apply'>
          Apply&nbsp;
          <TbArrowBadgeDown />
        </ButtonLink>
      )}

      <div
        className='prose mt-5 dark:prose-invert prose-p:my-0 prose-p:leading-[1.8] prose-ol:my-0 prose-ul:my-0 [&>p]:my-4'
        dangerouslySetInnerHTML={{ __html: job.descriptionHtml }}
      />

      <Hr />

      {job.isListed && <JobApplicationForm sections={job.applicationFormDefinition.sections} />}
    </>
  )
}
