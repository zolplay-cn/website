import { getMessages } from '~/i18n.server'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: RootParams
}): Promise<Metadata> {
  const messages = await getMessages(params)

  return {
    title: {
      default: messages.Root.Metadata.Title,
      template: messages.Root.Metadata.TitleTemplate,
    },
    themeColor: [
      { media: '(prefers-color-scheme: dark)', color: '#1c1917' },
      { media: '(prefers-color-scheme: light)', color: '#fafaf9' },
    ],
    description: messages.Root.Metadata.Description,
    keywords: messages.Root.Metadata.Keywords,
    icons: {
      icon: '/assets/favicon-32x32.png',
      shortcut: '/assets/favicon.ico',
      apple: '/assets/apple-touch-icon.png',
    },
    manifest: '/assets/site.webmanifest',
    openGraph: {
      title: {
        default: messages.Root.Metadata.Title,
        template: messages.Root.Metadata.TitleTemplate,
      },
      description: messages.Root.Metadata.Description,
      siteName: messages.Root.Metadata.Title,
      locale: params.locale,
      type: 'website',
      images: ['https://assets.moimoi.app/zolplay-logo-uwu.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    twitter: {
      site: '@zolplay',
      creator: '@thecalicastle',
      card: 'summary_large_image',
    },
  }
}

export default function UWUPage() {
  // redirect('/')
  return <div>uwu</div>
}
