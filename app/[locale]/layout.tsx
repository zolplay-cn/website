import type { Metadata, Viewport } from 'next'
import type { RootParams } from '~/types/app'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import dynamic from 'next/dynamic'
import { DM_Sans } from 'next/font/google'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { Background } from '~/app/Background'
import { Footer } from '~/app/Footer'

import { Rulers } from '~/app/Rulers'
import { Sidebar } from '~/components/Sidebar'
import { Toasts } from '~/components/toasts'
import { i18n } from '~/i18n'
import { getOpenGraphImage } from '~/lib/helper'
import { routing } from '~/modules/i18n/routing'
import { PostHogPageview, PHProvider as PostHogProvider } from '../PostHogProvider'
import 'tailwindcss/tailwind.css'
import '~/app/globals.css'

const fontSansEn = DM_Sans({
  weight: ['400', '500', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-sans-en',
  fallback: ['ui-sans-serif'],
})

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#1c1917' },
    { media: '(prefers-color-scheme: light)', color: '#fafaf9' },
  ],
}

export async function generateMetadata({ params }: { params: RootParams }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: {
      default: t('Root.Metadata.Title'),
      template: t('Root.Metadata.TitleTemplate'),
    },
    description: t('Root.Metadata.Description'),
    keywords: t('Root.Metadata.Keywords'),
    icons: {
      icon: '/assets/favicon-v2.ico',
      shortcut: '/assets/favicon-v2.ico',
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
      images: [getOpenGraphImage(t('Root.Metadata.Title'), locale)],
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

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: RootParams }) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning className={`font-sans ${fontSansEn.variable}`}>
      <head>
        <script
          // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
          dangerouslySetInnerHTML={{
            __html: `${uwu.toString()};uwu()`,
          }}
        />
      </head>
      <Suspense>
        <PostHogPageview />
      </Suspense>

      <PostHogProvider>
        <body className='bg-stone-50 text-stone-800 dark:bg-stone-900 dark:text-stone-300'>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            <NextIntlClientProvider messages={messages}>
              <Background />
              <main className='relative mx-2 flex min-h-screen max-w-4xl flex-col pt-12 md:mx-4 md:mt-0 md:flex-row md:pt-20 lg:mx-auto lg:pt-28'>
                <Rulers />
                <Sidebar />
                <section className='frosted-noise relative z-20 mt-3 flex w-full flex-auto flex-col border border-transparent bg-[#fefefe] p-5 pb-36 shadow-xl dark:border-stone-800 dark:bg-[#1a1a1a] md:mt-0 md:p-7 md:pb-36 lg:p-9 lg:pb-44'>
                  <article className='prose dark:prose-invert prose-headings:tracking-tighter prose-h1:text-2xl prose-p:leading-loose prose-p:tracking-tight prose-li:tracking-tight prose-img:rounded-xl lg:prose-h1:text-4xl'>
                    {children}
                  </article>

                  <Footer />
                </section>
              </main>
            </NextIntlClientProvider>

            <Toasts />
          </ThemeProvider>
        </body>
      </PostHogProvider>
    </html>
  )
}

function uwu() {
  const query = new URLSearchParams(location.search)
  if (query?.has('uwu')) {
    if (query.get('uwu') === '0' || query.get('uwu') === 'false') {
      localStorage.removeItem('uwu')
    } else {
      localStorage.setItem('uwu', '1')
    }
  }
}
