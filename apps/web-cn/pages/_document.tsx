import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => (
  <Html lang="zh-Hans">
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono&family=Noto+Sans+SC:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <body className="grid bg-dark font-sans antialiased">
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
