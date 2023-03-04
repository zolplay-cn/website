import 'tailwindcss/tailwind.css'
import '~/app/globals.css'

import { Manrope, Noto_Sans_SC } from 'next/font/google'
import { notFound } from 'next/navigation'
import { useLocale } from 'next-intl'

import { Background } from '~/app/Background'
import { Rulers } from '~/app/Rulers'
import { Sidebar } from '~/app/Sidebar'
import { ThemeProvider } from '~/app/ThemeProvider'

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

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const locale = useLocale()

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound()
  }

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`font-sans ${fontSansEn.variable} ${fontSansZhCN.variable} bg-stone-50 text-stone-800 dark:bg-stone-900 dark:text-stone-300`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Background />
          <main className="relative mx-4 flex min-h-screen max-w-4xl flex-col pt-12 md:flex-row md:pt-20 lg:mx-auto lg:pt-28">
            <Rulers />
            <Sidebar />
            <section className="relative z-20 flex w-full flex-auto flex-col border border-transparent bg-[#fefefe] p-9 pb-24 shadow-xl dark:border-stone-800 dark:bg-[#1a1a1a]">
              <article className="prose dark:prose-invert">{children}</article>
            </section>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
