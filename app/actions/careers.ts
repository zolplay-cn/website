'use server'

import { Buffer } from 'node:buffer'
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

interface FormDataEntry {
  name: string
  size: number
  arrayBuffer: () => Promise<ArrayBuffer>
  type?: string
}

function extractFormData(formData: FormDataLike) {
  const fieldValues: Record<string, string> = {}
  const files: Record<string, FormDataEntry> = {}

  if (formData && typeof formData.entries === 'function') {
    for (const [key, value] of Array.from(formData.entries() as Iterable<[string, unknown]>)) {
      if (value && typeof value === 'object' && 'name' in value && 'size' in value) {
        files[key] = value as FormDataEntry
      } else {
        fieldValues[key] = String(value)
      }
    }
  }

  return { fieldValues, files }
}

export const submitCareerApplication = actionClient
  .schema(careerApplicationSchema)
  .action(async ({ parsedInput }): Promise<ActionResponse> => {
    try {
      const formData = parsedInput.formData
      const { fieldValues, files } = extractFormData(formData)

      const jobPostingId = fieldValues.jobPostingId
      if (!jobPostingId) {
        return { status: 'error' }
      }

      const fieldSubmissions: { path: string; value: any }[] = []

      Object.keys(fieldValues).forEach((key) => {
        if (key !== 'jobPostingId') {
          if (!fieldValues[key]) return

          fieldSubmissions.push({
            path: key,
            value:
              key === '_systemfield_location'
                ? fieldValues[key]
                  ? JSON.parse(fieldValues[key])
                  : null
                : fieldValues[key],
          })
        }
      })

      const resumeKey = Object.keys(files)[0]
      if (!resumeKey || !files[resumeKey]) {
        return { status: 'error' }
      }

      const fileObj = files[resumeKey]
      const arrayBuffer = await fileObj.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const nodeFormData = new FormData()
      nodeFormData.append('applicationForm', JSON.stringify({ fieldSubmissions }))
      nodeFormData.append('jobPostingId', jobPostingId)

      nodeFormData.append(resumeKey, buffer, {
        filename: fileObj.name,
        contentType: fileObj.type || 'application/octet-stream',
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
        console.error('Ashby API HTTP error:', response.status, response.statusText, responseText)
        return { status: 'error' }
      }

      try {
        const ashbyResponse = JSON.parse(responseText)

        if (ashbyResponse.success) {
          return { status: 'success' }
        } else {
          console.error('Ashby API error:', ashbyResponse)
          throw new Error(`Ashby API error: ${JSON.stringify(ashbyResponse?.errors || 'Unknown error')}`)
        }
      } catch (parseError) {
        console.error('Failed to parse Ashby API response:', parseError)
        throw new Error(
          `Failed to parse Ashby API response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`,
        )
      }
    } catch (error) {
      console.error('Error submitting career application:', error)
      throw new Error(
        `Error submitting career application: ${error instanceof Error ? error.message : 'Unknown error'}`,
      )
    }
  })
