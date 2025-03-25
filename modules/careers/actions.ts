'use server'

import { Buffer } from 'node:buffer'
import path from 'node:path'
import FormData from 'form-data'
import { z } from 'zod'
import { actionClient } from '~/lib/safe-action'

// ashbyhq API References: https://developers.ashbyhq.com/reference/applicationformsubmit
const AshbySubmitURL = 'https://api.ashbyhq.com/applicationForm.submit'

const careerApplicationSchema = z.object({
  formData: z.any(),
})

export type ActionResponse = { status: 'success' } | { status: 'error'; message?: string }

interface FormDataLike {
  entries: () => Iterable<[string, unknown]>
}

function extractFormData(formData: FormDataLike) {
  const fieldValues: Record<string, string> = {}

  if (formData && typeof formData.entries === 'function') {
    for (const [key, value] of Array.from(formData.entries() as Iterable<[string, unknown]>)) {
      fieldValues[key] = String(value)
    }
  }

  return { fieldValues }
}

export const submitCareerApplication = actionClient
  .schema(careerApplicationSchema)
  .action(async ({ parsedInput }): Promise<ActionResponse> => {
    try {
      const formData = parsedInput.formData
      const { fieldValues } = extractFormData(formData)

      const jobPostingId = fieldValues.jobPostingId
      if (!jobPostingId) {
        throw new Error('Internal error')
      }

      const resumeUrl = fieldValues._systemfield_resume
      if (!resumeUrl) {
        throw new Error('Internal error: Missing resume URL')
      }

      const resumeResponse = await fetch(resumeUrl, {
        signal: AbortSignal.timeout(30000),
        headers: {
          Accept: 'application/pdf',
        },
      })

      if (!resumeResponse.ok) {
        throw new Error(`Failed to fetch resume: ${resumeResponse.status} ${resumeResponse.statusText}`)
      }

      const resumeArrayBuffer = await resumeResponse.arrayBuffer()
      const resumeBuffer = Buffer.from(resumeArrayBuffer)

      const resumeFileName = 'resume.pdf'

      const fieldSubmissions: { path: string; value: any }[] = []

      for (const [key, value] of Object.entries(fieldValues)) {
        if (key === 'jobPostingId' || !value) continue

        if (key === '_systemfield_location') {
          try {
            const locationValue =
              typeof value === 'string' && value.startsWith('{') ? JSON.parse(value) : { city: value }

            fieldSubmissions.push({
              path: key,
              value: locationValue,
            })
          } catch {
            fieldSubmissions.push({
              path: key,
              value: { city: value },
            })
          }
        } else if (key === '_systemfield_resume') {
          fieldSubmissions.push({
            path: key,
            value: resumeFileName,
          })
        } else {
          fieldSubmissions.push({
            path: key,
            value,
          })
        }
      }

      const nodeFormData = new FormData()

      nodeFormData.append('applicationForm', JSON.stringify({ fieldSubmissions }))
      nodeFormData.append('jobPostingId', jobPostingId)
      nodeFormData.append(resumeFileName, resumeBuffer, {
        filename: resumeFileName,
        contentType: 'application/pdf',
      })
      const formDataBuffer = nodeFormData.getBuffer()
      const boundary = nodeFormData.getBoundary()

      const response = await fetch(AshbySubmitURL, {
        method: 'POST',
        headers: {
          // eslint-disable-next-line node/prefer-global/process
          Authorization: `Basic ${Buffer.from(`${process.env.ASHBY_API_KEY!}:`).toString('base64')}`,
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
        },
        body: formDataBuffer,
      })

      const responseText = await response.text()

      if (!response.ok) {
        throw new Error('Ashby API HTTP error')
      }

      try {
        const ashbyResponse = JSON.parse(responseText)

        if (ashbyResponse.success) {
          return { status: 'success' }
        } else {
          throw new Error(`Ashby API error: ${JSON.stringify(ashbyResponse?.errors || 'Unknown error')}`)
        }
      } catch (parseError) {
        throw new Error(
          `Failed to parse Ashby API response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`,
        )
      }
    } catch (error) {
      throw new Error(
        `Error submitting career application: ${error instanceof Error ? error.message : 'Unknown error'}`,
      )
    }
  })
