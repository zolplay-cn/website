import { clsxm } from '@zolplay/utils'
import React from 'react'

type GridProps = React.PropsWithChildren<{
  cols?: 1 | 2 | 3 | 4 | 5 | 6
  md?: 1 | 2 | 3 | 4 | 5 | 6
  lg?: 1 | 2 | 3 | 4 | 5 | 6
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}>

const colsMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
} as const

const gapMap = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
} as const

export function Grid({ cols = 1, md, lg, gap = 4, className, children }: GridProps) {
  const id = React.useId()

  return (
    <div
      className={clsxm(
        'not-prose grid relative overflow-hidden',
        colsMap[cols],
        gapMap[gap],
        // include responsive class literals so Tailwind can see them
        md === 1 && 'md:grid-cols-1',
        md === 2 && 'md:grid-cols-2',
        md === 3 && 'md:grid-cols-3',
        md === 4 && 'md:grid-cols-4',
        md === 5 && 'md:grid-cols-5',
        md === 6 && 'md:grid-cols-6',
        lg === 1 && 'lg:grid-cols-1',
        lg === 2 && 'lg:grid-cols-2',
        lg === 3 && 'lg:grid-cols-3',
        lg === 4 && 'lg:grid-cols-4',
        lg === 5 && 'lg:grid-cols-5',
        lg === 6 && 'lg:grid-cols-6',
        className,
      )}
    >
      {/* Diagonal gutter background */}
      <svg className='pointer-events-none absolute inset-0 [z-index:-1] size-full select-none text-(--grid-border-color) py-[1px] opacity-60'>
        <defs>
          <pattern id={`${id}-gutter`} width='4' height='4' patternUnits='userSpaceOnUse' patternTransform='rotate(45)'>
            <line x1='0' y1='0' x2='0' y2='4' stroke='currentColor' strokeWidth='1.5' />
          </pattern>
        </defs>
        <rect width='100%' height='100%' fill={`url(#${id}-gutter)`}></rect>
      </svg>
      {children}
    </div>
  )
}

type GridItemProps = React.PropsWithChildren<{
  className?: string
}>

export function GridItem({ className, children }: GridItemProps) {
  return (
    <div
      className={clsxm(
        'relative p-6 flex items-center justify-center',
        'before:absolute before:top-0 before:h-px before:w-[200vw] before:-left-[100vw] before:bg-(--grid-border-color)',
        'after:absolute after:bottom-0 after:h-px after:w-[200vw] after:-right-[100vw] after:bg-(--grid-border-color)',
        className,
      )}
    >
      <div className='absolute inset-0 before:absolute before:left-0 before:w-px before:h-[200vh] before:-top-[100vh] before:bg-(--grid-border-color) after:absolute after:right-0 after:w-px after:h-[200vh] after:-bottom-[100vh] after:bg-(--grid-border-color)' />
      {children}
    </div>
  )
}
