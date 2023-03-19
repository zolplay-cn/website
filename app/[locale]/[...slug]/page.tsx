import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getOpenGraphImage } from '~/lib/helper'
import { urlForImage } from '~/lib/sanity.image'
import { getPage } from '~/lib/sanity.queries'

import { CustomPage } from './CustomPage'

type PageProps = { params: RootParams & { slug: string[] } }

function getSlug(params: PageProps['params']) {
  return params.slug.join('/')
}

async function fetchPage(params: PageProps['params']) {
  const page = await getPage({ slug: getSlug(params), locale: params.locale })
  if (!page) {
    notFound()
  }

  return page
}

export async function generateMetadata({ params }: PageProps) {
  const page = await fetchPage(params)

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      images: page.ogImage
        ? [
            {
              url: urlForImage(page.ogImage)
                .size(1200, 630)
                .fit('fillmax')
                .auto('format')
                .url(),
              width: 1200,
              height: 630,
            },
          ]
        : [getOpenGraphImage(page.title, params.locale)],
    },
  } as Metadata
}

export default async function Page({ params }: PageProps) {
  const page = await fetchPage(params)

  return (
    <>
      <CustomPage page={page} />
    </>
  )
}
