import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

// eslint-disable-next-line node/prefer-global/process
const WebhookURL = process.env.CONTACT_WEBHOOK_URL ?? ''

export async function POST(req: NextRequest) {
  try {
    const { data }: { data: { message: string; name: string; email: string } } = await req.json()
    const mainText = `${data.name} ${data.email} sent a message`

    const blocks = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: mainText,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: data.message,
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
    // eslint-disable-next-line unused-imports/no-unused-vars
  } catch (_) {
    return NextResponse.error()
  }
}
