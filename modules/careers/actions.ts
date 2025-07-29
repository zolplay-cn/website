'use server'

import { z } from 'zod'
import { actionClient } from '~/lib/safe-action'

const careerApplicationSchema = z.object({
  formData: z.any(),
})

export type ActionResponse = { status: 'success' } | { status: 'error'; message?: string }

export const submitCareerApplication = actionClient
  .schema(careerApplicationSchema)
  .action(async (): Promise<ActionResponse> => {
    throw new Error('Not implemented')
  })
