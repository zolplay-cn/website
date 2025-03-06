'use client'

import type { page } from '~/schemas/documents/page'
import React from 'react'
import { RichText } from '~/components/ui/RichText'

export function CustomPage({ page }: { page: Page }) {
  return (
    <>
      <h1>{page.title}</h1>

      <section>
        <RichText value={page.content} />
      </section>
    </>
  )
}
