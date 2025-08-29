import { clsxm } from '@zolplay/utils'
import * as React from 'react'

interface Capability {
  id: string
  title: string
  items: string[]
}

const capabilities: Capability[] = [
  {
    id: '001',
    title: 'Brand',
    items: [
      'Logo & Marks',
      'IPs & Mascots',
      'Brand Strategy',
      'Brand Guidelines',
      'Voice & Messaging',
      'Visual Identities',
      'Deck Templates',
    ],
  },
  {
    id: '002',
    title: 'Product',
    items: [
      'Marketing Sites',
      'Framer/Webflow',
      'Next.js Sites',
      'SaaS & Platforms',
      'Mobile/Desktop Apps',
      'UI/UX Design',
      'Design Systems',
    ],
  },
  {
    id: '003',
    title: 'Growth',
    items: ['Social Assets', 'Content & Copywriting', 'SEO', 'Motion & Video', 'Illustration', 'Merch & Swag'],
  },
]

export function Capabilities({ className }: { className?: string }) {
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
      <div aria-hidden className='hidden md:block absolute left-0 top-0 h-full w-px bg-(--grid-border-color) z-20' />
      <div aria-hidden className='hidden md:block absolute right-0 top-0 h-full w-px bg-(--grid-border-color) z-20' />
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
                  'bg-neutral-100 dark:bg-neutral-800',
                )}
              >
                <div
                  aria-hidden
                  className='hidden md:block absolute top-0 bottom-0 w-px left-[calc(60%+1px)] bg-(--grid-border-color)'
                />

                {/* Left column */}
                <div className='md:col-span-7 px-2'>
                  <div className='flex items-baseline gap-3'>
                    <span className='select-none font-mono text-xs tracking-wide text-neutral-500/30' aria-hidden>
                      {id}
                    </span>
                    <h3 className='text-xl md:text-4xl font-medium leading-tight tracking-tight'>{title}</h3>
                  </div>
                </div>

                {/* Right column */}
                <div className='md:col-span-5 md:pl-6 mt-4 md:mt-0'>
                  <ul className='list-none m-0 p-0'>
                    {items.map((text) => (
                      <li key={text} className='relative'>
                        <span className='text-xs md:text-sm font-medium text-stone-700 dark:text-stone-300'>
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
