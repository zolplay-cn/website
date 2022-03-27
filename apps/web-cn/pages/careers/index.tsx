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

      <CareersLayout
        title={['加入我们', '一起匠心打造每一款产品']}
        cta="查看开放职位"
      >
        {/*  */}
      </CareersLayout>
    </>
  )
}

export default CareersPageInChina
