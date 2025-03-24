import type { Metadata, Viewport } from 'next'
import type { RootParams } from '~/types/app'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import { Suspense, unstable_ViewTransition as ViewTransition } from 'react'
import { Background } from '~/components/background'
import { Footer } from '~/components/footer'
import { Rulers } from '~/components/rulers'
import { Sidebar } from '~/components/sidebar'
import { Toasts } from '~/components/toasts'
import { getOpenGraphImage } from '~/lib/helper'
import { routing } from '~/modules/i18n/routing'
import { PostHogPageview, PHProvider as PostHogProvider } from '../../lib/posthog/posthog-provider'
import '~/app/globals.css'

const sansFont = localFont({
  src: '../_fonts/InterVariable.woff2',
  preload: true,
  variable: '--font-sans',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
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
      creator: '@zolplay',
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
    <html lang={locale} suppressHydrationWarning className={`font-sans ${sansFont.variable}`}>
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
              <main className='flex relative flex-col pt-12 mx-2 max-w-4xl min-h-screen md:mx-4 md:mt-0 md:flex-row md:pt-20 lg:mx-auto lg:pt-28'>
                <Rulers />
                <Sidebar />

                <section className='flex relative z-20 flex-col flex-auto p-5 pb-36 mt-3 w-full bg-white border border-transparent shadow-xl frosted-noise dark:border-stone-800  dark:bg-[#1a1a1a] md:mt-0 md:p-7 md:pb-36 lg:p-9 lg:pb-44'>
                  <ViewTransition name='crossfade'>
                    <article className='prose dark:prose-invert prose-headings:tracking-[-0.035em] prose-headings:font-medium prose-h1:text-2xl prose-p:leading-[1.75em] prose-p:tracking-tight prose-li:tracking-tight prose-img:rounded-xl lg:prose-h1:text-3xl prose-strong:font-medium prose-strong:text-black prose-strong:dark:text-white'>
                      {children}
                    </article>
                    <Footer />
                  </ViewTransition>
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
