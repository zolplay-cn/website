import { z } from 'zod'

export const applicationSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  phone: z.string().nonempty(),
  location: z.string().nonempty(),
  otherInfo: z.string().optional(),
  resume: z.any(),
  github: z.string().optional(),
  website: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
})
export type JobApplicationFields = z.infer<typeof applicationSchema>
