'use client'

import type { Locale } from '~/modules/i18n/routing'
import type { WorkCategoryKey, WorkEntry } from '~/types/work'
import { clsxm } from '@zolplay/utils'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import * as React from 'react'
import { BackgroundVideo, WithFrame } from '~/components/mdx'
import { capabilitiesByLocale } from '~/components/mdx/capabilities.data'
import { Link } from '../i18n/navigation'
import works from './work.data'

type CategoryKind = 'all' | 'top'

interface CategoryOption {
  key: string
  label: string
  kind: CategoryKind
  parentKey?: string
}

// Build capability category options from Capabilities.tsx definitions
function buildCategoryOptions(locale: Locale): CategoryOption[] {
  const caps = capabilitiesByLocale[locale] ?? capabilitiesByLocale.en

  const options: CategoryOption[] = [{ key: 'all', label: locale === 'zh-CN' ? '全部' : 'All', kind: 'all' }]

  for (const cap of caps) {
    const topKey = `cap:${cap.id}`
    options.push({ key: topKey, label: cap.title, kind: 'top' })
  }

  return options
}

function groupByYear(list: WorkEntry[]): Map<number, WorkEntry[]> {
  const grouped = new Map<number, WorkEntry[]>()
  for (const item of list) {
    const year = item.year
    if (!grouped.has(year)) grouped.set(year, [])
    grouped.get(year)!.push(item)
  }
  // Ensure each year's items are ordered by month (desc), then slug for stability
  for (const [, arr] of grouped) arr.sort((a, b) => (b.month ?? 1) - (a.month ?? 1) || a.slug.localeCompare(b.slug))
  return grouped
}

function matchesCategory(entry: WorkEntry, key: WorkCategoryKey): boolean {
  if (key === 'all') return true
  // top-level: cap:<id>
  if (/^cap:\d{3}$/.test(key)) {
    const topId = key.split(':')[1]
    // direct top-level or any of its subcategories
    return entry.categories.some((c) => c === key || c.startsWith(`cap:${topId}:`))
  }
  // sub-level: cap:<id>:<index>
  return entry.categories.includes(key)
}

