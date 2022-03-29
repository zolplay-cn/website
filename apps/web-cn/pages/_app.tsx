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
        `岗位招聘中：${makeUrl('/careers')}\n` +
        `GitHub：${process.env.NEXT_PUBLIC_GITHUB_URL}\n` +
        '\n' +
        '加入我们，一起匠心打造每一款产品'
    )
  }, [])

  return (
    <>
      <DefaultSeo
        titleTemplate="%s｜佐玩"
        defaultTitle="佐玩"
        description="佐玩是一个推崇工程师文化、誓走在技术前沿的一个勇于大胆创新的创造者团队。"
        openGraph={{
          type: 'website',
          locale: 'zh_CN',
          url: makeUrl('/'),
          site_name: '佐玩',
          description:
            '佐玩是一个推崇工程师文化、誓走在技术前沿的一个勇于大胆创新的创造者团队。',
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
