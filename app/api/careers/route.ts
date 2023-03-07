import { NextRequest, NextResponse } from 'next/server'

import type { JobApplicationFields } from '~/app/[locale]/careers/Careers'

const WebhookURL = process.env.CAREERS_WEBHOOK_URL ?? ''

export async function POST(req: NextRequest) {
  try {
    const { data, pageLink }: { data: JobApplicationFields; pageLink: string } =
      await req.json()
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

    const res = await fetch(WebhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: mainText, blocks }),
    })

    if (res.ok) {
      return NextResponse.json({ status: 'success' })
    }

    return NextResponse.error()
  } catch (e) {
    return NextResponse.error()
  }
}