const WorkCard = React.memo(function WorkCard({
  work,
  locale,
  categoryFormatter,
}: {
  work: WorkEntry
  locale: Locale
  categoryFormatter: (keys: WorkCategoryKey[]) => string
}) {
  const hasVideo = Boolean(work.showreel?.src)
  const isExternal = !work.hasCaseStudy && Boolean(work.website)

  return (
    <div className='group not-prose relative overflow-hidden ring-1 ring-(--grid-border-color) bg-white dark:bg-[#1a1a1a] will-change-[opacity] transition-opacity duration-100 hover:opacity-75'>
      <div className='relative aspect-video overflow-hidden bg-neutral-200 dark:bg-neutral-800'>
        {work.isOriginal && (
          <div className='absolute top-2 left-2 z-20'>
            <span
              className={clsxm(
                'inline-flex items-center gap-1 rounded-full border border-(--grid-border-color) bg-white/90 dark:bg-neutral-900/80 backdrop-blur px-2 py-0.5 text-xs font-medium',
                'text-neutral-900 dark:text-neutral-100 shadow-sm',
              )}
            >
              {locale === 'zh-CN' ? '原创项目' : 'Original'}
            </span>
          </div>
        )}
        <WithFrame className='size-full'>
          <div
            className={clsxm(
              'absolute inset-0 size-full object-cover transition-transform',
              (work.hasCaseStudy || isExternal) && 'duration-100 group-hover:scale-[1.02]',
            )}
          >
            {/* Poster image */}
            <Image
              src={work.featuredImage}
              alt={work.title[locale]}
              className='absolute inset-0 object-cover'
              fill
              sizes='(max-width: 1024px) 100vw, 960px'
            />
            {hasVideo && <BackgroundVideo src={work.showreel!.src} poster={work.showreel!.poster} aspectRatio='16/9' />}
          </div>
        </WithFrame>

        {/* Subtle top/bottom rules for media */}
        <div aria-hidden className='absolute inset-x-0 top-0 h-px bg-(--grid-border-color)' />
        <div aria-hidden className='absolute inset-x-0 bottom-0 h-px bg-(--grid-border-color)' />
      </div>

      <div className='border-t border-(--grid-border-color) p-3 md:p-4'>
        <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-0 lg:gap-2'>
          <h4 className='text-xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 flex items-center gap-1 flex-1'>
            {work.title[locale]}
            {isExternal && (
              <svg className='size-4' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M9.99855 5.51601C12.5858 5.12863 15.2066 5.07776 17.7955 5.36385C18.0176 5.38839 18.2154 5.48747 18.3639 5.63594M18.4838 14.0013C18.8712 11.414 18.9221 8.79321 18.636 6.20434C18.6115 5.98226 18.5124 5.7844 18.3639 5.63594M18.3639 5.63594L5.63599 18.3639'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            )}
          </h4>

          <span className='mt-0 flex-1 text-left lg:text-right lg:mt-0 text-base text-neutral-400 dark:text-neutral-500 tracking-tight truncate'>
            {categoryFormatter(work.categories)}
          </span>
        </div>
      </div>

      {(isExternal || work.hasCaseStudy) && (
        <Link
          className='absolute inset-0'
          target={isExternal ? '_blank' : undefined}
          href={work.hasCaseStudy ? `/work/${work.slug}` : work.website!}
        />
      )}
    </div>
  )
})

export function WorkCatalog() {
  const locale = useLocale() as Locale
  const [selected, setSelected] = React.useState<WorkCategoryKey>('all')

  const categories = React.useMemo(() => buildCategoryOptions(locale), [locale])

  // Capability lookup maps for fast, stable label formatting
  const caps = React.useMemo(() => capabilitiesByLocale[locale] ?? capabilitiesByLocale.en, [locale])
  const capTitleMap = React.useMemo(() => {
    const m = new Map<string, string>()
    for (const c of caps) m.set(`cap:${c.id}`, c.title)
    return m
  }, [caps])
  const capItemMap = React.useMemo(() => {
    const m = new Map<string, string>()
    for (const c of caps) {
      for (let i = 0; i < c.items.length; i++) {
        const label = c.items[i]
        // Support zero-based and one-based indices
        m.set(`cap:${c.id}:${i}`, label)
        m.set(`cap:${c.id}:${i + 1}`, label)
      }
    }
    return m
  }, [caps])

  const formatCategoryLabel = React.useCallback(
    (keys: WorkCategoryKey[]) =>
      keys
        .map((key) => capTitleMap.get(key) ?? capItemMap.get(key))
        .filter((v): v is string => Boolean(v))
        .join(' + '),
    [capTitleMap, capItemMap],
  )

  const items = React.useMemo(
    () => (works as WorkEntry[]).slice().sort((a, b) => b.year - a.year || (b.month ?? 1) - (a.month ?? 1)),
    [],
  )

  // Precompute counts per category (including 'all')
  const categoryCounts = React.useMemo(() => {
    const map = new Map<string, number>()
    for (const cat of categories) {
      const key = cat.key as WorkCategoryKey
      const count = items.filter((w) => matchesCategory(w, key)).length
      map.set(cat.key, count)
    }
    return map
  }, [categories, items])
  const filtered = React.useMemo(
    () => (selected === 'all' ? items : items.filter((w) => matchesCategory(w, selected))),
    [items, selected],
  )
  const grouped = React.useMemo(() => groupByYear(filtered), [filtered])
  const years = React.useMemo(() => Array.from(grouped.keys()).sort((a, b) => b - a), [grouped])

  return (
    <section
      className={clsxm(
        'not-prose relative my-6',
        'before:absolute before:top-0 before:h-px before:w-[200vw] before:-left-[100vw] before:bg-(--grid-border-color)',
        'after:absolute after:bottom-0 after:h-px after:w-[200vw] after:-right-[100vw] after:bg-(--grid-border-color)',
      )}
    >
      {/* Page edge vertical lines */}
      <div aria-hidden className='absolute hidden md:block left-0 top-0 h-full w-px bg-(--grid-border-color) z-10' />
      <div aria-hidden className='absolute hidden md:block right-0 top-0 h-full w-px bg-(--grid-border-color) z-10' />

      {/* Filters */}
      <div className='relative z-20 border-x border-(--grid-border-color)'>
        <div className='grid grid-cols-12 items-center px-3 md:px-1.5 py-3'>
          <div className='col-span-12 md:col-span-10 md:col-start-3'>
            <div className='flex flex-wrap items-center gap-2 overflow-x-auto'>
              {categories.map((cat) => (
                <WithFrame hasTicker={false} key={cat.key}>
                  <button
                    type='button'
                    onClick={() => setSelected(cat.key)}
                    className={clsxm(
                      'px-3 py-1 text-sm font-medium transition-colors',
                      'border border-(--grid-border-color)',
                      selected === cat.key
                        ? 'bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900'
                        : 'bg-white text-neutral-700 hover:bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800',
                    )}
                  >
                    {cat.label}
                    <span className='ml-0.5 opacity-50'> {categoryCounts.get(cat.key) ?? 0}</span>
                  </button>
                </WithFrame>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Year sections: desktop/tablet */}
      <div className='relative z-10 bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-neutral-950)]/5 max-lg:hidden dark:[--pattern-fg:var(--color-white)]/5'>
        {years.map((year) => {
          const list = grouped.get(year)!
          return (
            <div
              key={year}
              className='relative grid grid-cols-12 border-y border-(--grid-border-color) box-content -mt-px'
            >
              <div className='absolute top-0 left-2/12 -translate-x-px w-px h-full bg-(--grid-border-color)'></div>
              {/* Left sticky year label */}
              <div className='col-span-12 md:col-span-2 px-3 pt-4 md:px-0'>
                <div className='sticky top-14 flex justify-center'>
                  <h3 className='text-xl md:text-2xl font-medium leading-none tracking-tight inline-block text-neutral-900 dark:text-neutral-100'>
                    {String(year)}
                  </h3>
                </div>
              </div>

              {/* Right grid of works */}
              <div className='col-span-12 md:col-span-10 px-3 md:px-0'>
                <ul className='grid grid-cols-1 gap-6'>
                  {list.map((work) => (
                    <li key={work.slug}>
                      <WorkCard work={work} locale={locale} categoryFormatter={formatCategoryLabel} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>

      {/* Year sections: mobile */}
      <div className='relative z-10 lg:hidden'>
        {years.map((year) => {
          const list = grouped.get(year)!
          return (
            <div key={year} className='border-y border-(--grid-border-color) -mt-px'>
              <div className='px-3 py-3 bg-white/70 dark:bg-neutral-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/30 dark:supports-[backdrop-filter]:bg-neutral-900/30'>
                <h3 className='text-3xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100'>
                  {String(year)}
                </h3>
              </div>
              <ul className='grid grid-cols-1 gap-4 -mx-1.5 py-3'>
                {list.map((work) => (
                  <li key={work.slug}>
                    <WorkCard work={work} locale={locale} categoryFormatter={formatCategoryLabel} />
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
