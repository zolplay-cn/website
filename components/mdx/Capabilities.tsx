'use client'

import { clsxm } from '@zolplay/utils'
import { useLocale } from 'next-intl'
import * as React from 'react'
import { capabilitiesByLocale } from './capabilities.data'

export function Capabilities({ className }: { className?: string }) {
  const locale = useLocale()
  const capabilities = capabilitiesByLocale[locale] ?? capabilitiesByLocale.en
  return (
    <section
      className={clsxm(
        'not-prose relative my-12',
        'before:absolute before:top-0 before:h-px before:w-[200vw] before:-left-[100vw] before:bg-(--grid-border-color)',
        'after:absolute after:bottom-0 after:h-px after:w-[200vw] after:-right-[100vw] after:bg-(--grid-border-color)',
        className,
      )}
    >
      {/* Vertical page edge lines for cohesion */}
      <div aria-hidden className='absolute left-0 top-0 h-full w-px bg-(--grid-border-color) z-20' />
      <div aria-hidden className='absolute right-0 top-0 h-full w-px bg-(--grid-border-color) z-20' />

      <svg
        className='pointer-events-none absolute inset-0 z-[-1] size-full select-none text-(--grid-border-color) py-[1px] opacity-60'
        aria-hidden
      >
        <defs>
          <pattern
            id='gutter-capabilities'
            width='4'
            height='4'
            patternUnits='userSpaceOnUse'
            patternTransform='rotate(45)'
          >
            <line x1='0' y1='0' x2='0' y2='4' stroke='currentColor' strokeWidth='1.5' />
          </pattern>
        </defs>
        <rect width='100%' height='100%' fill='url(#gutter-capabilities)'></rect>
      </svg>

      <div className='relative overflow-hidden z-10'>
        <ul className='space-y-8'>
          {capabilities.map(({ id, title, items }) => (
            <li key={id} className='relative'>
              {/* Section container with top/bottom rules and a column divider at 5/12 */}
              <div
                className={clsxm(
                  'relative grid grid-cols-1 md:grid-cols-12 md:gap-6 py-6',
                  'before:absolute before:top-0 before:h-px before:w-[200vw] before:-left-[100vw] before:bg-(--grid-border-color)',
                  'after:absolute after:bottom-0 after:h-px after:w-[200vw] after:-right-[100vw] after:bg-(--grid-border-color)',
                  'bg-neutral-50 dark:bg-[#1a1a1a]',
                )}
              >
                <div
                  aria-hidden
                  className='hidden md:block absolute top-0 bottom-0 w-px left-[calc(39%+1px)] bg-(--grid-border-color)'
                />

                {/* Left column */}
                <div className='md:col-span-5 px-3 md:px-1.5'>
                  <div className='flex items-baseline gap-3'>
                    <span
                      className='md:block hidden select-none font-mono text-xs tracking-wide text-neutral-500/50 -translate-y-px'
                      aria-hidden
                    >
                      {id}
                    </span>
                    <h3 className='text-xl md:text-2xl font-medium leading-tight tracking-tight text-neutral-900 dark:text-neutral-100'>
                      {title}
                    </h3>
                  </div>
                </div>

                {/* Right column */}
                <div className='md:col-span-7 px-3 md:px-1.5 mt-4 md:mt-0'>
                  <ul className='list-none m-0 p-0 grid grid-cols-2 gap-2'>
                    {items.map((text) => (
                      <li key={text} className='relative'>
                        <span className='text-sm lg:text-base font-medium text-neutral-600 tracking-tight dark:text-neutral-300'>
                          {text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
