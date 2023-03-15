import { google } from 'googleapis'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

import {
  applicationSchema,
  type JobApplicationFields,
} from '~/schemas/documents/job'

const WebhookURL = process.env.CAREERS_WEBHOOK_URL ?? ''
const Spreadsheets = process.env.CAREERS_SPREADSHEETS ?? '{}'

async function insertDataIntoGSheets(data: JobApplicationFields, link: string) {
  try {
    const spreadsheets = JSON.parse(Spreadsheets.replaceAll('\\', ''))
    const careerId = link.split('/').pop()
    if (!careerId) {
      return
    }
    const spreadsheetId = spreadsheets[careerId]
    const target = ['https://www.googleapis.com/auth/spreadsheets']
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      undefined,
      (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      target
    )

    const sheets = google.sheets({ version: 'v4', auth: jwt })

    return sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'From Website',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            data.fullName,
            data.preferredName,
            data.email,
            data.resume,
            data.about,
          ],
        ],
      },
    })
  } catch (err) {
    console.log(err)
  }
}

const schema = z.object({
  data: applicationSchema,
  pageLink: z.string(),
})
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const { data, pageLink } = schema.parse(JSON.parse(req.body))
    const mainText = `${
      data.preferredName
        ? `${data.fullName} (${data.preferredName})`
        : data.fullName
    } ${data.email} sent an application for ${pageLink}`

    const blocks = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${
            data.preferredName
              ? `${data.fullName} (${data.preferredName})`
              : data.fullName
          }* ${data.email} sent an application for ${pageLink}`,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: data.about,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `<${data.resume}|Resume>`,
        },
      },
    ]

    await Promise.all([
      insertDataIntoGSheets(data, pageLink),
      fetch(WebhookURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: mainText, blocks }),
      }),
    ])

    return res.json({ status: 'success' })
  } catch (e) {
    console.error(e)
  }

  return res.status(500).json({ status: 'error' })
}
