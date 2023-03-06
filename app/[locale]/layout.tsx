import 'tailwindcss/tailwind.css'
import '~/app/globals.css'

import type { Metadata } from 'next'
import { Manrope, Noto_Sans_SC } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'

import { AnalyticsWrapper } from '~/app/Analytics'
import { Background } from '~/app/Background'
import { Footer } from '~/app/Footer'
import { Rulers } from '~/app/Rulers'
import { Sidebar } from '~/app/Sidebar'
import { ThemeProvider } from '~/app/ThemeProvider'
import { i18n } from '~/i18n'
import { getMessages } from '~/i18n.server'

const fontSansEn = Manrope({
  weight: ['400', '500', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-sans-en',
  fallback: ['ui-sans-serif'],
})
const fontSansZhCN = Noto_Sans_SC({
  weight: ['400', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-sans-cn',
  fallback: ['ui-sans-serif'],
})

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}

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
      // TODO: Add og image
      // images: [
      //   {
      //     url: '/og.jpg',
      //     width: 1920,
      //     height: 1080,
      //   },
      // ],
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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: RootParams
}) {
  let messages
  try {
    messages = await getMessages(params)
  } catch (error) {
    notFound()
  }

  return (
    <html
      lang={params.locale}
      suppressHydrationWarning
      className={`font-sans ${fontSansEn.variable} ${fontSansZhCN.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={params.locale} messages={messages}>
            <Background />
            <main className="relative mx-2 flex min-h-screen max-w-4xl flex-col pt-12 md:mx-4 md:mt-0 md:flex-row md:pt-20 lg:mx-auto lg:pt-28">
              <Rulers />
              <Sidebar />
              <section className="frosted-noise relative z-20 mt-3 flex w-full flex-auto flex-col border border-transparent bg-[#fefefe] p-5 pb-36 shadow-xl dark:border-stone-800 dark:bg-[#1a1a1a] md:mt-0 md:p-7 lg:p-9 lg:pb-44">
                <article className="prose dark:prose-invert prose-headings:tracking-tighter prose-h1:text-2xl prose-p:leading-loose prose-img:rounded-xl prose-img:shadow-lg lg:prose-h1:text-4xl">
                  {children}
                </article>

                <Footer />
              </section>
            </main>
          </NextIntlClientProvider>
        </ThemeProvider>

        <AnalyticsWrapper />
      </body>
    </html>
  )
}
