import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'

import '~/styles/globals.css'

import { makeUrl } from '~/lib/utils'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        titleTemplate="%s｜佐玩"
        defaultTitle="佐玩"
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

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
