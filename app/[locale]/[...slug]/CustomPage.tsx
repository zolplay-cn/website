'use client'

import React from 'react'

import { RichText } from '~/components/ui/RichText'
import type { Page } from '~/schemas/documents/page'

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
