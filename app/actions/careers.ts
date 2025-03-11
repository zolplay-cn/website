'use server'

import { Buffer } from 'node:buffer'

interface SubmitResponse {
  status: 'success' | 'error'
  message?: any
}

// ashbyhq API References: https://developers.ashbyhq.com/reference/applicationformsubmit

const AshbySubmitURL = 'https://api.ashbyhq.com/applicationForm.submit'

export async function submitCareerApplication(formData: FormData): Promise<SubmitResponse> {
  try {
    const fieldValues: Record<string, string> = {}
    const files: Record<string, File> = {}

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        files[key] = value
      } else {
        fieldValues[key] = value as string
      }
    }

    const jobPostingId = fieldValues.jobPostingId
    if (!jobPostingId) {
      return { status: 'error', message: 'Missing job posting ID' }
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

    const apiFormData = new FormData()

    apiFormData.append('applicationForm', JSON.stringify({ fieldSubmissions }))
    apiFormData.append('jobPostingId', jobPostingId)

    const resumeKey = Object.keys(files)[0]
    if (!resumeKey || !files[resumeKey]) {
      return { status: 'error', message: 'Missing resume file' }
    }

    apiFormData.append(resumeKey, files[resumeKey])

    const response = await fetch(AshbySubmitURL, {
      method: 'POST',
      headers: {
        // eslint-disable-next-line node/prefer-global/process
        Authorization: `Basic ${Buffer.from(`${process.env.ASHBY_API_KEY!}:`).toString('base64')}`,
      },
      body: apiFormData,
    })

    if (!response.ok) {
      return {
        status: 'error',
        message: `HTTP error: ${response.status} ${response.statusText}`,
      }
    }

    const ashbyResponse = await response.json()

    if (ashbyResponse.success) {
      return { status: 'success' }
    } else {
      return {
        status: 'error',
        message: ashbyResponse?.errors,
      }
    }
  } catch {
    return { status: 'error', message: 'Internal server error' }
  }
}
