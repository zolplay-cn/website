import type { ReactNode } from 'react'
import { clsxm } from '@zolplay/utils'

export function WithFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={clsxm(
        'group relative max-w-[100%] after:pointer-events-none after:absolute after:inset-0 after:border after:border-(--grid-border-color)',
        className,
      )}
    >
      {children}

      <svg
        width='5'
        height='5'
        viewBox='0 0 5 5'
        className='absolute top-[2px] left-[2px] lg:top-[4px] lg:left-[4px] fill-white mix-blend-difference'
        data-highlight
      >
        <path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z' />
      </svg>
      <svg
        width='5'
        height='5'
        viewBox='0 0 5 5'
        className='absolute top-[2px] right-[2px] lg:top-[4px] lg:right-[4px] fill-white mix-blend-difference'
        data-highlight
      >
        <path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z' />
      </svg>
      <svg
        width='5'
        height='5'
        viewBox='0 0 5 5'
        className='absolute bottom-[2px] left-[2px] lg:bottom-[4px] lg:left-[4px] fill-white mix-blend-difference'
        data-highlight
      >
        <path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z' />
      </svg>
      <svg
        width='5'
        height='5'
        viewBox='0 0 5 5'
        className='absolute bottom-[2px] right-[2px] lg:bottom-[4px] lg:right-[4px] fill-white mix-blend-difference'
        data-highlight
      >
        <path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z' />
      </svg>
    </div>
  )
}
