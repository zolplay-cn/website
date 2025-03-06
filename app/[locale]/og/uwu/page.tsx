import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getMessages } from '~/i18n.server'

export async function generateMetadata({ params }: { params: RootParams }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: {
      default: t('Root.Metadata.Title'),
      template: t('Root.Metadata.TitleTemplate'),
    },
    themeColor: [
      { media: '(prefers-color-scheme: dark)', color: '#1c1917' },
      { media: '(prefers-color-scheme: light)', color: '#fafaf9' },
    ],
    description: t('Root.Metadata.Description'),
    keywords: t('Root.Metadata.Keywords'),
    icons: {
      icon: '/assets/favicon-32x32.png',
      shortcut: '/assets/favicon.ico',
      apple: '/assets/apple-touch-icon.png',
    },
    manifest: '/assets/site.webmanifest',
    openGraph: {
      title: {
        default: t('Root.Metadata.Title'),
        template: t('Root.Metadata.TitleTemplate'),
      },
      description: t('Root.Metadata.Description'),
      siteName: t('Root.Metadata.Title'),
      locale,
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
