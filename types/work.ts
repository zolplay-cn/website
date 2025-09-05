import type { StaticImageData } from 'next/image'
import type { Locale } from '~/modules/i18n/routing'

export type WorkCategoryKey = string // Format: cap:<capId> for top-level, cap:<capId>:<index> for subcategory

export interface WorkShowreel {
  src: string
  type?: string
  poster?: string
}

export interface WorkEntry {
  slug: string
  year: number
  month?: number
  title: Record<Locale, string>
  categories: WorkCategoryKey[]
  featuredImage: string | StaticImageData
  showreel?: WorkShowreel
  hasCaseStudy: boolean
  website?: string
}
