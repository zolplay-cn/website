'use client'

import type { Locale } from '~/modules/i18n/routing'
import type { WorkCategoryKey, WorkEntry } from '~/types/work'
import { clsxm } from '@zolplay/utils'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import * as React from 'react'
import { BackgroundVideo, WithFrame } from '~/components/mdx'
import { capabilitiesByLocale } from '~/components/mdx/capabilities.data'
import works from './work.data.json'

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
  // Ensure each year's items are in a stable order (optional)
  for (const [, arr] of grouped) arr.sort((a, b) => a.slug.localeCompare(b.slug))
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

  return (
    <div className='group not-prose relative overflow-hidden ring-1 ring-(--grid-border-color) bg-white dark:bg-[#1a1a1a]'>
      <div className='relative aspect-video overflow-hidden bg-neutral-200 dark:bg-neutral-800'>
        <WithFrame className='size-full'>
          <div className='absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]'>
            {/* Poster image */}
            <Image
              src={work.featuredImage}
              alt={work.title[locale]}
              className='absolute inset-0'
              objectFit='cover'
              width={1920}
              height={1080}
            />
            {hasVideo && <BackgroundVideo src={work.showreel!.src} aspectRatio='16/9' />}
          </div>
        </WithFrame>

        {/* Subtle top/bottom rules for media */}
        <div aria-hidden className='absolute inset-x-0 top-0 h-px bg-(--grid-border-color)' />
        <div aria-hidden className='absolute inset-x-0 bottom-0 h-px bg-(--grid-border-color)' />
      </div>

      <div className='border-t border-(--grid-border-color) p-3 md:p-4'>
        <div className='flex flex-col lg:flex-row items-center justify-between gap-2'>
          <h4 className='text-base md:text-xl lg:text-2xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100'>
            {work.title[locale]}
          </h4>

          <span className='mt-2 lg:mt-0 text-base font-medium text-neutral-500 tracking-tight'>
            {categoryFormatter(work.categories)}
          </span>
        </div>
      </div>
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
        .join(' / '),
    [capTitleMap, capItemMap],
  )

  const items = React.useMemo(() => (works as WorkEntry[]).slice().sort((a, b) => b.year - a.year), [])
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
      {/* Page edge vertical lines for cohesion */}
      <div aria-hidden className='absolute left-0 top-0 h-full w-px bg-(--grid-border-color) z-10' />
      <div aria-hidden className='absolute right-0 top-0 h-full w-px bg-(--grid-border-color) z-10' />

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
                  </button>
                </WithFrame>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Year sections */}
      <div className='relative z-10 bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-neutral-950)]/5 max-lg:hidden dark:[--pattern-fg:var(--color-white)]/5'>
        {years.map((year) => {
          const list = grouped.get(year)!
          return (
            <div key={year} className='relative grid grid-cols-12 border-y border-(--grid-border-color) py-0'>
              <div className='absolute top-0 left-2/12 -translate-x-px w-px h-full bg-(--grid-border-color)'></div>
              {/* Left sticky year label */}
              <div className='col-span-12 md:col-span-2 px-3 pt-4 md:px-0'>
                <div className='sticky top-14 flex justify-center'>
                  <h3 className='text-2xl md:text-3xl font-medium leading-none tracking-tight inline-block text-neutral-900 dark:text-neutral-100'>
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
    </section>
  )
}
