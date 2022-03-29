import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import { useEffect } from 'react'
import { roundArrow } from 'tippy.js'

import '~/styles/globals.css'
import '~/styles/tippy.css'

import { useLayout } from '~/lib/routes'
import { makeUrl } from '~/lib/utils'

import Footer from '~/components/Footer'
import LiveCursors from '~/components/live/LiveCursors'
import NavBar from '~/components/NavBar'

import { tippy } from '@tippyjs/react'

if (typeof window !== 'undefined') {
  tippy.setDefaultProps({
    animation: 'perspective-subtle',
    theme: 'zolplay',
    inertia: true,
    interactive: true,
    arrow: roundArrow,
    hideOnClick: false,
    maxWidth: 'none',
    appendTo: document.body,
  })
}

function MyApp({ Component, pageProps }: AppProps) {
  const { route } = useRouter()
  const Layout = useLayout(route)

  useEffect(() => {
    console.log(
      '███████╗ ██████╗ ██╗     ██████╗ ██╗      █████╗ ██╗   ██╗     ██████╗ ██████╗\n' +
        '╚══███╔╝██╔═══██╗██║     ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝    ██╔════╝██╔═══██╗\n' +
        '  ███╔╝ ██║   ██║██║     ██████╔╝██║     ███████║ ╚████╔╝     ██║     ██║   ██║\n' +
        ' ███╔╝  ██║   ██║██║     ██╔═══╝ ██║     ██╔══██║  ╚██╔╝      ██║     ██║   ██║\n' +
        '███████╗╚██████╔╝███████╗██║     ███████╗██║  ██║   ██║       ╚██████╗╚██████╔╝██╗\n' +
        '╚══════╝ ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝        ╚═════╝ ╚═════╝ ╚═╝\n' +
        '\n' +
        `We are hiring：${makeUrl('/careers')}\n` +
        `GitHub：${process.env.NEXT_PUBLIC_GITHUB_URL}\n` +
        '\n' +
        'Join us，we are passionate about crafting products.'
    )
  }, [])

  return (
    <>
      <DefaultSeo
        titleTemplate="%s - Zolplay Co."
        defaultTitle="Zolplay Co."
        description="Zolplay is a team of craftsmen, designers, and engineers who are passionate about crafting products that are both stunning and functional."
        openGraph={{
          type: 'website',
          locale: 'zh_CN',
          url: makeUrl('/'),
          site_name: 'Zolplay Co.',
          description:
            'Zolplay is a team of craftsmen, designers, and engineers who are passionate about crafting products that are both stunning and functional.',
          images: [
            {
              url: makeUrl('/og-image.jpg'),
            },
          ],
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            type: 'image/x-icon',
            href: makeUrl('/favicon.png'),
          },
          {
            rel: 'apple-touch-icon',
            href: makeUrl('/favicon.png'),
            sizes: '76x76',
          },
        ]}
      />

      <NavBar />

      <Layout>
        <Component {...pageProps} />
      </Layout>

      <Footer />

      <LiveCursors />
    </>
  )
}

export default MyApp
