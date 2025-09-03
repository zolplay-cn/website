import type { Metadata, Viewport } from 'next'
import type { RootParams } from '~/types/app'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import localFont from 'next/font/local'
import { Suspense } from 'react'
import { Background } from '~/components/background'
import { Footer } from '~/components/footer'
import { LenisProvider } from '~/components/lenis-provider'
import { Rulers } from '~/components/rulers'
import { NavBar, Sidebar } from '~/components/sidebar'
import { Toasts } from '~/components/toasts'
import { PostHogPageview, PHProvider as PostHogProvider } from '~/lib/posthog/posthog-provider'
import { redirect } from '~/modules/i18n/navigation'
import { routing } from '~/modules/i18n/routing'
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
    { media: '(prefers-color-scheme: dark)', color: '#171717' },
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
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
  if (!hasLocale(routing.locales, locale)) {
    redirect({ href: '/', locale: routing.defaultLocale })
  }

  // Enable static rendering
  setRequestLocale(locale)

  return (
    <html lang={locale} suppressHydrationWarning className={`font-sans ${sansFont.variable}`}>
      <Suspense>
        <PostHogPageview />
      </Suspense>

      <PostHogProvider>
        <body className='bg-neutral-50 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300'>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            <NextIntlClientProvider>
              <Background />
              <LenisProvider>
                <ScrollArea.Root className='overflow-x-hidden'>
                  <ScrollArea.Viewport id='scroll-root' className='overflow-x-hidden w-dvw h-dvh'>
                    <main
                      id='scroll-content'
                      className='flex relative flex-col mx-2 max-w-4xl md:mx-4 md:mt-0 md:flex-row lg:mx-auto'
                      style={{
                        '--gutter-width': '1.85rem',
                      }}
                    >
                      <Rulers />
                      <Sidebar />
                      <NavBar />
                      <section className='frosted-noise relative z-20 ml-0 md:ml-[calc(var(--spacing)*44+var(--gutter-width))] mt-0 flex w-full flex-auto flex-col border border-(--grid-border-color) bg-white px-1.5 pb-36 dark:border-neutral-800 dark:bg-[#1a1a1a] md:p-7 md:pb-36 pt-8 md:pt-16 lg:p-9 lg:pt-20 lg:pb-44 min-h-screen'>
                        <div className='absolute left-1.5 md:left-7 lg:left-9 top-[-100%] w-px h-[200%] bg-(--grid-border-color)' />
                        <div className='absolute right-1.5 md:right-7 lg:right-9 top-[-100%] w-px h-[200%] bg-(--grid-border-color)' />

                        <article className='prose prose-neutral dark:prose-invert prose-headings:tracking-[-0.035em] prose-headings:font-medium prose-h1:text-2xl prose-p:leading-[1.75em] prose-p:tracking-tight prose-p:px-1 md:prose-p:px-2 prose-li:tracking-tight lg:prose-h1:text-3xl prose-strong:font-medium prose-strong:text-black prose-strong:dark:text-white max-w-full prose-headings:relative prose-headings:before:absolute prose-headings:before:-top-px prose-headings:px-1 md:prose-headings:px-1.5 prose-headings:before:h-px prose-headings:before:w-[200vw] prose-headings:before:left-[-100vw] prose-headings:before:bg-(--grid-border-color) prose-headings:after:absolute prose-headings:after:-bottom-px prose-headings:after:h-px prose-headings:after:w-[200vw] prose-headings:after:left-[-100vw] prose-headings:after:bg-(--grid-border-color)'>
                          {children}
                        </article>
                        <Footer />
                      </section>
                    </main>
                  </ScrollArea.Viewport>
                  <ScrollArea.Scrollbar
                    orientation='vertical'
                    className='hidden md:flex touch-none select-none bg-neutral-200/20 dark:bg-neutral-800/20 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-neutral-200/30 dark:hover:bg-neutral-800/30 data-[orientation=vertical]:w-2.5'
                  >
                    <ScrollArea.Thumb className='relative flex-1 z-[999] rounded-[10px] bg-neutral-400 dark:bg-neutral-600 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2' />
                  </ScrollArea.Scrollbar>
                </ScrollArea.Root>
              </LenisProvider>
            </NextIntlClientProvider>

            <Toasts />
          </ThemeProvider>
        </body>
      </PostHogProvider>
    </html>
  )
}
