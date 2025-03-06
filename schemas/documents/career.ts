import { useTranslations } from 'next-intl'
import { z } from 'zod'

export function useApplicationSchema() {
  const t = useTranslations('Careers.Zod')

  const APPLICATION_SCHEMA = z.object({
    name: z.string().nonempty({ message: t('Name.Required') }),
    email: z
      .string()
      .nonempty({ message: t('Email.Required') })
      .email({ message: t('Email.Invalid') }),
    phone: z.string().nonempty({ message: t('Phone.Required') }),
    location: z.string().nonempty({ message: t('Location.Required') }),
    otherInfo: z.string().optional(),
    resume: z.any().refine((file: File) => !!file?.size, t('Resume.Required')),
    github: z.string().optional(),
    website: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
  })

  return APPLICATION_SCHEMA
}

export type JobApplicationFields = z.infer<ReturnType<typeof useApplicationSchema>>
