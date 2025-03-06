import type { NextRequest } from 'next/server'
import type { ContactFormSchema } from '~/app/[locale]/contact/Contact'
import { NextResponse } from 'next/server'

const WebhookURL = process.env.CONTACT_WEBHOOK_URL ?? ''

export async function POST(req: NextRequest) {
  try {
    const { data }: { data: ContactFormSchema } = await req.json()
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
  } catch (e) {
    return NextResponse.error()
  }
}
