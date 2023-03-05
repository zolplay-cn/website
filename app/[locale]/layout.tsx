import 'tailwindcss/tailwind.css'
import '~/app/globals.css'

import type { Metadata } from 'next'
import { Manrope, Noto_Sans_SC } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'

import { AnalyticsWrapper } from '~/app/Analytics'
import { Background } from '~/app/Background'
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
      <body className="bg-stone-50 text-stone-800 dark:bg-stone-900 dark:text-stone-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={params.locale} messages={messages}>
            <Background />
            <main className="relative mx-4 flex min-h-screen max-w-4xl flex-col pt-12 md:flex-row md:pt-20 lg:mx-auto lg:pt-28">
              <Rulers />
              <Sidebar />
              <section className="relative z-20 flex w-full flex-auto flex-col border border-transparent bg-[#fefefe] p-9 pb-24 shadow-xl dark:border-stone-800 dark:bg-[#1a1a1a]">
                <article className="prose dark:prose-invert">
                  {children}
                </article>
              </section>
            </main>
          </NextIntlClientProvider>
        </ThemeProvider>

        <AnalyticsWrapper />
      </body>
    </html>
  )
}
