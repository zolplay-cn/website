import type { NextApiRequest, NextApiResponse } from 'next'
import { Buffer } from 'node:buffer'
import fs from 'node:fs'
import formidable from 'formidable'
import request from 'request'

export const config = {
  api: {
    bodyParser: false,
  },
}

const AshbySubmitURL = 'https://api.ashbyhq.com/applicationForm.submit'

function requestAshby(formData: any) {
  return new Promise((resolve) => {
    try {
      request(
        {
          method: 'POST',
          url: AshbySubmitURL,
          headers: {
            'Content-Type': 'multipart/form-data',
            // eslint-disable-next-line node/prefer-global/process
            authorization: `Basic ${Buffer.from(`${process.env.ASHBY_API_KEY!}:`).toString('base64')}`,
          },
          formData,
        },
        (err, res) => {
          if (err) {
            console.error(err, 'requestAshby error')
            resolve(null)
          } else {
            resolve(JSON.parse(res.body))
          }
        },
      )
    } catch (error) {
      console.error(error, 'requestAshby error')
      resolve(null)
    }
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const form = formidable({ multiples: true })
    const [fields, files] = await form.parse(req)

    if (!fields || !files) return res.status(500).json({ status: 'error' })

    const fieldSubmissions: { path: string; value: any }[] = []

    Object.keys(fields).forEach((key) => {
      if (key !== 'jobPostingId') {
        if (!fields[key]) return

        fieldSubmissions.push({
          path: key,
          value:
            key === '_systemfield_location'
              ? fields[key]?.[0]
                ? JSON.parse(fields[key]?.[0] as string)
                : null
              : fields[key]?.[0],
        })
      }
    })

    const resumeKey = Object.keys(files)[0]
    const file = files[resumeKey]?.[0]
    const jobPostingId = fields.jobPostingId?.[0]

    if (!file || !jobPostingId) return res.status(500).json({ status: 'error' })

    const formData = {
      applicationForm: JSON.stringify({ fieldSubmissions }),
      jobPostingId: fields.jobPostingId?.[0],
      [resumeKey]: {
        value: fs.createReadStream(file.filepath),
        options: { filename: file.originalFilename, contentType: null },
      },
    }

    const ashbyResponse = await requestAshby(formData)

    if (!ashbyResponse) return res.status(500).json({ status: 'error' })

    if ((ashbyResponse as any).success) {
      return res.json({ status: 'success' })
    } else {
      return res.status(500).json({
        status: 'error',
        message: (ashbyResponse as any)?.errors,
      })
    }
  } catch (error) {
    console.error(error, 'error')
    return res.status(500).json({ status: 'error' })
  }
}
