import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import { makeUrl } from '~/lib/utils'

import { CareersLayout } from '~/components/layouts/CareersLayout'

const CareersPageInChina: NextPage = () => {
  return (
    <>
      <NextSeo
        openGraph={{
          images: [{ url: makeUrl('/assets/careers/og-image.jpg') }],
        }}
      />

      <CareersLayout title="成为我们的一员">{/*  */}</CareersLayout>
    </>
  )
}

export default CareersPageInChina
